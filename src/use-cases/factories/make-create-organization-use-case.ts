import { CreateOrganizationUseCase } from "../create-organization.ts";
import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository.ts";

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationsRepository
  );
  return createOrganizationUseCase;
}
