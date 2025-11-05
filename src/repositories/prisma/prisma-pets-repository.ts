import { prisma } from "../../lib/prisma.ts";
import { Pet, Prisma } from "@prisma/client";
import type { PetFilters, PetsRepository } from "../pets-repository.ts";

export class PrismaPetsRepository implements PetsRepository {
  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });
    return pet;
  }

  async findByCity(filters: PetFilters): Promise<Pet[]> {
    const { city, ...petFilters } = filters;

    const pets = await prisma.pet.findMany({
      where: {
        ...petFilters,
        Organization: {
          city: "São Paulo",
        },
      },
      include: {
        Organization: true,
      },
    });
    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }
}
