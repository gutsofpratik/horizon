# Security policy

## Supported release

Security fixes target the latest stable Horizon release, currently **0.3.4**. Older installers are historical snapshots and may lack recent repairs. Update to the latest release before reproducing a suspected vulnerability. Public Windows publisher signing is not currently claimed; signed update metadata authenticates an update manifest, not a Windows publisher identity.

## Report privately

Use [GitHub private vulnerability reporting](https://github.com/gutsofpratik/Horizon/security/advisories/new). Do not post working exploits, credentials or private data in a public issue. If private reporting is unavailable, open an issue asking for a private reporting channel without disclosing exploit details.

Include the Horizon version, operating system, affected capability, prerequisites, reproduction steps, expected impact and a minimal redacted example. State whether the issue needs a malicious webpage, skill, model response, local application or remote request. Do not include API keys, profile databases, browser cookies, personal conversations or full unredacted diagnostics.

Reports are reviewed on a best-effort basis; no fixed response time or bounty is promised. Please allow a fix and coordinated disclosure before publishing exploit details.

## Security boundaries

- Model output, websites, files, plugins and skill instructions are untrusted input. They cannot authorize actions or change host permissions.
- Tools can modify files, run commands and interact with applications. Use approval restrictions and a dedicated workspace for untrusted tasks. Full access deliberately grants broader authority.
- Local API and native-service credentials protect privileged interfaces. Loopback is not a substitute for authentication. Do not expose these services publicly without a separately secured deployment.
- Provider credentials and browser sessions are sensitive. Removing a provider or revoking a Horizon key does not revoke an upstream credential; revoke it with its issuer when needed.
- Profile passwords control application access. They do not encrypt the entire profile database or protect against another process with equivalent filesystem access.
- Downloads, extensions and third-party runtimes have their own trust and licensing requirements. Use official sources and verify release checksums. Do not bypass OS protection to run an untrusted package.

Back up saved work before updates. Do not share your data directory or browser profile as a reproduction. A public screenshot should contain only a demonstration Horizon window and no credentials or unrelated screen content.

## Verification scope

Automated checks, code review and checksums reduce risk; they do not establish that every tool, external service or model is vulnerability-free. Live checks depend on accounts, credentials, operating-system permissions and available hardware. Report reproducible boundary violations even if an integration is labeled experimental or unverified.
