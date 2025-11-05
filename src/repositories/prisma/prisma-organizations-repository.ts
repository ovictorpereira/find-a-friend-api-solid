import { prisma } from "../../lib/prisma.ts";
import { Prisma } from "@prisma/client";
import type { OrganizationsRepository } from "../organizations-repository.ts";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(orgId: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });
    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });
    return organization;
  }

  async findByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
    });
    return organizations;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });
    return organization;
  }
}
