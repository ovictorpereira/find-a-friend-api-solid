import { Prisma, type Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.ts";
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

  async findByCity(city: string) {
    const organizationsInCity = this.organizationsRepository.items.filter(
      (org) => org.city === city
    );

    const orgIds = organizationsInCity.map((org) => org.id);
    const pets = this.items.filter((pet) => orgIds.includes(pet.orgId));

    return pets;
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
