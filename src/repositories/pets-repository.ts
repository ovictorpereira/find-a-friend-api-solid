import { Prisma, type Pet } from "@prisma/client";

export interface PetFilters {
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

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>;
  findByCity(filters: PetFilters): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
