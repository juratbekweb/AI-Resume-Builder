# Mandatory testing policy

## Purpose

Testing is a first-class architectural requirement. Every new feature must include tests at the appropriate level before it is considered complete.

## Required test categories

### 1. Domain layer
- Every business rule must be covered by unit tests.
- Value objects and domain services must have direct unit tests.
- Tests must validate invariants, edge cases, and failure conditions.

### 2. Application layer
- Every use case, command handler, and query handler must be tested.
- Tests must verify orchestration, validation, and error propagation.

### 3. Infrastructure
- Prisma repositories must be tested with isolated database fixtures.
- Auth implementations must be tested at the abstraction boundary.
- External integrations such as Redis, OpenAI, and Stripe must be mocked at the infrastructure boundary.

### 4. API
- Success responses must be tested.
- Validation failures must be tested.
- Authorization failures must be tested.
- Rate limiting must be tested.
- Error handling must be tested.

### 5. UI
- Critical reusable components must be tested.
- Forms must be tested for validation and interaction.
- Accessibility checks must be included for interactive UI.
- User interactions must be test-covered.

### 6. End-to-end
- Register
- Login
- Create Resume
- Edit Resume
- Export PDF
- Upgrade Plan

## Quality standards

- No flaky tests.
- Deterministic fixtures only.
- Fast execution.
- Parallel execution where possible.
- Coverage reports must be generated after every CI run.

## Coverage expectations

- Domain and application layers: at least 80% coverage.
- Critical business logic: 100% coverage.

## Enforcement

- CI must run the test suite and generate coverage artifacts.
- New features must not merge without the relevant tests.
- Coverage should increase as features are implemented rather than being deferred.
