# MGBC Engineering Skill Matrix

This document defines when each project-local review skill is selected. Skills complement `AGENTS.md` and are advisory quality gates; they do not override project invariants or product decisions.

| Skill | Purpose | When |
| --- | --- | --- |
| `ui-review-loop` | Evidence-based visual and interaction QA. | After meaningful UI work, before production approval. |
| `clean-code-guard` | Detect AI-generated code-quality and maintainability problems. | Second-pass review of meaningful implementation diffs. |
| `test-guard` | Audit test quality and false confidence. | After creating or modifying tests. |
| `docs-guard` | Audit documentation for misleading, stale, duplicated, or unverifiable claims. | After meaningful documentation changes. |

`wp-guard` and `woo-guard` are intentionally not installed. MGBC is an Astro/TypeScript website, not a WordPress or WooCommerce project.

Use the guards reactively. Do not refactor unrelated application code solely because a skill is available.

## Current setup status

`ui-review-loop` is `INSTALLED / SELF-TEST PASSED / BLOCKED_BY_BROWSER_RUNTIME`. The documented `agent-browser install` command could not fetch Chrome for Testing because the environment returned the certificate error `UnknownIssuer`. No usable Chrome or Chromium executable was available on `PATH` or in the checked common roots. `agent-browser 0.32.4` supports an existing browser through `--executable-path` or `AGENT_BROWSER_EXECUTABLE_PATH`; no machine-specific path is committed here.

The project validation baseline remains Node 22 as required by `AGENTS.md`. Node 22 validation passed for dependency installation, `agent-browser --version`, `astro check`, and `astro build`; npm emitted an upstream `EBADENGINE` warning because `agent-browser 0.32.4` declares Node `>=24` in its package metadata. This setup does not migrate MGBC to Node 24.
