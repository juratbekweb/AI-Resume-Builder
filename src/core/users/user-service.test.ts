import { describe, it, expect, vi } from "vitest";
import { UserService } from "./user-service";
import { ValidationError } from "../shared/errors";

describe("UserService", () => {
  it("normalizes the email and creates a user through the repository", async () => {
    const repository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        id: "user_1",
        email: "user@example.com",
        name: "User",
      }),
    };

    const service = new UserService(repository as never);
    const user = (await service.createUser({ email: "User@Example.com", name: "User" })) as {
      email: string;
    };

    expect(repository.findByEmail).toHaveBeenCalledWith("user@example.com");
    expect(repository.create).toHaveBeenCalledWith({
      email: "user@example.com",
      name: "User",
    });
    expect(user.email).toBe("user@example.com");
  });

  it("rejects invalid email addresses", async () => {
    const service = new UserService({
      findByEmail: vi.fn(),
      create: vi.fn(),
    } as never);

    await expect(service.createUser({ email: "not-an-email" })).rejects.toThrow(ValidationError);
  });
});
