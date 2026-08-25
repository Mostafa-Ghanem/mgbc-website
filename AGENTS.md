# MGBC Website — Agent Operating Contract

## 1. Project Continuation Rule

This is an existing production website project.

DO NOT restart:
- product discovery
- competitor research
- SEO strategy
- information architecture
- content strategy
- design direction

unless the user explicitly requests reopening one of those decisions.

Before meaningful work, inspect the current repository state and read the project source-of-truth documents referenced below.

---

## 2. Source of Truth

Business/product decisions live in the MGBC Google Drive project.

Read, when available:

1. CURRENT_STATE.json
2. LOCKED_DECISIONS.md
3. MASTER_INDEX.md
4. PROJECT_STATUS.md
5. CHANGELOG.md

Drive project:
https://drive.google.com/drive/folders/1sFE5EV1sOF9XIk5CyyZeBnTU_6hH7QVg

Repository:
https://github.com/Mostafa-Ghanem/mgbc-website

Current pre-production work is on:
phase3/astro-assembly

Production/main must not be modified or released unless explicitly authorized.

---

# 3. Product Invariants

These are contracts, not implementation suggestions.

MGBC is positioned as a:

Saudi Financial & Tax Advisory Firm

serving decision makers including CEOs, CFOs, founders and investors.

The website must NOT regress into:
- a traditional accounting-office appearance
- generic SaaS
- generic AI-generated website styling
- template-like repeated card/grid layouts

Verified core services currently include:
- Financial Advisory
- Tax & Zakat Advisory
- Feasibility Studies

Do not invent additional service claims without verified input.

Verified numerical proof currently approved:
+7 years in the Saudi market.

Never invent:
- clients
- customer counts
- project values
- awards
- certifications
- licenses
- testimonials
- team credentials
- performance results

---

# 4. Design Contract

Direction:

Corporate + Editorial + Cinematic + Financial Intelligence.

Avoid:
- generic AI gradients
- glowing blobs
- excessive glassmorphism
- excessive bento grids
- fake dashboards
- fake AI people
- decorative animation without purpose
- repeated Icon + Heading + Text sections everywhere

Current visual language:
- deep navy
- warm paper
- restrained brass/gold
- IBM Plex Sans Arabic
- IBM Plex Sans
- restrained Lucide iconography
- subtle financial/data patterns

Preserve strong Arabic RTL composition.

---

# 5. Architecture Principle

IMPORTANT:

Current file locations are implementation details, NOT permanent architecture.

The current system uses files such as:

- src/styles/tokens.css
- src/styles/global.css
- src/styles/home.css

Do not bypass their current ownership with local patches.

However, during an explicitly approved architecture/refactoring task, these files MAY be reorganized.

Any refactor must preserve:

1. One authoritative source for global design tokens.
2. No duplicated global rules.
3. Clear component ownership.
4. No inline global styling.
5. No repeated brand constants.
6. RTL behavior.
7. accessibility.
8. SEO semantics.
9. performance.
10. existing intended visual behavior unless redesign is requested.

If architecture changes, migrate all consumers, imports, tests and documentation in the same change.

Do not preserve bad architecture merely because it is documented here.

---

# 6. No-Patching Rule

For normal bug/UI work:

Before editing, identify whether the issue is:

- token/system-level
- global component
- page template
- page-specific
- content/data
- interaction behavior

Fix it at the lowest correct ownership level.

Never solve one global issue independently in several pages.

Never add overrides simply to defeat an earlier rule.

If a fix requires multiple increasingly-specific overrides, stop and diagnose the architecture first.

---

# 7. Refactoring Policy

Refactoring is encouraged when it materially improves:

- maintainability
- consistency
- component boundaries
- duplication
- performance
- accessibility
- testability
- developer experience

But do not combine large unrelated refactors with a narrow visual bug fix.

Use separate, reviewable changes.

Before a significant refactor:

1. inspect current behavior
2. define invariants
3. identify affected files
4. establish tests/checks
5. implement
6. verify behavior
7. remove obsolete code
8. update architecture documentation

Never leave compatibility shims indefinitely without documenting why they exist.

---

# 8. Specialized Skills

Use specialized skills when relevant.

Skills are reviewers/engineering methods — they do NOT automatically override product contracts.

Typical workflow:

TASK
↓
Inspect existing implementation
↓
Select relevant specialized skill(s)
↓
Audit
↓
Produce findings
↓
Prioritize
↓
Implement
↓
Run technical checks
↓
Run UI/behavior verification
↓
Regression review
↓
Update documentation/state

Examples of review areas:
- UI/visual regression
- accessibility
- Astro architecture
- CSS architecture
- TypeScript
- performance/Core Web Vitals
- SEO
- security
- responsive design
- code quality

Do not blindly implement every recommendation from a skill.

For each recommendation determine:
- Is it applicable to this project?
- Does it conflict with a product invariant?
- Does it create unnecessary complexity?
- Is there measurable benefit?

Product/business constraints win unless the user explicitly changes them.

---

# 9. UI Review

After meaningful UI changes, run evidence-based UI review.

Preferred skill:
https://github.com/amElnagdy/ui-review-loop

Test relevant states and interactions, not only static screenshots.

At minimum verify:
- desktop
- real mobile viewport
- RTL
- navigation
- menu states
- click-outside
- Escape
- focus/keyboard behavior
- typography
- section rhythm
- overflow
- broken assets

Never fabricate a successful review when tool prerequisites are unavailable.

---

# 10. Quality Gates

For code changes, run applicable checks.

Baseline:

- Astro check
- TypeScript check
- production build
- broken-link checks
- responsive QA
- RTL QA
- accessibility review
- SEO validation
- visual verification

Use Node 22 for the project validation environment unless the repository is intentionally migrated.

Do not consider a task complete only because compilation succeeds.

---

# 11. Performance

Maintain or improve Core Web Vitals.

Avoid unnecessary client JavaScript.

Prefer Astro/static HTML and CSS-first behavior when appropriate.

Images/fonts/assets must be optimized.

Do not introduce a large dependency for functionality that can be implemented simply.

---

# 12. Content / SEO Boundaries

Do not rewrite approved business copy during engineering refactors unless necessary.

Do not alter:
- search intent
- service positioning
- URLs
- metadata strategy
- internal-link strategy

as a side effect of code cleanup.

If technical restructuring requires URL/content changes, flag them explicitly before implementation.

---

# 13. Change Discipline

Touch only files needed for the current task.

Do not “clean up” unrelated sections opportunistically.

If unrelated technical debt is discovered:
document it in the engineering backlog instead.

For substantial changes report:

- problem
- root cause
- files changed
- architectural impact
- validation performed
- remaining risks

---

# 14. Future Architecture Work

The project is expected to continue evolving.

Future work MAY include:

- CSS architecture cleanup
- design token refinement
- component consolidation
- stronger page composition system
- content schema improvements
- improved automated testing
- richer QA coverage
- analytics integration
- CRM/form backend
- localization improvements
- build/deployment hardening
- performance optimization

Do not treat current architecture as final.

The goal is a progressively cleaner system, not permanent preservation of historical implementation.

---

# 15. Conflict Resolution

Priority order:

1. Explicit current user instruction
2. Product/business invariants
3. Latest Drive source-of-truth
4. Scoped AGENTS.md rules
5. Engineering roadmap
6. Specialized skill recommendations
7. Existing implementation

When uncertain, do not guess.

Inspect the latest state and report the conflict.

---

# 16. Completion Rule

A change is complete only when:

- requested behavior works
- architecture is not degraded
- applicable checks pass
- relevant UI states are verified
- obsolete implementation is removed when replaced
- documentation/state is updated for meaningful architectural changes

Do not merge or publish production unless explicitly approved.
