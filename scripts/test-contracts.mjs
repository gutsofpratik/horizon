import {readdir,mkdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {resolve} from 'node:path';
const files=(await readdir('tests')).filter(name=>/\.test\.(?:tsx?|mjs)$/.test(name)).sort().map(name=>'tests/'+name);
if(!files.length)throw new Error('No executable contract tests were found');
const output=process.env.HORIZON_TEST_EVIDENCE??resolve('.local','checks','tool-evidence.jsonl');
await mkdir(resolve(output,'..'),{recursive:true});await writeFile(output,'');
const child=spawn(process.execPath,[resolve('node_modules/tsx/dist/cli.mjs'),'--test',...files],{stdio:'inherit',env:{...process.env,HORIZON_TEST_EVIDENCE:output}});
child.on('error',error=>{console.error(error.message);process.exitCode=1;});child.on('exit',code=>{process.exitCode=code??1;});
