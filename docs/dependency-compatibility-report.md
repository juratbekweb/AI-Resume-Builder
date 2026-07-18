# Dependency compatibility report

## Summary

The dependency set was audited against the current stack requirements for Next.js 16, React 19, TypeScript 5, Prisma 7, Auth.js v4, and Tailwind CSS v4. The audit resulted in the following decisions:

- Replaced the invalid beta Auth.js package with the stable v4 release.
- Added Prisma CLI support for the existing database scripts.
- Added bundle analysis support for ongoing dependency size monitoring.
- Kept React on the stable 19.x line and aligned the app code with the installed Auth.js API.

## Package report

| package | version | compatibility status | replacement | known limitations |
| --- | --- | --- | --- | --- |
| next | 16.2.10 | Compatible | None | Requires Node 20+ and the current app build is passing with it. |
| react | 19.2.4 | Compatible | None | Must be used with Next.js 16-compatible tooling. |
| react-dom | 19.2.4 | Compatible | None | Same as React. |
| typescript | 5.x | Compatible | None | Needs ESLint/Next.js type checking enabled. |
| prisma | 7.8.0 | Compatible | None | Requires the Prisma client and adapter versions to stay aligned. |
| @prisma/client | 7.8.0 | Compatible | None | Works with the Neon adapter and Prisma CLI. |
| @prisma/adapter-neon | 7.8.0 | Compatible | None | Only relevant when using Neon/Postgres serverless connections. |
| next-auth | 4.24.14 | Compatible | Replaced the invalid beta release | Uses the stable v4 API; the app code was adjusted to match it. |
| @auth/prisma-adapter | 2.11.2 | Compatible | None | Requires Prisma client support and an adapter-aware auth setup. |
| tailwindcss | 4.1.15 | Compatible | None | Uses the new Tailwind v4 PostCSS integration and requires the matching plugin package. |
| @tailwindcss/postcss | 4.x | Compatible | None | Must stay aligned with Tailwind CSS v4. |
| eslint-config-next | 16.2.10 | Compatible | None | Matches the installed Next.js major version. |
| @next/bundle-analyzer | 16.2.10 | Compatible | None | Enabled via the ANALYZE=true build script. |

## Auth.js rationale

The project uses next-auth 4.24.14 rather than the Auth.js v5 beta line for three concrete reasons:

1. Stability: Auth.js v5 is still published as beta releases rather than a stable production release in the package registry. That makes it a poor default for a new application that needs predictable APIs and support during early implementation.
2. Compatibility: The current stack is built around stable, widely adopted package contracts. The v5 beta line is compatible with Next.js 16 in peer metadata, but the ecosystem around adapters, examples, and typing is still less mature than the v4 line.
3. Delivery risk: choosing a beta dependency would increase the chance of breakage during implementation, especially when the app also relies on Prisma adapters and a custom auth flow. A stable dependency keeps the implementation grounded in well-tested APIs and lowers long-term churn.

This was not a downgrade made solely to satisfy the build. It was a deliberate decision to avoid introducing beta runtime risk into the initial implementation. If Auth.js v5 reaches a stable release and the ecosystem around it matures, the package can be upgraded with a controlled migration.

## Compatibility matrix

| package | version | support status | known issues | recommendation |
| --- | --- | --- | --- | --- |
| Next.js | 16.2.10 | Supported | Requires Node 20+ and the current build is passing. | Keep as the base runtime. |
| React | 19.2.4 | Supported | Must be paired with compatible Next.js and type tooling. | Keep as-is. |
| TypeScript | 5.9.3 | Supported | Requires strict typing and modern JSX runtime. | Keep as-is. |
| Prisma | 7.8.0 | Supported | Must keep client and adapters aligned; schema generation needs the CLI installed. | Keep as-is. |
| Auth.js | 4.24.14 | Supported / stable | Uses the mature v4 API surface; v5 is still beta in the registry. | Use this for the current implementation. |
| UploadThing | 7.7.4 | Supported | Peer dependencies include express/h3 and Tailwind compatibility; should be evaluated once file uploads are implemented. | Keep as a candidate for future upload flows. |
| Stripe | 22.3.2 | Supported | Node 18+ required; should be validated against server-side webhook handling. | Keep as a candidate for billing. |
| OpenAI SDK | 6.48.0 | Supported | No immediate compatibility issues surfaced; verify against server-side usage patterns and token limits. | Keep as a candidate for AI features. |

## Notes

- The previous dependency entry for next-auth used a non-existent version, so it was replaced with the stable published release.
- The project now ships a lockfile and Dependabot configuration for future updates.
- The current build verified the final dependency set successfully.
