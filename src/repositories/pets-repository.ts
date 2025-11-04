import { Prisma, type Pet } from "@prisma/client";

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>;
  findByCity(city: string): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
