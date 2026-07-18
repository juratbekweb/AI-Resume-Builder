# Testing strategy

## Goals

Testing is treated as part of the architecture from day one. The strategy is designed to protect the domain model, the application layer, the infrastructure boundary, and critical user flows without coupling tests to implementation details.

## Test pyramid

1. Unit tests
   - Focus on domain services and pure business logic.
   - Target 80% coverage for the domain and application layers.
   - Mock external integrations at the boundary, but never mock business logic.

2. Integration tests
   - Cover repositories, API routes, and infrastructure adapters.
   - Use isolated test databases where applicable.
   - Validate realistic request/response behavior.

3. End-to-end tests
   - Cover critical user flows such as authentication, protected navigation, and core creation flows.
   - Use deterministic fixtures and minimal external dependencies.

## Principles

- Business logic is tested as real behavior, not through mock-only assertions.
- External services such as OpenAI, Stripe, and Resend are mocked at the infrastructure boundary.
- Reusable fixtures and factories are used for consistent test data.
- Tests should be run in CI and locally before merge.

## Test infrastructure

- Test runner: Vitest
- DOM testing: Testing Library
- API testing: Supertest
- Coverage: V8 coverage provider
- Environment: jsdom for component and route-level tests

## Fixtures and factories

Reusable helpers live under tests/fixtures and should be used for:

- user creation
- auth session creation
- mocked OpenAI, Stripe, and Resend clients

## Coverage targets

- Domain and application layers: at least 80% line/branch/function coverage
- Critical business logic: 100% coverage

## Execution commands

- npm test
- npm run test:watch
- npm run test:coverage
