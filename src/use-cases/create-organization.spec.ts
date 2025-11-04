import { expect, describe, it, beforeEach } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization.ts";
import { compare } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreateOrganizationUseCase;

describe("Create Organization Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateOrganizationUseCase(organizationsRepository);
  });

  it("should be able to create a new organization", async () => {
    const { organization } = await sut.execute({
      name: "Sample Organization",
      email: "sample@example.com",
      password: "123456",
      zipcode: "20530500",
      city: "Rio de Janeiro",
      state: "RJ",
      address: "Rua das Flores",
      number: "123",
      complement: "Apt 45",
      phone: "21999999999",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should hash organization password on register", async () => {
    const { organization } = await sut.execute({
      name: "Sample Organization",
      email: "sample@example.com",
      password: "123456",
      zipcode: "20530500",
      city: "Rio de Janeiro",
      state: "RJ",
      address: "Rua das Flores",
      number: "123",
      complement: "Apt 45",
      phone: "21999999999",
    });

    const isPasswordHashed = await compare(
      "123456",
      organization.password_hash
    );
    expect(isPasswordHashed).toBe(true);
  });

  it("should not allow duplicate email registration", async () => {
    const email = "sample@example.com";

    await sut.execute({
      name: "Sample Organization",
      email,
      password: "123456",
      zipcode: "20530500",
      city: "Rio de Janeiro",
      state: "RJ",
      address: "Rua das Flores",
      number: "123",
      complement: "Apt 45",
      phone: "21999999999",
    });

    await expect(() =>
      sut.execute({
        name: "Sample Organization",
        email,
        password: "123456",
        zipcode: "20530500",
        city: "Rio de Janeiro",
        state: "RJ",
        address: "Rua das Flores",
        number: "123",
        complement: "Apt 45",
        phone: "21999999999",
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });
});
