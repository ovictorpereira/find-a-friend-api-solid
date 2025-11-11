import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository.ts";

import { CreatePetUseCase } from "../create-pet.ts";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const organizationsRepository = new PrismaOrganizationsRepository();
  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository
  );
  return createPetUseCase;
}
