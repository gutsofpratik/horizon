# Reference audit and rebuild specification

Audit date: 29 October 2026. Scope: https://claude.com/product/overview and https://www.anthropic.com/, their captured primary-page families, the five supplied screenshots, and the current Horizon source. This is an analysis deliverable. No application UI files were changed or deployed during this audit, and no local-site UI tests were run.

## Assessment

The present implementation does not reproduce the reference experience. It has a useful route catalog, form backend, fonts, and reference assets, but major visual and behavioral systems are incomplete or substituted. Asset collection was treated as if it were implementation evidence. It is not: a captured result iframe does not implement the surrounding conversation, card ordering, clock, connector selection, and scroll controller.

The next work must follow a component and state specification. Adding more routes or decorative animation before those systems are correct will repeat the same problem.

## Evidence and coverage

- All 101 previously captured primary URLs have DOM files. `page-outlines.json` indexes headings, sections, media counts, and provenance. One captured page has no H1; that is flagged rather than treated as a normal page.
- `component-inventory.json` lists CSS-module families, form controls, buttons, and media for all 101 URLs. The 283 discovered module prefixes are a structural inventory, not a claim that every component's behavior has been inspected.
- Both current references were opened again. The product reference was inspected in dark mode at 390, 1440, 1920, and 2560 CSS-pixel widths.
- New REA captures include 129 screenshot samples across all seven role scenarios, with successful role, clock, and available connector actions in the final scenarios. A new 78-step lab scroll scenario completed. Earlier failed capture attempts are retained in `role-capture-status-initial.json` and `new-capture-status.json`; they are not counted as complete interaction coverage.
- The original dense passes remain available: 105 lab samples and 345 product samples. Their sampling rate was approximately 6.4 and 8.9 screenshots/second, not native every-frame video.
- The shared export contains 1,850 unique captured resource bodies, including 1,449 image resources, of which 363 are SVG. Recorded video responses must be checked for range/completeness before treating them as complete local video files.
- Source measurements and runtime constants are saved in `motion-and-map-source.json`; live reference observations are saved separately. No claim of 100% visual parity follows from any of these counts.
- Supplied screenshots 4 and 5 have identical hashes. They are one footer state, not two separate states.

Browser chrome, the restore-tabs bar, and the floating REA assistant overlay in the supplied images are not website components. Measurements must use the browser content viewport, not the full screenshot dimensions.

## 1. Product page: required sequence

1. Centered primary navigation, with the reference's secondary product/explore navigation.
2. Full-viewport hero with two independent orbital rings, headline, supporting text, and the two approved Horizon actions: Try Horizon and Join Waitlist.
3. Preview/video cover moving into position as the hero scrolls away.
4. Three benefits with plain small numbers, thin rules, serif titles, and the source spacing.
5. Animated seven-role selector and a pinned three-card workday deck.
6. Role-appropriate clock, app dock, conversation/result controls, connector detail panel, and card transitions.
7. Testimonial treatment, including the media/voice-note and alternate quote treatments.
8. Benefit explanation followed by the animated capability graph and its functional capabilities drawer.
9. Role/task artifact library with a visibly layered stack and correctly sized side rails.
10. Narrow centered FAQ and the short closing prompt/action.
11. Footer with the source's large left brand/prompt area, four grouped link columns, and the lower utility row.

A replacement paragraph, a direct iframe swap, or a generic card grid does not satisfy the equivalent step above.

## 2. Hero geometry and motion

### Measured geometry

| Item | Reference | Current implementation issue |
|---|---|---|
| Rings | 16 slots in each ring; 32 total | 14 + 12 slots; 26 total |
| Desktop stage | 100vh | Fixed intro dimensions and a fixed orbit center |
| Center | Stage-relative | Constant 430px orbit Y center |
| Tile size sequence | 138 / 152 / 164 / 152, multiplied by viewport width / 1920 | Size scaling capped at 1.25 |
| 2560px viewport tile widths | About 184 / 203 / 219px | Considerably smaller after the cap |
| Wide desktop base radii | Outer = stage client width × 1000/1920; inner = stage client width × 650/1920 | Fixed 700/475 radii with capped scaling |
| Base radius ratio | 1000/650 | Must be retained across the responsive radius calculation |
| Navigation content width | Maximum 1440px; centered | Needs consistent source container geometry |
| Desktop title | 72px, 79.2px line-height, weight 500 | Size alone was copied; positioning was not fully reproduced |

Tile sizing uses CSS `100vw`; the radius calculations use the usable stage width, which can exclude a scrollbar. These are deliberately distinct measurements.

At a 2560 × 1440 content viewport, the observed title begins around Y=630px. At 1440 × 1000, it begins around Y=410px. This follows viewport centering; it must not be implemented as the same hard-coded top padding at every height.

### Motion contract

- Independent counter-rotating rings. Source angular-time divisors are 7.8 and 9.36, with directions +1 and -1. A nominal complete turn is approximately 49 and 59 seconds before boost/scroll effects.
- Entry starts after a 0.2s delay. Spread resolves over 2s with `expo.out`; scale resolves over 1.6s with `power3.out`; initial rotation boost decays over 2.4s.
- The source also responds to scroll/wheel energy. Constant-speed motion alone is incomplete.
- Hover scales an eligible tile to 1.06 over 0.45s; leaving restores it over 0.5s. Holding/hovering affects the orbit controller.
- Use transform setters, not continuous layout updates through `left` and `top`.
- Preserve the bottom fade mask. Use the actual texture masks and slot/media assignment rather than arbitrary decorative substitutions.
- Mobile is a different composition: the outer ring is not simply squeezed down, and the inner collection becomes a strip-like movement. Use its source breakpoint behavior.

Evidence: formatted product runtime around lines 9575–9755 and 10000–10210; hero stylesheet around lines 2559 onward; `viewport-observations.txt`.

## 3. Preview and numbered benefits

The preview is part of the scroll composition. Source initial values include Y=34vh, scale=0.86, and opacity=0.45, resolving to Y=0, scale=1, opacity=1 with a scrubbed scroll timeline. The associated center copy moves by -10vh. The current static Docs/Code/Ideas card is not an equivalent implementation.

The reference's 01/02/03 labels are plain small numbers. The added circular number borders should be removed. Reproduce the thin top rules, serif headings, paragraph width, and spacing before the role section. Match reveal order rather than firing every element on page load.

A real Horizon video is needed for a production player. A reference clip may be used as a clearly identified design-study asset; it cannot be presented as a genuine recording of Horizon.

## 4. Role showcase: separate data and state model

The role showcase contains 21 card instances across seven decks. The lower artifact library contains 18 use cases. These are distinct systems and do not always use the same artifact URL. Reusing the lower library's data to implement the workday showcase caused incorrect panels and missing behavior.

### Workday mapping

| Role | Actual card times | Visible dock apps observed in the reference |
|---|---|---|
| Everyone | 8:00 AM, 12:00 PM, 4:00 PM | Gmail, Calendar, Drive, Excel, Word, Slack, app |
| Marketing | 8:00 AM, 11:00 AM, 2:00 PM | Gmail, Drive, PowerPoint, Word, Slack, Amplitude, BigQuery, app |
| Sales | 8:00 AM, 10:00 AM, 4:15 PM | Calendar, Excel, PowerPoint, Word, Slack, Salesforce, Gong, app |
| Finance | 8:00 AM, 11:00 AM, 12:00 PM | Drive, Excel, PowerPoint, app |
| Human resources | 8:00 AM, 10:00 AM, 2:00 PM | Drive, Excel, PowerPoint, Word, app |
| Legal | 9:00 AM, 1:00 PM, 3:00 PM | Drive, Excel, Word, app |
| Product | 9:30 AM, 12:00 PM, 4:00 PM | Gmail, Calendar, Word, Slack, BigQuery, app |

The rail uses compact labels but retains full times in accessible labels. For example, the Sales rail displays 4PM while its card time is 4:15 PM.

`role-state-matrix.json` contains each card's slug, full time, source artifact, texture, swatch, and connector associations. `visible-dock-observations.txt` records the visible dock, which must not be confused with all connector names in the data.

### State that must stay synchronized

`role → active deck → card order → front card → time rail → active apps → copy → conversation/result stage → testimonial context`

- A role change resets and introduces the appropriate deck, with staggered role-card reveal and synchronized copy.
- Selecting a time moves to the associated card. It does not merely replace text.
- Selecting an app already used by the front card is intentionally inactive. Selecting another available app finds the first matching card and animates to it.
- For Everyone, Gmail advances to the feedback card; Calendar leads back to the meeting/action card; Drive or Excel leads to the budget card.
- App availability changes by role. Current-card apps are emphasized; other available apps are dimmed. The source uses actual app marks and per-mark widths inside 40px dock tiles.
- Conversation and result are distinct stages. Tool rows, prompt exchange, resulting artifact, replay, and prompt modification belong to the selected card.
- The source includes keyboard navigation and drag/card control. Motion must settle into a valid state after an interrupted interaction.

### Deck choreography

Source rest poses are:

| Depth | Scale | Y offset |
|---|---|---|
| Front | 1 | 0% |
| Second | 0.9395 | -6.19% |
| Third | 0.8765 | -13.07% |

Stack ordering uses explicit z-indices. Card advance sends the front card sideways by about 1.15 × card width, rotates it by 9 degrees in the transition direction, then cycles it behind the deck. The exit uses 0.45s `power3.out`; settling uses approximately 0.55s. Copy has its own 0.18s exit and 0.3s entry. These are not equivalent to a generic opacity crossfade.

The pinned section uses measured geometry and a scroll span of 800 × the maximum deck length, with snapping to card-centered states. Reproduce the controller's forward and reverse behavior, including synchronization after dock/time clicks.

Evidence: product runtime around lines 13004, 15970–17030; `motion-and-map-source.json`; successful final `role-capture-status.json`.

## 5. Testimonials: missing component, real-content dependency

The reference has six slide records combining video/audio treatments and quote/logo treatments. Some are associated with specific roles. The component includes media controls, waveform/progress, speaker metadata, alternate cards, and transitions. A blank gap or a replacement manifesto does not satisfy this section.

Rebuild the visual/media component from the source specification. Production quotes, names, logos, and videos must be genuinely authorized Horizon material. Reference-company customers cannot be relabeled as Horizon customers, and new endorsements must not be invented. Until supplied, the local design study must identify reference-only material or show an explicit content-needed state.

Evidence: `testimonial-data.json` in the raw audit folder; component inventory and current product source show the missing implementation.

## 6. Capability graph and drawer

The source desktop graph defines 34 nodes and 38 edges in a 1456 × 695 coordinate system. It includes six primary capability groups plus secondary items. There are separate compact coordinate planes; shrinking the desktop graph uniformly is incomplete.

Required behavior:

- Preserve the actual coordinate/edge graph and its spacing.
- Introduce connections and labels in the source order, then retain gentle node motion.
- Highlight related nodes and edges on interaction.
- Show the associated floating detail card, including a clip where one exists, description, and real destination.
- Keep floating cards within the graph/viewport bounds.
- The CTA reads **See all capabilities** and opens the capabilities drawer. It must not navigate to the projects page.
- The live drawer measured 536px wide at the large desktop viewport and includes category navigation, detail sections, clips, close/scrim behavior, and focus management.
- Link all supported Horizon capabilities to real internal detail pages. Do not claim unavailable vendor-specific features as current Horizon functionality.

Evidence: `motion-and-map-source.json`; product runtime around lines 17778–19670; live reference drawer inspection.

## 7. Lower role/task library

Reproduce the three-column layout at its source maximum width: compact role rail, large central layered deck, compact task rail. The current column sizing, oversized task text, and direct iframe replacement flatten the composition.

- A role changes the relevant task group and active card.
- A task can change the selected role as well as the artifact.
- The outgoing card must leave/cycle behind the stack and the incoming card must become the front card with the correct swatch, texture, screenshot fallback, aspect ratio, and iframe.
- The active role and task are emphasized; related tasks retain their secondary emphasis.
- Preserve the sentence-style selector heading and its inline selected values rather than forcing an arbitrary line break.
- The artifact CTA opens its corresponding case page. Do not send every artifact to the release download.
- Keep iframe loading, replay, and offscreen media behavior scoped to the active artifact.

Evidence: `useCaseLibrary-data.json`, supplied screenshot 3, and the UseCaseLibrary stylesheet/runtime modules.

## 8. FAQ, closing prompt, navigation, and footer

The FAQ is a narrow, centered accordion with a first-open state, serif question typography, generous row spacing, and plus/minus controls. Preserve its relationship to the closing section.

The closing action and footer prompt must have defined destinations. For Horizon, Try Horizon leads to the beta/download area and Join Waitlist to the functional signup page. A prompt-style input must actually accept a question and continue into an intended workflow; a decorative textbox is not acceptable.

The source product navigation includes a second product/explore row. The earlier custom breadcrumb list was wrong; removing it did not reproduce the real second row. Restore the source structure with truthful Horizon destinations.

The footer is not an automatically balanced dump of every route. Use the reference hierarchy: a large left brand/prompt region, four link columns containing multiple named groups, and a lower legal/social/language utility row. Assign each link to the right group and validate its intended destination during the later owner-review stage. Do not manufacture products, pricing tiers, partnerships, certifications, or social accounts to fill the layout.

Evidence: supplied screenshots 4/5, product DOM/component inventory, and current `SiteChrome.tsx`.

## 9. Lab homepage findings

The current reference mission is two inline treatments, a sans lead and serif continuation. At 1440 × 1000 its H1 is approximately 40.56px with a 50.70px line-height. The observed H1 begins at document Y=132px and remains 152.11px tall.

In the inspected reference, scrolling from 0 through 1800px moves that statement with normal document flow. It is not the 175svh pinned, word-by-word sequence currently implemented in Horizon. That pinned treatment was a custom departure and should have been identified as such instead of being treated as reference reproduction.

The following artwork is a canvas beginning around document Y=332px in that viewport, with its own animated asset arrangement and centered feature copy. Its image placement and animation need to be mapped from the source rather than produced by a few arbitrary sine offsets.

After that, preserve the announcement-card rows, resource imagery/carousel controls, search/menu layers, and grouped lab footer. All cards need genuine detail destinations. Horizon's lab copy and publication status remain factual; the reference company's corporate and model-release claims are not reusable Horizon facts.

Evidence: `lab-scroll-observations.txt`; completed new dark-scheme REA lab capture; prior dense canvas captures.

## 10. Every-page design work

The 101-page reference inventory includes several different product, editorial, model, solution, company, marketplace, resource, form, and legal families. A large count of Horizon routes does not establish that those families have been designed.

Use `reference-page-inventory.json`, `page-outlines.json`, and `component-inventory.json` to build a route-by-route correspondence. For every Horizon destination record:

1. Reference page and family.
2. Hero composition and responsive container.
3. Required section order and content-specific components.
4. Asset assignment with source file/URL.
5. Interactive states and destinations.
6. Real Horizon content, publication status, and ownership.
7. Remaining content decisions and owner-review status.

### Required family distinctions

| Family | Required treatment |
|---|---|
| Lab homepage | Mission, animated canvas feature, announcements, resource carousel |
| Product overview | Full scroll narrative and coupled interaction systems |
| Product/feature landing | Feature-specific hero, media/demo sequence, capability details, CTA |
| Models | Real model/compatibility information; no invented Horizon model releases |
| Research overview/team | Research-specific listing and detail hierarchy; genuine work/status |
| Article/news | Content-specific headline, metadata, body structure, figures, related reading |
| Solutions | Role/industry-specific story, demos, and substantiated evidence |
| Marketplace/tools | Search/filter/detail states and real supported entries |
| Resources | Actual resource collections, detail pages, and meaningful discovery |
| Company/careers | Company narrative and truthful opportunity state |
| Forms | Real validation, persistence, result/error states, and policy links |
| Legal/policy | Document-focused reading layout and owner-approved substantive content |

The existing generic templates and repeated imagery should not be counted as completed equivalents. These families must be rebuilt from their actual references. Features without a real Horizon offering need an explicit content decision rather than a fabricated product page.

## 11. Asset assignment

`asset-plan.csv` maps source assets to components. The operating rule is one explicit assignment per required role or slot: hero slot, preview cover, workday conversation, workday result, app mark, testimonial media, capability clip, library artifact, or editorial figure.

Do not rotate arbitrary image indices across unrelated pages. Do not substitute an SVG that vaguely resembles an app mark. Do not use a lower-library screenshot as the complete workday animation. Do not present a partially captured video response as a complete playable file.

## 12. Rebuild order and review gates

1. **Reference geometry foundation:** source containers, typography, dark tokens, both navigation rows, responsive rules. Keep approved text-only Horizon branding and actual form routes.
2. **Hero and preview:** exact two-ring data/geometry, time controller, pointer/scroll response, masks, preview scrub, numbered benefits. Stop adding unrelated animations.
3. **Workday system:** separate 21-card dataset, deck state machine, role transition, clock, connector selection, stage playback, and keyboard/mobile behavior.
4. **Proof and capabilities:** testimonial component with content provenance; exact graph, floating cards, and capabilities drawer.
5. **Artifact library and page ending:** stack transitions, task/role synchronization, detail routes, FAQ, prompt continuation, footer hierarchy.
6. **Lab homepage:** actual statement flow, source canvas sequence, announcement cards, resources, search, and lab navigation/footer.
7. **Internal families:** map every reference inventory entry to a truthful Horizon page/content decision, then implement by family and populate page-specific media/content.
8. **Owner review:** provide local checkpoints for manual comparison. No local UI automation, sub-agents, or production release without a change to the user's current instructions.

A component is ready for owner review only when the documented entry, rest, hover, click, scroll-forward, scroll-backward, keyboard, and reduced-motion states that apply to it have implementations. File or route count is not an acceptance criterion.

## Limits of this audit

The two main references received detailed geometry, runtime-source, and interaction inspection. All 101 primary references received structural and component indexing; this does not mean all 101 received a complete live interaction walkthrough. Those remaining family-level behaviors are explicit rebuild work. Capture-tool attempts that failed on hidden/offscreen targets are recorded; the repaired role scenarios completed and are distinguished from the earlier failures.

No changes were made to the live Horizon site during this audit. The next implementation should follow this specification and remain in local review until the owner requests publishing.
