import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository.ts";
import { FindPetsByCityUseCase } from "../find-pets-by-city.ts";

export function makeFindPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const findPetsByCityUseCase = new FindPetsByCityUseCase(petsRepository);
  return findPetsByCityUseCase;
}
