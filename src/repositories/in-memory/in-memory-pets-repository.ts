import { Prisma, type Pet } from "@prisma/client";
import type { PetsRepository, PetFilters } from "../pets-repository.ts";
import { randomUUID } from "node:crypto";
import { InMemoryOrganizationsRepository } from "./in-memory-organizations-repository.ts";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(
    private organizationsRepository: InMemoryOrganizationsRepository
  ) {
    this.organizationsRepository = organizationsRepository;
  }

  async findById(petId: string) {
    const pet = this.items.find((pet) => pet.id === petId);
    if (!pet) {
      return null;
    }
    return pet;
  }

  async findByCity(filters: PetFilters) {
    const { city, ...petFilters } = filters;

    const organizationsInCity = this.organizationsRepository.items.filter(
      (org) => org.city === city
    );

    const orgIds = organizationsInCity.map((org) => org.id);
    let pets = this.items.filter((pet) => orgIds.includes(pet.orgId));

    return pets.filter((pet) => {
      return Object.entries(petFilters).every(([key, value]) => {
        // Se o filtro não está definido, passa
        if (value === undefined || value === null) return true;

        // Compara o valor do pet com o filtro
        return pet[key as keyof Pet] === value;
      });
    });
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      species: data.species,
      gender: data.gender,
      color: data.color,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      environmentSize: data.environmentSize,
      adoptionRequirements: Array.isArray(data.adoptionRequirements)
        ? data.adoptionRequirements
        : [],
      photos: Array.isArray(data.photos) ? data.photos : [],
      createdAt: new Date(),
      orgId: data.orgId,
    };

    this.items.push(pet);
    return pet;
  }
}
