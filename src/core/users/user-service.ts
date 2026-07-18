import { ValidationError } from "../shared/errors";

export interface UserRepository {
  findByEmail(email: string): Promise<unknown | null>;
  create(input: { email: string; name?: string | null }): Promise<unknown>;
}

export interface CreateUserInput {
  email: string;
  name?: string | null;
}

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async createUser(input: CreateUserInput) {
    const normalizedEmail = this.normalizeEmail(input.email);

    if (!this.isValidEmail(normalizedEmail)) {
      throw new ValidationError("Invalid email address");
    }

    const existing = await this.repository.findByEmail(normalizedEmail);
    if (existing) {
      throw new ValidationError("User already exists");
    }

    return this.repository.create({
      email: normalizedEmail,
      name: input.name?.trim() || null,
    });
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
