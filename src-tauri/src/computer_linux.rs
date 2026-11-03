use serde_json::{json, Value};
use std::{io::{BufRead, BufReader, Write}, process::{Child, ChildStdin, Command, Stdio}, sync::{Arc, Mutex, atomic::{AtomicBool, AtomicU32, Ordering}, mpsc}, time::Duration};
use tauri::{Manager, State, Webview};
struct Worker { child: Child, input: ChildStdin, responses: mpsc::Receiver<String> }
impl Drop for Worker {fn drop(&mut self){let _=self.child.kill();let _=self.child.wait();}}
#[derive(Default)]
pub struct Computer {worker:Arc<Mutex<Option<Worker>>>,pid:Arc<AtomicU32>}
impl Computer {
 fn call(&self, payload:Value, cancelled:&AtomicBool)->Result<Value,String>{
  let mut guard=self.worker.lock().map_err(|_|"Desktop worker lock failed")?;
  if guard.is_none(){
   let root=std::env::var_os("OPENCLAUDE_WORKSPACE_ROOT").map(std::path::PathBuf::from).unwrap_or_else(||std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(".."));
   let mut child=Command::new("/usr/bin/python3").arg(root.join("runtime/linux/portal.py")).stdin(Stdio::piped()).stdout(Stdio::piped()).stderr(Stdio::inherit()).spawn().map_err(|e|format!("Linux desktop portal helper could not start: {e}"))?;
   let input=child.stdin.take().ok_or("Desktop helper stdin unavailable")?;
   let output=child.stdout.take().ok_or("Desktop helper stdout unavailable")?;
   let(tx,rx)=mpsc::channel();std::thread::spawn(move||{for line in BufReader::new(output).lines(){match line{Ok(line)=>if tx.send(line).is_err(){break},Err(_)=>break}}});
   self.pid.store(child.id(),Ordering::SeqCst);*guard=Some(Worker{child,input,responses:rx});
  }
  let worker=guard.as_mut().unwrap();
  let result=(||{
   if cancelled.load(Ordering::SeqCst){return Err("Desktop command cancelled".into());}
   writeln!(worker.input,"{}",payload).map_err(|e|e.to_string())?;worker.input.flush().map_err(|e|e.to_string())?;
   let deadline=std::time::Instant::now()+Duration::from_secs(100);
   loop{
    if cancelled.load(Ordering::SeqCst){return Err("Desktop command cancelled".into());}
    if std::time::Instant::now()>deadline{return Err("Desktop portal operation timed out".into());}
    match worker.responses.recv_timeout(Duration::from_millis(100)){
     Ok(line)=>{let value:Value=serde_json::from_str(&line).map_err(|e|format!("Invalid portal response: {e}"))?;if let Some(error)=value["error"].as_str(){return Err(error.to_string())}return Ok(value["data"].clone())},
     Err(mpsc::RecvTimeoutError::Timeout)=>{},Err(_)=>return Err("Linux desktop helper exited; enable computer control again".into())
    }
   }
  })();
  if result.is_err(){guard.take();self.pid.store(0,Ordering::SeqCst);}
  result
 }
 fn cloned(&self)->Self{Self{worker:self.worker.clone(),pid:self.pid.clone()}}
 fn interrupt(&self){let pid=self.pid.load(Ordering::SeqCst);if pid>0{let _=Command::new("/usr/bin/kill").args(["-TERM",&pid.to_string()]).status();}}
}
#[tauri::command]
pub async fn computer_status(view:Webview,state:State<'_,Computer>)->Result<bool,String>{super::trusted(&view)?;let computer=state.cloned();tauri::async_runtime::spawn_blocking(move||computer.call(json!({"operation":"status"}),&AtomicBool::new(false)).map(|v|v["enabled"]==true)).await.map_err(|e|e.to_string())?}
#[tauri::command]
pub async fn computer_grant(view:Webview,state:State<'_,Computer>,enabled:bool)->Result<bool,String>{
 super::trusted(&view)?;if !enabled{state.interrupt();}
 let computer=state.cloned();tauri::async_runtime::spawn_blocking(move||{if !enabled{computer.worker.lock().map_err(|_|"Desktop worker lock failed")?.take();computer.pid.store(0,Ordering::SeqCst);return Ok(false)}computer.call(json!({"operation":"grant"}),&AtomicBool::new(false)).map(|v|v["enabled"]==true)}).await.map_err(|e|e.to_string())?
}
#[tauri::command]
pub async fn computer_tool(view:Webview,state:State<'_,Computer>,name:String,args:Value,owner:String,request_id:String,cancellations:State<'_,super::cancellation::Cancellation>)->Result<Value,String>{
 super::trusted(&view)?;
 if name!="computer_screenshot"&&view.state::<super::Desktop>().download_prompt.load(Ordering::Acquire){return Err("User download approval is pending; computer input cannot approve the dialog".into());}
 let request=cancellations.begin(&request_id);request.check()?;let flag=request.flag.clone();let computer=state.cloned();
 let result=tauri::async_runtime::spawn_blocking(move||computer.call(json!({"operation":name,"args":args,"owner":owner}),&flag)).await.map_err(|e|e.to_string())?;
 request.check()?;result
}
