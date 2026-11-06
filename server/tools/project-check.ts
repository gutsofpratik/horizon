import {access,readdir} from 'node:fs/promises';
import {join} from 'node:path';
export type CheckRunner='auto'|'npm'|'cargo'|'pytest'|'unittest'|'go'|'dotnet';
export async function projectCheckCommand(root:string,action:'test'|'lint'|'format',runner:CheckRunner='auto',script=action,windows=false){
 const exists=async(file:string)=>access(join(root,file)).then(()=>true,()=>false);
 if(runner==='auto'){
  if(await exists('package.json'))runner='npm';else if(await exists('Cargo.toml'))runner='cargo';else if(await exists('go.mod'))runner='go';
  else if((await readdir(root)).some(name=>/\.(?:csproj|fsproj|sln)$/.test(name)))runner='dotnet';else if(await exists('pyproject.toml')||await exists('pytest.ini'))runner='pytest';else if(await exists('tests'))runner='unittest';
  else throw new Error('Cannot identify a project check runner. Choose runner explicitly or use terminal_run with the project’s documented command.');
 }
 if(runner==='npm')return (windows?'npm.cmd':'npm')+' run '+script;
 if(script!==action)throw new Error('Named scripts apply to npm projects only.');
 const commands:Record<string,Record<string,string>>={cargo:{test:'cargo test',lint:'cargo clippy',format:'cargo fmt'},pytest:{test:'python -m pytest'},unittest:{test:'python -m unittest discover -s tests'},go:{test:'go test ./...',lint:'go vet ./...',format:'go fmt ./...'},dotnet:{test:'dotnet test',format:'dotnet format'}};
 const command=commands[runner]?.[action];if(!command)throw new Error('No '+action+' command is configured for '+runner+'. Use the project’s documented terminal command.');return command;
}
