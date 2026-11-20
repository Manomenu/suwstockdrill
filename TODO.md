# TODO


## When the first spec's criteria need a strength check

The `criteria` step of `suwgate check` sees that a guardrail names a criterion, not that it would fail. The report that
measures it: run `just mutate` (Stryker.NET), read its JSON report (each mutant's `coveredBy` and
`killedBy` test ids), and count per `AC-<feature>-<n>` the mutants under the tests whose `Trait`
names it and how many survived. Stryker's `test-case-filter` does not work with the xUnit v3 runner
on Microsoft Testing Platform, so it reads a full run instead of running one criterion's tests.
First check that the `mtp` runner fills `coveredBy` per test.

## When the first fake of an outside service appears

The first fake in tests (WireMock for an external API, a mail catcher, e2e seed data) brings a
test environment of its own: a folder with its compose file, and a `just` module; `dev.compose` in `suwgate.yml`
points `suwgate dev db` there. Until then the gate needs only the one PostgreSQL container of `compose.yaml`.
