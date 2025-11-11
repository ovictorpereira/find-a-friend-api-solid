import type { PetsRepository } from "../repositories/pets-repository.ts";
import type { Pet, Species } from "@prisma/client";

interface FindPetsByCityUseCaseRequest {
  city: string;
  species?: Species;
  gender?: string;
  color?: string;
  about?: string;
  age?: string;
  size?: string;
  energyLevel?: number;
  independenceLevel?: number;
  environmentSize?: string;
}

interface FindPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FindPetsByCityUseCase {
  private petsRepository: PetsRepository;
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute(
    payload: FindPetsByCityUseCaseRequest
  ): Promise<FindPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(payload);

    return { pets };
  }
}
