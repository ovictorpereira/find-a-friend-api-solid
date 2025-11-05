import { AuthenticateUseCase } from "../authenticate.ts";
import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository.ts";

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository);
  return authenticateUseCase;
}
