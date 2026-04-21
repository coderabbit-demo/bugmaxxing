# CodeRabbit `.coderabbit.yaml` Lab — "Bugmaxxing"

> **Start here.** This repo is the hands-on exercise for the CodeRabbit
> enablement session. The code in this repository is a snapshot of
> [`directus/directus`](https://github.com/directus/directus) — see
> [About the codebase](#about-the-codebase) below — used only as a
> realistic base for the exercise.

## Objective

Design a `.coderabbit.yaml` configuration that causes CodeRabbit to
surface **the most high-signal issues** in a pre-seeded buggy PR. The
team whose configuration scores the highest on the point system below
wins.

## Format

- **Team size**: 3–4 people.
- **Time**: 30 minutes, start to finish.
- **Submission**: open a pull request from your fork's
  `lab/oauth-multi-domain` branch back to
  `coderabbit-demo/bugmaxxing:main`, with your `.coderabbit.yaml` added.
  The PR URL itself is your submission — no separate form.
- **Scoring starts** when CodeRabbit posts its review on your PR.
  Pushing fixes to trigger re-reviews is fine — the **final** review
  before the 30-minute buzzer is the one that's scored. Keep iterating
  until the buzzer.

## How the repo is set up

- **`main`** branch — a snapshot of `directus/directus` at commit
  `5617985`, just before the buggy PR was merged upstream. This is the
  base your PR will target.
- **`lab/oauth-multi-domain`** branch — the same snapshot with a
  real-world buggy PR applied on top. This PR was merged upstream as
  [directus/directus#26074](https://github.com/directus/directus/pull/26074)
  and subsequently reverted by
  [directus/directus#26239](https://github.com/directus/directus/pull/26239)
  after causing SSO redirect regressions in production (see issue
  [#26236](https://github.com/directus/directus/issues/26236)).

The PR touches **12 files** (~100 lines of production code plus
extensive test files) centered on OAuth/OpenID callback URL
construction, forwarded-host trust, and redirect allow-list handling.

## Step-by-step

1. **Fork** `coderabbit-demo/bugmaxxing` to one team member's GitHub
   account.
2. **Clone your fork** locally and check out the `lab/oauth-multi-domain`
   branch.
3. **Create `.coderabbit.yaml`** at the repo root with whatever
   configuration you think will produce the best CodeRabbit review.
4. **Commit** (only that file — see Rules below) and **push** to your
   fork.
5. **Open a pull request** from your fork's `lab/oauth-multi-domain`
   branch **back to `coderabbit-demo/bugmaxxing:main`**.
6. **Wait for CodeRabbit's review** to land on the PR. That triggers
   scoring.
7. **Iterate**: push new commits to your fork's branch to trigger
   re-reviews. The latest review before the 30-minute buzzer is the
   one scored.

## Scoring

Each comment CodeRabbit leaves on your PR scores points:

| Comment type                | Points |
| --------------------------- | -----: |
| **Outside-of-diff** comment |  **5** |
| **Inline** comment          |  **2** |
| **Nitpick** comment         |  **1** |

Your total is the sum across CodeRabbit's final review.

**Tiebreaker** (if two teams land on the same total): the team with the
**shorter `.coderabbit.yaml`** (fewer non-comment, non-blank lines)
wins. Encourages precision over kitchen-sinking.

## Rules

- The **only** code change on your PR must be the `.coderabbit.yaml`
  file. Do **not** edit anything else on the `lab/oauth-multi-domain`
  branch — every team must review the same underlying diff.
- Any yaml schema setting is fair game: path instructions, learnings,
  pre-merge checks, tool toggles, knowledge base, review profile,
  security review, etc. Full schema reference:
  https://docs.coderabbit.ai/reference/yaml-template
- **No peeking** at the upstream revert PR (#26239) or the follow-up
  fixes until your team's PR is opened and the clock has stopped.
- Don't sabotage other teams' PRs with comments or reactions.

## Hints on where to look

The PR is auth code, so configurations that push CodeRabbit toward
security-focused review tend to score well. Worth exploring:

- Which static analysis tools to enable for TypeScript + security
- **`path_instructions`** scoped to `api/src/auth/**` — auth files
  benefit from very different review guidance than, say, tests
- `reviews.profile` and review depth
- Pre-merge checks vs. inline feedback vs. summary toggles
- Whether to enable or disable `reviews.auto_review.drafts`

The highest-scoring entries typically lean on **path-scoped
instructions** — not a wall of every-option-enabled.

## FAQ

**Q: Can we use CodeRabbit's UI settings instead of the yaml file?**
No. The exercise is about the yaml. Per CodeRabbit's config precedence,
a `.coderabbit.yaml` in the PR head overrides UI settings for the
review of that PR.

**Q: Our PR isn't getting reviewed.**
Check that (a) CodeRabbit is installed on your fork, (b) the PR
targets `coderabbit-demo/bugmaxxing:main`, and (c) your
`.coderabbit.yaml` is valid YAML. If CodeRabbit can't parse your
config, it typically falls back silently — paste it into a YAML
linter before pushing.

**Q: Is there a minimum yaml we should start from?**
An empty `reviews:` block is valid. Start minimal and add settings you
can defend. See the tiebreaker rule.

---

## About the codebase

The code in this repository is a frozen snapshot of
[`directus/directus`](https://github.com/directus/directus) at commit
[`5617985`](https://github.com/directus/directus/commit/5617985135d197c76946c3e72240a6cdf1f49684).

Directus is an open-source, real-time data platform that layers a REST
and GraphQL API plus a no-code admin app on top of any SQL database
(PostgreSQL, MySQL, SQLite, OracleDB, CockroachDB, MariaDB, MS-SQL).
It's widely used, TypeScript-heavy, and its authentication subsystem
(OAuth 2.0, OpenID Connect, SAML, LDAP) is the area the lab's buggy PR
modifies — which is why this repo makes a realistic setting for the
exercise.

For the actual Directus project, docs, Cloud service, and contribution
guide, go to [directus.io](https://directus.io) and
[docs.directus.io](https://docs.directus.io). This fork is for
training only and should not be used as a Directus source of truth.

Directus is licensed under the Business Source License 1.1 — see
[`license`](./license) in this repo.

Good luck. May the best yaml win.
