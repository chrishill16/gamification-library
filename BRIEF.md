# The Gamification Library — BRIEF.md v1.0

> **Authority:** This document is the sole developer specification for v1.0. It supersedes all earlier briefs, drafts and conversation notes.

## Purpose

Create a visual, searchable reference library that helps product managers and designers move from a behavioural objective to relevant design patterns, authentic real-world implementations and appropriately qualified evidence. The core journey is: **Behavioural problem → Relevant patterns → Real implementations → Evidence and design insights.** The library must distinguish genuine gamification from adjacent behavioural engagement techniques and must never imply that a pattern guarantees an outcome.

## Audience

- **Primary:** Product managers and UX/product designers seeking practical, credible design inspiration.
- **Secondary:** Growth and experimentation teams, researchers and behavioural-design practitioners.
- Users understand digital products but may not know gamification or psychology terminology. They value fast visual browsing, plain-language analysis, authentic screenshots and traceable sources.

## Success criteria

1. A visitor can start with a behavioural objective and reach plausible patterns, implementations and supporting psychology.
2. Search and filters connect behaviours, patterns, products, industries, psychology and evidence without dead ends.
3. Every pattern is visibly classified as **Gamification Mechanic** or **Adjacent Engagement Pattern** everywhere it appears.
4. Every published implementation and claim is traceable to an identifiable source; uncertainty and evidence quality are explicit.
5. The responsive static site supports shareable filtered URLs and works accessibly on desktop and mobile.

## Pages & structure

1. **Discover / Home:** Header and primary navigation; search; three entry points—Explore Behaviours, Explore Mechanics and Explore Examples; featured patterns, implementations and psychology links.
2. **Behaviour Explorer:** Nine behaviour cards. Selecting one shows its definition, sample objectives, curated relevant patterns with rationale, real implementations, supporting psychology and related behaviours. Recommendations are hypotheses, not promises. Results support Gallery/Research view.
3. **Mechanics Explorer:** Searchable, filterable catalogue of patterns grouped by family. Cards show name, classification badge, family, behaviours and representative visual. Detail pages include definition, classification rationale, operation, variants, possible behaviours, psychology with qualifications, implementations, risks and sources. Gallery view may use representative visuals rather than product screenshots.
4. **Examples Gallery:** Searchable, filterable real implementations. Cards link to detail pages containing product/feature, authentic screenshot gallery, factual description, **Mechanic Stack**, target behaviours, psychology, evidence, design decisions, trade-offs, related entries and sources.
5. **Psychology Reference — LATER:** Dedicated family/principle pages linked to patterns and implementations. In v1, psychology remains available as tags, filters and concise explanations.

Detail routes must be directly addressable and survive refresh on GitHub Pages.

## Features & interactions

### MUST

- **Global search:** Search names, descriptions, behaviours, products and psychological principles.
- **Filters:** Multi-select Pattern Type, behaviour, mechanic family, psychology and industry. Use OR within a dimension and AND across dimensions. Show count and active filters; allow individual removal and reset-all. An empty state explains the result and offers reset; it never invents recommendations.
- **Gallery / Research toggle:** A two-option segmented control, **Gallery | Research**, on Examples, Behaviour and Mechanics explorers. Gallery is the default: large visuals, compact metadata, responsive 3/2/1-column grid. Research uses denser rows/cards with description, behaviours, psychology, evidence and smaller imagery. Both views show the **same ordered result set** from the same data/filter logic. Switching preserves search, filters and sorting. Persist the selected view across catalogue navigation in `localStorage`.
- **URL state:** Search, filters and sort are query parameters and therefore shareable. View preference may remain local-only.
- **Classification:** Every pattern record has exactly one type: **Gamification Mechanic** (game-inspired structures such as streaks, levels, challenges or achievements) or **Adjacent Engagement Pattern** (behavioural engagement without necessarily using a game structure). The badge is mandatory on cards, results and detail pages; default filtering is All Patterns.
- **Behaviour-led discovery:** Default ordering is manually curated relevance. Explain why each pattern may relate to the selected behaviour and link through to implementations and evidence.
- **Mechanic Stack:** Each implementation identifies all combined patterns, each pattern's role, and links to its detail page. Separate the underlying mechanic from its visual/interface expression and design variations.
- **Evidence classifications:** Show on Research cards and implementation pages: **Experimental evidence** (controlled intervention with outcomes), **Observational evidence** (measured association without demonstrated causation), **Reported outcome** (company-published result with limited methodology), and **Illustrative example** (documented implementation without verified outcome evidence). Labels describe available evidence, not universal effectiveness; distinguish documented objectives from inferred intentions and causation from correlation.
- **Authentic screenshot provenance:** Never generate or misrepresent product screenshots. Each image requires product/feature, source URL, capture or publication date when known, attribution/rights notes and last-reviewed date. Use a polished neutral placeholder plus source link when a permitted authentic image is unavailable.
- **Responsive/accessibility:** Keyboard-operable controls, visible focus, semantic structure, useful alt text, sufficient contrast and mobile filter drawer.

### LATER

Saved/shareable collections, side-by-side comparison, natural-language/AI discovery, hypothesis generation, user submissions, accounts and a content-management interface.

## Content

### Controlled taxonomy

**Nine behaviour categories:** Activate (first meaningful action); Repeat (increase frequency); Sustain (maintain participation); Complete (finish a task/journey); Explore (try unfamiliar activities); Deepen (increase skill, effort or commitment); Connect (interact, collaborate, share or compete); Contribute (create value for others); Switch (adopt an alternative behaviour).

**Twelve mechanic families:** Progress & Completion; Goals & Challenges; Habits & Consistency; Achievements & Recognition; Levels & Mastery; Rewards & Incentives; Collections & Discovery; Competition & Comparison; Collaboration & Community; Unlocking & Access; Feedback & Reinforcement; Narrative & Exploration.

**Six psychology families:** Motivation & Autonomy; Goals & Progress; Loss & Ownership; Social Influence; Learning & Reinforcement; Attention & Decision-Making.

### Model and editorial rules

- Connected hierarchy: **Family → Core Pattern → Variant/Supporting Feature → Implementation → Evidence**; psychology is an explanatory layer. Relationships are many-to-many and use stable IDs.
- Keep observable target behaviours separate from business outcomes. Clearly distinguish established theories, cognitive effects and broader constructs.
- Each implementation includes factual description, classification-aware Mechanic Stack, behaviours, qualified psychology, evidence/limitations, design decisions, risks, sources and last-reviewed date.
- Initial content should prove the structure with verified entries, not hit a quota. Candidate examples such as Duolingo Streaks, Apple Activity Rings and Spotify Wrapped are publishable only after verification. Never fabricate claims, metrics, quotations, sources or screenshots.
- All content lives in version-controlled **JSON** records. Required entities: behaviours, pattern families, patterns, psychology, implementations, evidence, sources and screenshot metadata. Validate required fields, enum values, unique IDs and referential integrity at build time.

## Look & feel

Premium, editorial and visual-first: the browsing efficiency and screenshot emphasis of Mobbin, paired with the accessible behavioural explanation of Growth.Design. Use strong typography, generous whitespace, restrained colour, subtle borders and compact taxonomy tags. Screenshots lead Gallery cards; readable analysis leads Research view. Avoid a corporate dashboard, academic density, visual clutter and gamifying the library itself. Default identity: warm off-white/neutral surfaces, dark text, one restrained accent and a modern accessible sans-serif. Tone is intelligent, practical, curious and evidence-aware.

## Technical constraints

- React, TypeScript, Vite and Tailwind CSS; static deployment to GitHub Pages through GitHub Actions.
- No backend, database, authentication, CMS, paid service or required external API.
- Client-side search/filtering over JSON; one shared selector pipeline must feed both layouts.
- Stable slugs/IDs and build-time schema/content validation; static assets stored in-repository where publication is permitted.
- Configure Vite base paths and GitHub Pages routing/fallbacks for repository hosting, deep links and refreshes.
- Prioritise accessibility, responsive performance and maintainable typed data access.

## Out of scope

Accounts, personal workspaces, backend services, CMS/admin tools, AI chat or semantic search, automated scraping/ingestion, fabricated or generated “authentic” screenshots, user submissions, ratings/comments, saved collections, comparison tools, hypothesis generation, monetisation and comprehensive catalogue population before launch.

## Open questions

1. **Exact brand identity and logo:** Use the neutral editorial default above; branding must not delay v1.
2. **Screenshot permissions/availability:** Publish permitted authentic images with provenance; otherwise use the specified placeholder and source link.
3. **Initial verified dataset:** Publish only records meeting minimum editorial fields; keep incomplete candidates out of public results.
4. **Taxonomy refinement:** Preserve the 12 families and stable IDs; classify overlaps as core patterns, variants or supporting features rather than duplicating them.
5. **Repository/account/custom domain:** Default to repository `gamification-library` on standard GitHub Pages until ownership details are supplied.

