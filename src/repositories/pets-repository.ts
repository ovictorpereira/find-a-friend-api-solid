import { Prisma, type Pet } from "@prisma/client";
import { Species } from "@prisma/client";

export interface PetFilters {
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

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>;
  findByCity(filters: PetFilters): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
