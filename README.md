
# Suwstockdrill

Suwstockdrill is an AI tool for individual investors: a full report on a company, then an investment thesis, then
monitoring of it (news, threads, alerts, quarterly briefs). Draft specs (Polish, for the owner) wait in `docs/draft/spec/`; each moves to `docs/visual/spec/` when its feature is built with tests.

Built from the template: an ASP.NET Core minimal-API server (Dapper, hand-written SQL, grate migrations) on [suwbackkit](https://github.com/Manomenu/suwbackkit), a React 19 + Tailwind web app styled by
[suwfrontkit](https://github.com/Manomenu/suwfrontkit) with types generated from the server's OpenAPI document, and a Notes feature
as the pattern end to end.

## What the gate guarantees

The gate is [suwgate](https://github.com/Manomenu/suwgate), configured in `suwgate.yml`: `just check` (`suwgate check`) before
calling a change done, the same CI runs; `just check-quick` while working, within a 20-second budget: the repository guards, and
build, csharpier, the .NET guards, eslint, tsc and shellcheck only for what changed since the branch left `master`. It fails on: any compiler or
analyzer warning, banned APIs, a layer used against its order, a folder or project off the lists the guards read, dead types and
packages, vague names, any comment but a tool directive, `dynamic`, browser storage, unpinned images, a stale API contract or
generated types, an acceptance criterion without a guardrail, an unresolvable compose file. The full list, each with its fix:
[docs/architecture.md, "What the gate forbids"](docs/architecture.md#what-the-gate-forbids).
Browser tests run separately (`just e2e`), and `just tmux-dev start` is the one way to run the stack.

## The API contract

`contract/openapi.json` is generated from the endpoints and committed: the contract on the boundary, with its version
in `contract/package.json`. `just api-types` regenerates it with the web types (`openapi.d.ts`, whose first line names
the contract's sha256), and the full gate (its `api-version` step, oasdiff) compares it with `master`: a changed contract needs a
higher version, a change that breaks a consumer a higher major. An app in another repository that adapts to a new version of this
contract tags its tests with `contract <name>@<version>` instead of a criterion id; the `contract-pins` step lists them.

## Spec ↔ guardrails sync

Development is spec-driven, and the gate keeps the code and the specs from drifting apart. A spec in
`docs/visual/spec/` (written with the suwagent `/suwagent:visual-spec` skill) says what to build and
why; its acceptance criteria are the contract:

1. **Every criterion has an id**, `AC-<feature>-<n>`, at the start of its item in the spec's
   acceptance section. `vdoc.py ids` of the suwagent plugin assigns them and never reuses a number;
   an id stays with its criterion for good.
2. **Outside the spec, a criterion lives only as a guardrail** that names its id: a test, a lint rule,
   a build rule. Not as a checklist or a QA note. A criterion that no automated check can prove is
   reworded into plain description or dropped from the spec (the agent asks the owner which).
3. **A spec written ahead of its feature is a draft** in `docs/draft/spec/`: the gate reads only `docs/visual/spec/`,
   where every criterion without a guardrail fails it. The draft moves there when its feature is built, together
   with its tests.
4. **The full gate checks the link both ways** (`suwgate check`, not `--quick`, so an agent can stop and ask
   about a criterion mid-work):

| The gate fails when | What to do |
| --- | --- |
| a criterion has no guardrail | name its id in a test or rule that fails when the criterion breaks |
| a guardrail names an id no spec defines | restore the criterion, or delete or rename the id |
| an id stands where nothing is checked (production code, a config no tool reads) | move it to the guardrail that proves the criterion |
| a spec has no acceptance section, a criterion without an id or with two, an id defined twice | fix the spec (`vdoc.py ids` numbers new criteria) |

Where each kind of guardrail lives and how it names the id comes with the profiles of `suwgate.yml` (the table is in
suwgate's README): `[Trait("criterion", "AC-notes-1")]` on an xUnit test, the id at the start of a Vitest or Playwright title
(`it("AC-notes-1: a blank note is refused", …)`), `// AC-notes-1` above a rule of `eslint.config.js` or an option of a tsconfig,
`# AC-notes-1` above a rule of `.editorconfig`, the id in the message of a banned-API line of the app's own, `<!-- AC-notes-1 -->` above a
property of `Directory.Build.props`. A kind of its own goes into a criteria.json at the root, with its row in a table here.

**How it runs.** The `criteria` step runs `vdoc.py criteria` of the
[suwagent plugin](https://github.com/Manomenu/suwalski-agent-plugin), downloaded at the commit and SHA-256 suwgate pins (into
`~/.cache/suwagent/`), the same on a laptop and in CI; without a network the step is a SKIP locally and a failure in CI. Agents
cannot edit the gate, the hooks or the lint configs (a Claude Code hook refuses it); to change them with an agent, start it with
`ALLOW_GATE_EDIT=1 claude`.

What it cannot see: whether a guardrail would really fail when the behaviour breaks.
`/suwagent:visual-guardrails` checks that before a merge.

## Requirements and commands

See [docs/development.md](docs/development.md). Rules for contributors and agents: [AGENTS.md](AGENTS.md).
