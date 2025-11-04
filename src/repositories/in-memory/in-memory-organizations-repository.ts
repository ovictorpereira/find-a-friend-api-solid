import { Prisma, type Organization } from "@prisma/client";
import type { OrganizationsRepository } from "../organizations-repository.ts";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = [];

  async findById(orgId: string) {
    const org = this.items.find((org) => org.id === orgId);
    if (!org) {
      return null;
    }
    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);
    if (!org) {
      return null;
    }
    return org;
  }

  async findByCity(city: string) {
    const org = this.items.filter((org) => org.city === city);
    return org;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      city: data.city,
      state: data.state,
      address: data.address,
      number: data.number,
      complement: data.complement || null,
      phone: data.phone,
      password_hash: data.password_hash,
      createdAt: new Date(),
    };
    this.items.push(org);
    return org;
  }
}
