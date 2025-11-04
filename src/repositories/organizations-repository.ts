import { Prisma, type Organization } from "@prisma/client";

export interface OrganizationsRepository {
  findById(orgId: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
  findByCity(city: string): Promise<Organization[]>;
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
