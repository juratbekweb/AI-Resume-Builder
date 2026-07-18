# 2. Authentication Abstraction Layer

Date: 2026-07-19

## Status

Accepted

## Context

The application needs authentication for user sessions and protected routes, but the implementation should not become tightly coupled to a specific provider framework. The project already depends on NextAuth for the initial implementation, but the architecture requires the ability to upgrade to Auth.js v5 or replace the provider later without rewriting the application layer.

## Decision

We will introduce an authentication abstraction layer centered on an AuthService interface. Application code will depend on AuthService rather than directly importing next-auth APIs. The concrete implementation will be provided by a NextAuth-backed adapter in the infrastructure layer.

The abstraction will define the core operations required by the application:

- retrieving the current session
- signing in
- signing out
- checking authentication state

The infrastructure implementation will encapsulate all provider-specific logic. This keeps authentication concerns behind an interface and makes future provider migrations localized to the infrastructure boundary.

## Consequences

- Pros: The application becomes provider-agnostic, making future upgrades to Auth.js v5 or other providers less disruptive. Business logic and route-level code remain decoupled from framework-specific APIs.
- Cons: The initial implementation introduces an additional abstraction and interface layer. This requires discipline to keep application code routed through the service rather than bypassing it.
