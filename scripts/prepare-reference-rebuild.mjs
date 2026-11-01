import {readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync} from 'node:fs';
import {basename} from 'node:path';
import ts from 'typescript';
const source = readFileSync('.playwright-mcp/claude-flight.txt','utf8');
const data = JSON.parse(source.split('\n').find(line=>line.startsWith('29:')).slice(3))[3].data;
const manifest = JSON.parse(readFileSync('.playwright-mcp/rea-asset-library/manifest.json','utf8'));
const byUrl = new Map(manifest.map(x=>[x.url,x]));
mkdirSync('public/reference/rebuild',{recursive:true});
const copied = new Map();
function asset(url) {
  if(!url) return '';
  if(url.startsWith('/reference/')&&existsSync('public'+url))return url;
  const absolute=url.startsWith('/')?'https://claude.com'+url:url;
  if(copied.has(absolute)) return copied.get(absolute);
  const item=byUrl.get(absolute) ?? manifest.find(x=>x.url.split('?')[0]===absolute.split('?')[0]);
  if(!item || !existsSync('.playwright-mcp/rea-asset-library/'+item.file)) return absolute;
  // Video captures may be byte ranges; retain their full original URL.
  if(item.mediaType?.startsWith('video/')) return absolute;
  const suffix=item.mediaType?.includes('svg')?'.svg':item.mediaType?.includes('html')?'.html':item.mediaType?.includes('png')?'.png':item.mediaType?.includes('webp')?'.webp':'.jpg';
  const name=item.sha256+suffix;
  const path='/reference/rebuild/'+name;
  copyFileSync('.playwright-mcp/rea-asset-library/'+item.file,'public'+path);
  if(suffix==='.html') {
    let html=readFileSync('public'+path,'utf8');
    html=html.replace('<head>','<head><base href="'+absolute.replace(/[^/]+$/,'')+'">');
    writeFileSync('public'+path,html);
  }
  copied.set(absolute,path);
  return path;
}
const library=data.sections.find(s=>s.kind==='useCaseLibrary');
const examples=library.rows.flatMap(row=>row.useCases);
const find=slug=>examples.find(c=>typeof c==='object'&&c.slug===slug);
const roleSource=data.sections.find(s=>s.kind==='rolesBand');
const roles=roleSource.decks.map(deck=>({
  name:deck.persona.name,slug:deck.persona.slug,label:deck.taskLabel,
  cards:deck.cards.map(card=>{
    const useCase=find(card.slug)??library.catalogue[card.slug];
    const existing=JSON.parse(readFileSync('src/data/referenceCases.json')).find(c=>c.slug===card.slug);
    return {slug:card.slug,title:existing?.title??card.headline,time:card.time,
      headline:card.headline,body:card.body.map(x=>x.s).join('').replaceAll('Claude','Horizon'),
      apps:card.conns.map(x=>x==='claude'?'horizon':x),swatch:card.swatch,
      texture:asset(card.texture),prompt:useCase?.prompt??existing?.prompt??'',
      artifact:asset(card.artifact.url),width:card.artifact.frame.width,height:card.artifact.frame.height,
      conversation:useCase?.conversation?{url:asset(useCase.conversation.url),...useCase.conversation.frame}:null,
      image:asset(useCase?.artifact?.screenshot?.url??existing?.image)};
  })
}));
const geometry=JSON.parse(readFileSync('docs/reference-audit/motion-and-map-source.json'));
writeFileSync('src/data/workday.json',JSON.stringify(roles,null,2));
writeFileSync('src/data/capabilityGraph.json',JSON.stringify({nodes:geometry.dn.value,edges:geometry.di.value},null,2));
const hero={media:data.hero.ringMedia.map(m=>({kind:m.kind,src:m.src??'',image:asset(m.image?.url??m.poster?.url),personas:m.personas??[]})),cases:data.hero.featuredUseCases.map(c=>({slug:c.slug,title:c.title,personas:c.personas??[]}))};
const runtime=readFileSync('.playwright-mcp/reference-audit/product-runtime.js','utf8');
const ast=ts.createSourceFile('product-runtime.js',runtime,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
let distribute;
function findDistribution(node){if(ts.isFunctionDeclaration(node)&&node.name?.text==='o1')distribute=node.getText(ast);ts.forEachChild(node,findDistribution)}findDistribution(ast);
if(!distribute)throw new Error('Reference ring distribution was not found.');
const ringOrder=[0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15];
const oZ=[...ringOrder.map(index=>({ring:'inner',index})),...ringOrder.map(i=>({ring:'outer',index:(i+8)%16}))];
const oV={inner:Array(16).fill(-1),outer:Array(16).fill(-1)};oZ.forEach((p,i)=>oV[p.ring][p.index]=i);
const caseOrder=[0,3,2,4,6,5,7,9,8,10,12,11,13,15,14,17,1,4,0,3,2,6,9,7,10,8,11,15,14,17,13,16];
// Evaluate only the isolated deterministic layout function, never the captured bundle.
const distributeMedia=Function('oZ','oV','oJ','o0',`return (${distribute});`)(oZ,oV,p=>caseOrder[(p.ring==='inner'?16:0)+p.index],m=>!!m.personas?.length);
const assignedMedia=distributeMedia(hero.media,hero.cases);
const patternNames=['squiggle','squiggle90Flip','squiggle90','squiggle180Flip','squiggle180','squiggle270Flip','squiggle270','squiggleFlip'];
hero.tiles=['outer','inner'].flatMap(ring=>Array.from({length:16},(_,i)=>({size:[138,152,164,152][i%4],media:assignedMedia[oV[ring][i]]??null,pattern:patternNames[(i+(ring==='inner'?4:0))%8],example:hero.cases[caseOrder[(ring==='inner'?16:0)+i]]})));
writeFileSync('src/data/orbit.json',JSON.stringify(hero,null,2));
const textures=['squiggle','squiggle90Flip','squiggle90','squiggle180Flip','squiggle180','squiggle270Flip','squiggle270','squiggleFlip'];
writeFileSync('src/data/referenceTextures.json',JSON.stringify(Object.fromEntries(textures.map(t=>[t,asset('/static/product-overview/textures/ring/'+t+'.svg')])),null,2));
const localCases=JSON.parse(readFileSync('src/data/referenceCases.json'));
for(const example of localCases)example.texture=asset(example.texture);
writeFileSync('src/data/referenceCases.json',JSON.stringify(localCases,null,2));
writeFileSync('src/data/capabilityClips.json',JSON.stringify(data.sections.find(s=>s.kind==='whatYouGet').clips,null,2));
console.log(JSON.stringify({roles:roles.length,cards:roles.flatMap(r=>r.cards).length,conversations:roles.flatMap(r=>r.cards).filter(c=>c.conversation).length,assets:copied.size}));
