import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { FindPetByIdUseCase } from "../find-pet-by-id.ts";

export function makeFindPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const findPetByIdUseCase = new FindPetByIdUseCase(petsRepository);
  return findPetByIdUseCase;
}
