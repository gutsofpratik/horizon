# REA evidence and workspace reliability

This update keeps Horizon's own agent loop and adds distinct Chat, Work and Code profiles. It does not claim to reproduce a proprietary agent's model or private backend.

## REA investigation performed

Used the MIT-licensed [morluto/rea](https://github.com/morluto/rea) CLI, package `rea-agents@6.8.0`, installed outside this repository. No agent/MCP configuration was replaced.

- Statically analyzed the installed Codex Electron client version `26.1103.31037`, selecting its shipped early bootstrap and preload. Artifact SHA-256: `f23881d331586be7c036b7de4146e0dd0db1fbf96da4a9a83c3f711cd781cd67`.
- REA parsed two selected JavaScript files without parse failures. It observed three context-bridge APIs, 22 exposed members, and 18 literal IPC channel names. These are static observations; they do not establish server behavior, runtime registration, policy enforcement or model intelligence. Other files were intentionally outside scope; semantic retention limits were reached.
- A full selected Horizon renderer analysis reached REA's 300-second per-source deadline. A narrowed pass over the shipped desktop bootstrap completed: one parsed source, 851 visited AST nodes, no parse failures. It does not establish full renderer coverage.
- Exported all 282 available tool-interface descriptions locally, without credentials or user responses, and analyzed that inert interface module with REA. The selected source parsed without failures. Interface descriptions do not reveal hosted implementations.
- Used REA Process Capture to run Horizon's executable contract suite against temporary/in-memory fixtures. The captured process exited with code 0. REA reported verified owned-process-group cleanup and removal of its temporary root. This run exercised local file/search/edit contracts and workspace/agent tests, not every hosted tool or real account integration.

Raw Codex application evidence stays outside the repository. No proprietary source, user profile, cookies, chat database or credentials are included here.

## Behavior and checks

Chat emphasizes conversation, research and adaptive/direct/Socratic tutoring. Work emphasizes source-grounded deliverables and explicit artifact verification status. Code emphasizes repository instructions, observed file hashes, project checks and final evidence. Conversations retain their workspace; histories, entry screens, default tools and guidance differ. Workspace choice never grants permissions.

Regression tests cover routing, explicit restrictions, file pagination, nested instructions, conflicting writers, completion path identity, test invalidation, token usage streaming, image budget estimates, cancellation and independent read batching. The contract runner discovers actual checked-in tests on every platform and records successful controlled handler observations. Scenario inventory distinguishes runnable cases, unverified historical entries and blocked dependencies; it cannot certify missing fixtures or metadata alone.

## Limits

These changes are not a model-quality benchmark. They do not add universal language-server semantics, certify every tool/provider, reproduce the full Windows accessibility suite on other operating systems, or prove Office visual layout and formula recalculation. Office results now expose required review explicitly; structural validation is not final correctness. Native Windows/macOS execution needs platform testing. Existing installer assets are not replaced by a source update.
