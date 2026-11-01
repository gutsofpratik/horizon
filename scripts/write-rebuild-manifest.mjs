import ts from 'typescript';
import {readFileSync,writeFileSync} from 'node:fs';
const load=async(source)=>import('data:text/javascript;base64,'+Buffer.from(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2023}}).outputText).toString('base64'));
const {extendedPages}=await load(readFileSync('src/data/extendedPages.ts','utf8'));
const source=readFileSync('src/data/sitePages.ts','utf8').replace(/import\s*\{extendedPages\}\s*from\s*'\.\/extendedPages';/,'const extendedPages='+JSON.stringify(extendedPages)+';');
const {sitePages,pageIndexes}=await load(source);
const feature=new Set(['product','product/artifacts','product/projects','product/models','product/tools','product/beta','models','skills']);
const family=(path)=>pageIndexes[path]?(path==='learning'?'learning directory':path==='use-cases'?'role/task directory':path==='research'?'research directory':path==='news'?'news directory':'resource directory'):path.startsWith('use-cases/')?'workflow detail':feature.has(path)||sitePages[path]?.layout==='feature'?'feature landing':sitePages[path]?.layout==='lesson'?'learning chapter':sitePages[path]?.layout==='manual'||path.startsWith('developers/')?'documentation':path.startsWith('company/')||['company','careers','community','commitments'].includes(path)?'company':path.startsWith('research/')?'research article':'editorial article';
const routes=[...new Set([...Object.keys(sitePages),...Object.keys(pageIndexes)])].map(path=>({path,title:sitePages[path]?.title??pageIndexes[path].title,family:family(path)}));
writeFileSync('docs/reference-audit/rebuilt-route-families.json',JSON.stringify(routes,null,2));
const workday=JSON.parse(readFileSync('src/data/workday.json'));
const missing=[...new Set(workday.flatMap(r=>r.cards.filter(c=>!c.conversation).map(c=>c.slug)))];
const counts=Object.fromEntries([...new Set(routes.map(r=>r.family))].map(f=>[f,routes.filter(r=>r.family===f).length]));
const text=`# Local rebuild review — 30 October 2026

Preview: http://127.0.0.1:5173/ . Product: http://127.0.0.1:5173/horizon .

The site has been rebuilt locally from the audit. Compilation succeeded. No browser/UI review, automated tests, sub-agents, deployment, commit, or push was performed for this pass. Visual and interaction acceptance belongs to the owner.

## Implemented

- Reference header geometry, grouped menus, product secondary navigation, search, text branding, and four-column grouped footer.
- 32 hero slots distributed by the captured source function, responsive two-ring geometry, source masks/textures, and the source motion constants.
- Preview scroll transform, using an existing real Horizon workspace screenshot. A first-party promotional video is still needed.
- Seven role-specific workday decks / 21 card instances, captured conversation/result frames, source card rest/exit transforms, clock stops, app selection, replay, prompt editing and download handoff.
- 34-node / 38-edge capability geometry, responsive coordinate planes, hover previews, and a working category/detail drawer. Labels map to actual Horizon features rather than asserting the reference vendor's products.
- 18 use-case library scenarios with layered cards, role/task synchronization, and individual detail pages.
- FAQ, functional prompt continuation, and beta/waitlist destinations.
- Lab canvas controller extracted from the captured MissionHomepageSizzle runtime, including atlas, featured-card sequence, grid population/subdivision, expansion and float. Horizon copy and dark tokens replace the source's copy and palette.
- Lab mission in normal document flow, resource carousel, and linked announcements.
- Distinct feature, workflow, documentation, learning, editorial, company and directory layouts, with page-specific content and explicit media assignments.

## Content dependencies / honest limits

- No approved Horizon customer testimonials were available. The video/audio/quote carousel is implemented but does not render unapproved or relabeled customer endorsements.
- No approved Horizon promotional recording was available. The preview uses a real workspace screenshot and does not show a false video player.
- Captured workday conversations are available for 16 of 21 instances. These scenario slugs use their actual result frame and disable the unavailable conversation tab: ${missing.join(', ')}.
- Workday and use-case artifacts are illustrative reference workflows. Native integrations, scheduled tasks, or vendor-specific products are not promised by displaying them.
- Source page inventory contains 101 primary references. The route-family work below is not a claim of full reference parity for all 101 pages. Every route still needs the owner's visual/content review.

## Content route layouts (${routes.length})

${Object.entries(counts).map(([f,n])=>'- '+f+': '+n).join('\n')}

| Route | Layout | Title |
|---|---|---|
${routes.map(r=>'| [/'+r.path+'](http://127.0.0.1:5173/'+r.path+') | '+r.family+' | '+r.title.replaceAll('|','/')+' |').join('\n')}

The homepage, main product, about, form, admin, download, and legal screens are in addition to this content-route list.
`;
writeFileSync('docs/reference-audit/LOCAL-REVIEW.md',text);
console.log(JSON.stringify({contentRoutes:routes.length,families:counts,unavailableConversationScenarios:missing}));
