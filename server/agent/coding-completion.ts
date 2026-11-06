import {posix} from 'node:path';
const normalize=(path:string)=>posix.normalize(path.replaceAll('\\','/').replace(/^\.\//,''));
/** Evidence is scoped to full paths and the current workspace revision. */
export class CodingCompletion {
 private expected:string[];private saved=new Set<string>();private jobs=new Map<string,number>();private latestJob?:string;private revision=0;private testsRequested:boolean;private testsDone=false;private repairRead=false;
 constructor(task:string,coding:boolean,existing:string[]=[]){
  this.saved=new Set(existing.map(normalize));
  this.expected=coding?[...new Set((task.match(/\b[\w./-]+\.(?:mjs|cjs|jsx?|tsx?|py|rs|go|java|cs|json|ya?ml|toml|md)\b/g)??[]).filter(path=>!['Node.js','Vue.js','Next.js','Nuxt.js','Express.js','React.js','Three.js','Chart.js'].includes(path)).map(normalize))].slice(0,12):[];
  const explanationOnly=/^\s*(?:explain|describe|teach|what|why|how|tell me)\b/i.test(task)&&!/(?:\b(?:and|then|also)\s+|[.;]\s*)(?:please\s+)?(?:actually\s+)?(?:run|execute)\b/i.test(task);
  this.testsRequested=coding&&!explanationOnly&&/\b(?:run|execute)\b[\s\S]{0,100}(?:\btests?\b|--test)/i.test(task)&&!/(?:do not|don't|without|no)\s+(?:run(?:ning)?\s+)?tests?/i.test(task);
 }
 observe(name:string,args:any,result:any){
  if(result.status!=='succeeded'){if(name==='files_read'&&result.error?.code==='ENOENT'&&typeof args?.path==='string'){this.saved.delete(normalize(args.path));this.repairRead=false;}return;}
  const data=result.data??{};
  const filePaths=(result.files??[]).map((file:any)=>file.path??file.workspacePath??file.name).filter((path:any)=>typeof path==='string');
  if(/^files_(write|patch|append|copy|move|batch_edit)$/.test(name)&&typeof (data.path??args?.path??args?.to)==='string')filePaths.push(data.path??args.path??args.to);
  for(const path of filePaths)this.saved.add(normalize(path));
  // Arbitrary execution can edit files without returning file records. Never
  // reuse a passing test result across an unobserved execution boundary.
  const execution=/^(terminal_run|shell_run|python_execute|python_run|skill_run_script|programmatic_tools|code_format)$/.test(name);
  if(filePaths.length||execution){this.revision++;this.testsDone=false;}
  const exit=data.exit_code??data.exitCode;const completed=['completed','exited'].includes(data.status)||data.status===undefined;
  const testRun=name==='code_test'||name==='terminal_run'&&/(?:--test|\b(?:npm(?:\.cmd)?\s+(?:run\s+)?test|pytest|cargo\s+test|go\s+test|dotnet\s+test|vitest)\b)/i.test(args?.command??'');
  if(testRun&&data.job_id){this.jobs.set(data.job_id,this.revision);this.latestJob=data.job_id;this.testsDone=false;}
  const testResult=testRun||name==='terminal_read'&&args?.job_id===this.latestJob&&this.jobs.get(args.job_id)===this.revision;
  if(testResult&&completed&&typeof exit==='number'){this.testsDone=exit===0;this.repairRead=exit!==0;}
  if(name==='files_read')this.repairRead=false;
 }
 missingFiles(){return this.expected.filter(path=>!this.saved.has(path));}
 needsTests(){return this.testsRequested&&!this.testsDone;}
 needsRepairRead(){return this.testsRequested&&this.repairRead;}
}
