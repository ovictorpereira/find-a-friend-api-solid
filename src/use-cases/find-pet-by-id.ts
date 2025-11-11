import type { PetsRepository } from "../repositories/pets-repository.ts";
import type { Pet } from "@prisma/client";

interface FindPetByIdUseCaseRequest {
  id: string;
}

interface FindPetByIdUseCaseResponse {
  pet: Pet | null;
}

export class FindPetByIdUseCase {
  private petsRepository: PetsRepository;
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository;
  }

  async execute({
    id,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    return { pet };
  }
}
