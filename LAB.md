# CodeRabbit `.coderabbit.yaml` Lab — "Bugmaxxing"

> **Start here.** This repo is the hands-on exercise for the CodeRabbit
> enablement session. The code below `LAB.md` is a snapshot of
> [`directus/directus`](https://github.com/directus/directus) and is used
> only as a realistic codebase for the exercise.

## Goal

Design a `.coderabbit.yaml` configuration file that causes CodeRabbit to
surface **the most high-signal issues** in a pre-seeded buggy pull request.
The team whose configuration produces the most valuable review wins.

## How the lab is set up

- **`main`** branch — a snapshot of `directus/directus` at commit `5617985`
  (just before a real production bug was merged upstream).
- **`lab/oauth-multi-domain`** branch — the same snapshot with a real-world
  buggy PR applied on top. This PR was merged upstream as
  [directus/directus#26074](https://github.com/directus/directus/pull/26074)
  and subsequently reverted by
  [directus/directus#26239](https://github.com/directus/directus/pull/26239)
  after causing SSO redirect regressions in production (see issue
  [#26236](https://github.com/directus/directus/issues/26236)).

The PR touches **12 files** (~100 lines of production code plus extensive
test files) centered on OAuth/OpenID callback URL construction,
forwarded-host trust, and redirect allow-list handling.

## What you'll do

1. **Fork** this repository (`coderabbit-demo/bugmaxxing`) to your own
   GitHub account.
2. In your fork, **check out the `lab/oauth-multi-domain` branch**.
3. **Add a `.coderabbit.yaml`** file at the root of the repo on that branch,
   configured however you think will produce the most useful CodeRabbit
   review of the PR's changes.
4. Commit and push to your fork.
5. **Open a pull request** from your fork's `lab/oauth-multi-domain` branch
   **back to `coderabbit-demo/bugmaxxing:main`**.
6. CodeRabbit will review the PR. The diff it sees will be the PR #26074
   changes **plus** your `.coderabbit.yaml` file.
7. Iterate on your yaml by pushing new commits. CodeRabbit will re-review.

## Rules

- Your one and only code change must be the `.coderabbit.yaml` file.
  Don't edit anything else on the `lab/oauth-multi-domain` branch — we want
  everyone reviewing the same underlying diff.
- You may use any setting in the yaml schema: path instructions, learnings,
  pre-merge checks, tool toggles, knowledge base, etc.
- No peeking at the upstream revert PR or the follow-up fixes until your
  team's submission is locked.

## Hints on what's worth exploring

The PR touches authentication code, so configurations that enable
security-focused review or provide path-scoped guidance for
`api/src/auth/**` tend to do well. Consider:

- Which static analysis tools to enable/disable
- Path-specific review instructions
- Domain-specific learnings (e.g. "never trust forwarded headers without
  validation")
- Pre-merge checks
- Review depth and profile

## Scoring

Judges will evaluate submissions on (roughly):

- **Coverage** — how many of the real bugs were surfaced
- **Signal-to-noise** — true positives vs. nitpicks
- **Severity weighting** — did security and correctness issues lead?
- **Actionability** — can a developer act on each comment directly?

Good luck. May the best yaml win.
