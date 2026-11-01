import ts from 'typescript';
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
const path='.playwright-mcp/reference-audit/lab-canvas-source.js',source=readFileSync(path,'utf8');
const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
let module,controller;
function walk(node){
  if(ts.isArrowFunction(node)&&ts.isBlock(node.body)&&node.body.statements.some(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(ast)==='g'&&d.initializer?.getText(ast).includes('images/t-000.jpg'))))module=node.body;
  if(ts.isFunctionExpression(node)&&node.parameters.map(p=>p.name.getText(ast)).join(',')==='e,t,a'&&node.body.getText(ast).includes('let i, s = e.getContext("2d")'))controller=node;
  ts.forEachChild(node,walk);
}walk(ast);
if(!module||!controller)throw new Error('Expected canvas source module was not found.');
const statements=module.statements;
const start=statements.findIndex(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(ast)==='g'));
const end=statements.findIndex(s=>ts.isVariableStatement(s)&&s.declarationList.declarations.some(d=>d.name.getText(ast)==='O'));
const helpers=statements.slice(start,end).map(s=>s.getText(ast)).join('\n').replace('e.i(915426).default','"/reference/lab-tiles.webp"');
mkdirSync('src/lib',{recursive:true});
const atlas='https://www.anthropic.com/_next/static/media/tiles.2si2alug6-tte.webp';
if(!existsSync('public/reference/lab-tiles.webp')){const response=await fetch(atlas);if(!response.ok)throw new Error('Atlas download: '+response.status);writeFileSync('public/reference/lab-tiles.webp',Buffer.from(await response.arrayBuffer()))}
const code=`// Canvas sequence extracted from the captured MissionHomepageSizzle runtime.
// Source: https://www.anthropic.com/_next/static/chunks/2-r8ra6810b1v.js
// The composition/timing is retained; copy, fonts, and dark palette belong to Horizon.
${helpers}
const controller=${controller.getText(ast)};
export async function createLabCanvas(canvas,copy,onCue){
 const featured=[
 {title:'Introducing Horizon',pillar:'Product',category:'Desktop workspace',image:'/reference/artifacts/metrics-dashboard.jpg',hold:1.3},
 {title:'A guide to local intelligence',pillar:'Models',category:'Practical guide',image:'/reference/learn-01.jpg',hold:1.3},
 {title:'More ways to put AI to work',pillar:'Tools',category:'Skills library',image:'/reference/learn-02.jpg',hold:1.4}];
 const config={width:1920,height:1080,seed:7,colors:{ground:'#1c1c1a',card:'#242422',cardBorder:'#40403a',ink:'#faf9f5',ink2:'#b0afa4',ink4:'#89897d',tile:'#bcbcb0'},fonts:{sans:'"Reference Sans",Arial,sans-serif',serif:'"Reference Serif",Georgia,serif'},beats:Object.fromEntries(Object.entries(f).map(([k,v])=>[k,{...v}])),populateScale:.75,camera:{endScale:290/640,breathe:.92,fieldBreathe:.965},featured,pages:p.map(item=>({image:x.src,crop:g[item.image]})),float:{amp:8,freqMin:.0006,freqRange:.0007,rampSeconds:.33},field:{tileSize:138,spread:1.75,spacing:165,clearHalfW:633,clearHalfH:283}};
 const images=[...new Set([...config.pages,...featured].map(item=>item.image))];
 await Promise.all(images.map(src=>new Promise(resolve=>{if(G.has(src)){resolve();return}const image=new Image();image.onload=()=>{G.set(src,image);resolve()};image.onerror=()=>resolve();image.src=src})));
 return controller(canvas,config,{copy,startAt:matchMedia('(prefers-reduced-motion: reduce)').matches?11.6:0,onCue});
}
`;
writeFileSync('src/lib/labCanvas.js',code);
writeFileSync('src/lib/labCanvas.d.ts',`export function createLabCanvas(canvas:HTMLCanvasElement,copy:HTMLElement,onCue:()=>void):Promise<{resume():void;pause():void;seek(time:number):void;time():number;destroy():void}>;\n`);
console.log(JSON.stringify({helperStatements:end-start,rendererCharacters:code.length,atlasBytes:readFileSync('public/reference/lab-tiles.webp').length}));
