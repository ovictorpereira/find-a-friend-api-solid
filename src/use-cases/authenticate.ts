import { type OrganizationsRepository } from "../repositories/organizations-repository.ts";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";
import type { Organization } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {
    this.organizationsRepository = organizationsRepository;
  }

  async execute(
    request: AuthenticateUseCaseRequest
  ): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = request;

    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, organization.password_hash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      organization,
    };
  }
}
