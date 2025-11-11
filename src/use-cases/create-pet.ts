import { type PetsRepository } from "../repositories/pets-repository.ts";
import { type OrganizationsRepository } from "../repositories/organizations-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";
import type { Pet, Species } from "@prisma/client";

interface CreatePetUseCaseRequest {
  species: Species;
  name: string;
  gender: string;
  color: string;
  about: string;
  age: string;
  size: string;
  energyLevel: number;
  independenceLevel: number;
  environmentSize: string;
  adoptionRequirements: string[];
  photos: string[];
  orgId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  private petsRepository: PetsRepository;
  private organizationsRepository: OrganizationsRepository;
  constructor(
    petsRepository: PetsRepository,
    organizationsRepository: OrganizationsRepository
  ) {
    this.petsRepository = petsRepository;
    this.organizationsRepository = organizationsRepository;
  }

  async execute(
    payload: CreatePetUseCaseRequest
  ): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      payload.orgId
    );

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create(payload);

    return { pet };
  }
}
