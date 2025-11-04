import { Prisma, type Pet } from "@prisma/client";
import type { PetsRepository } from "../pets-repository.ts";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(petId: string) {
    const pet = this.items.find((pet) => pet.id === petId);
    if (!pet) {
      return null;
    }
    return pet;
  }

  async findByCity(city: string) {
    const pets = this.items.filter((pet) => pet.city === city);
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
      city: data.city,
    };

    this.items.push(pet);
    return pet;
  }
}
