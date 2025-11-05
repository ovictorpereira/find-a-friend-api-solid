import type { PetsRepository } from "../repositories/pets-repository.ts";
import type { Pet } from "@prisma/client";

interface FindPetsByCityUseCaseRequest {
  city: string;
  species?: string;
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
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    payload: FindPetsByCityUseCaseRequest
  ): Promise<FindPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(payload);

    return { pets };
  }
}
