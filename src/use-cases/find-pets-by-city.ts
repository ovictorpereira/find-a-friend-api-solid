import { type PetsRepository } from "../repositories/pets-repository.ts";
import type { Pet } from "@prisma/client";

interface FindPetsByCityUseCaseRequest {
  city: string;
}

interface FindPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FindPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FindPetsByCityUseCaseRequest): Promise<FindPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city);

    return { pets };
  }
}
