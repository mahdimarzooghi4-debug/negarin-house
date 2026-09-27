# Stage Deployment Contract

Status: **Sprint 0 baseline**

Stage is the first production-like environment. It is not Production and it does not imply Release Approval.

## Artifact contract

Deploy immutable artifacts produced from one Git commit:

- `negarin-web:<git-sha>`
- `negarin-api:<git-sha>`
- `negarin-worker:<git-sha>`

All three artifacts for a release candidate use the same Git SHA.

## Required Stage dependencies

- PostgreSQL
- Redis
- S3-compatible private object storage
- application secret/config store
- HTTPS ingress for web/API

Provider choice is intentionally not hardcoded in Sprint 0.

## Deployment order

1. select an artifact SHA that passed CI
2. validate Stage configuration
3. run `prisma migrate deploy` as a controlled migration step
4. deploy API/worker/web artifacts
5. verify API health/readiness
6. run smoke/E2E checks
7. record QA evidence

## Rollback

Application rollback uses the previous immutable artifact SHA.

Database migrations must be forward-safe. Destructive migrations require an explicit migration/rollback plan before merge.

## Production boundary

Merging to `main` may deploy to Stage later, but must never automatically promote to Production.

Production requires:

Stage → QA/Testing → Release Approval → Production.
