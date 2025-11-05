import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { hash } from "bcryptjs";
import { GetOrganizationProfileUseCase } from "./get-organization-profile.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationProfileUseCase;

describe("Get Organization Profile Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationProfileUseCase(organizationsRepository);
  });

  it("should be able to get an organization profile", async () => {
    const newOrganization = await organizationsRepository.create({
      name: "Sample Organization",
      email: "sample@example.com",
      password_hash: await hash("123456", 6),
      zipcode: "20530500",
      city: "Rio de Janeiro",
      state: "RJ",
      address: "Rua das Flores",
      number: "123",
      complement: "Apt 45",
      phone: "21999999999",
    });

    const { organization } = await sut.execute({
      orgId: newOrganization.id,
    });

    expect(organization.name).toEqual("Sample Organization");
  });
});
