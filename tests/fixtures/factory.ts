export interface UserFactoryInput {
  id?: string;
  email?: string;
  name?: string;
}

export function createUser(overrides: UserFactoryInput = {}) {
  return {
    id: overrides.id ?? "user_1",
    email: overrides.email ?? "user@example.com",
    name: overrides.name ?? "Test User",
  };
}

export function createSession(overrides: Record<string, unknown> = {}) {
  return {
    user: createUser(),
    expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    ...overrides,
  };
}
