import { vi } from "vitest";

export const mockOpenAIClient = {
  responses: {
    create: vi.fn(),
  },
};

export const mockStripeClient = {
  checkout: {
    sessions: {
      create: vi.fn(),
    },
  },
};

export const mockResendClient = {
  emails: {
    send: vi.fn(),
  },
};
