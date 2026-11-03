# Contributing to Horizon

Horizon brings local inference, connected providers and agent tools into one desktop workspace. Contributions that improve reliability, clear feedback and usable outcomes are especially welcome.

## Before you start

Search [existing issues](https://github.com/gutsofpratik/Horizon/issues) for related work. For a larger change, open an issue describing the problem, intended behavior and affected platform before implementing it. Include a small reproducible example for bugs. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## Development setup

Use Node.js 22 or newer, npm and a current Rust toolchain. Windows desktop development also needs WebView2 and the native prerequisites for your Rust target. See the [README](README.md) for platform setup and runtime requirements.

```sh
npm ci
npm run dev
```

For the native desktop, use `npm run desktop`. Build shared/web code with `npm run build`, desktop assets with `npm run build:desktop`, and the pinned agent engine with `npm run build:engine`. Engine preparation retrieves the revisions in `third-party/engine`; generated upstream checkouts and build products are not source contributions. Docker is optional, not a prerequisite for ordinary local document workflows.

## Making a change

- Keep Horizon's interface and existing user data intact. Describe migrations and provide a rollback path when storage changes.
- Keep native operations behind desktop contracts. Web code must not import desktop-only modules.
- Validate tool arguments before execution. Preserve successful results, report unavailable capabilities honestly and never replay an operation with an unknown outcome automatically.
- Respect approval controls for every engine, assistant and team member. A skill must not grant itself permissions.
- Never silently send a local conversation to a cloud provider. Keep credentials out of logs, fixtures, screenshots and exports.
- Preserve original upstream skills, resource hashes, licenses and provenance. Put Horizon integration changes in adapters or separately identified patches.
- Add or update narrowly focused checks for changed behavior. Use temporary workspaces and non-sensitive fixtures for file/process operations.

Run `npm run typecheck`, `npm run lint`, `npm run build` and the relevant component builds before submitting. The public source snapshot does not include the maintainer's private verification fixtures; do not invent passing test results. Explain which checks you ran and which live integrations you could not verify.

## Pull requests

Use a focused branch and commit related changes together; keep separate bug fixes in separate commits. Describe the concrete problem, resulting behavior, verification and any limitations. Include app-window-only screenshots for visible UI changes, without a cursor, personal data, secrets or unrelated desktop content. Avoid unrelated formatting and generated files.

Do not commit model weights, credentials, databases, browser profiles, runtime downloads, compiled packages, `node_modules`, upstream vendor checkouts or personal logs. Adding a dependency requires its source, license and redistribution requirements to be recorded.

## Releases and licensing

Maintainers publish installers separately from source changes. Do not change update trust keys, release assets or package-signing identities in an ordinary pull request. A successful build is not proof of live hardware or provider compatibility.

Contributions to Horizon code are under [MIT](LICENSE). Third-party code and skills retain their own licenses; the application license does not override them. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
