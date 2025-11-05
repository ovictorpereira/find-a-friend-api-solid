import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository.ts";
import { GetOrganizationProfileUseCase } from "../get-organization-profile.ts";

export function makeGetOrganizationProfileUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const getOrganizationProfileUseCase = new GetOrganizationProfileUseCase(
    organizationsRepository
  );
  return getOrganizationProfileUseCase;
}
