# Reference design capture and implementation

Reference sources: https://www.anthropic.com/ and https://claude.com/product/overview.

REA CLI 6.8.0 captured the public references with motion enabled. The scope was every discoverable primary page and product/menu destination, excluding individual articles, documentation trees, and translated duplicates unless directly included in primary navigation.

- Primary inventory: 101 URLs; 3,736 screenshot samples, 2,027 unique frames; no failed actions in the final primary suite.
- Desktop navigation: five dropdowns on each reference.
- Main-page dense passes: 105 Anthropic samples and 345 Claude samples, averaging 6.4 and 8.9 captures/second. These are stepped browser captures, not native every-frame video.
- Mobile captures: both main pages at 390 × 844, including menus and scrolling.
- Extended passes: six long pages at 80 PageDown steps, followed by nine pages at 120 steps. Every scenario ends with End and a settled final capture.
- Shared asset export: 7,451 captured response bodies, 1,850 unique assets; all 101 document response audits returned without HTTP error status.
- Some secondary-page network event streams are incomplete because requests remain in flight. Completed browser actions do not imply a complete runtime reconstruction or a pixel-equality guarantee.

Raw scenarios, DOM, network response exports, screenshots, inventory, and audit reports are in the ignored `.playwright-mcp/` directory. Reference assets used by the UI are in `public/reference/`.

The implementation follows the references' typography, paper palette, layout proportions, collage/orbit heroes, navigation, project cards, role selector, pinned product scene, capability diagram, and dark directories. Brand labels, product screenshots, public links, supported capabilities, and download destinations belong to Horizon. Reference-company metrics, testimonials, pricing, and research releases are not presented as Horizon facts.

Validation: production build and lint, five routes at 390/768/1440 widths, dropdowns/Escape, modal naming and dismissal, keyboard role tabs, four scroll chapters, animation pause controls, and reduced-motion behavior. Contact email remains a placeholder as requested.

## Local preview revision

The site now includes internal research, model-guide, skill-library, product-feature, developer, community, company, availability, download, use-case, and policy routes. Homepage cards and navigation point to those internal destinations. A text wordmark replaces the invented symbol. Download labels and package links use the browser platform. Cookie preferences are stored locally; optional analytics and marketing are not installed. The empty preview player has been removed.

Per the user's instruction, no UI testing or other verification was run for this revision. It is a local preview for user review, not a published update. Exact reference parity has not been established.

## Dark preview and expanded site

The latest local revision uses a neutral dark palette, text-only wordmarks, scroll-controlled mission text and collage entry, and sequential capability-line and label reveals. The pause/resume controls have been removed. Header and article CTAs lead to the waitlist; the product hero provides both Try Horizon and Join Waitlist.

Role and task demonstrations now use 18 distinct interactive HTML artifacts and actual app SVG marks from the captured reference source. Each role selects its own three artifacts; each task changes the displayed artifact. These sandboxed examples are reference-derived demonstrations, not claims that every represented external app is a built-in Horizon integration.

The site catalog now includes model-learning chapters, practical setup and workflow guides, research perspectives, product pages, company pages, use-case detail pages, policies, platform beta pages, and the waitlist/contact forms. Article, lesson, practical-guide, feature, case-study, and directory layouts vary by content type. The footer exposes the page directory.

No UI tests, build checks, or test submissions were run for this revision, at the user's request. Production publishing is on hold; review the local preview.
