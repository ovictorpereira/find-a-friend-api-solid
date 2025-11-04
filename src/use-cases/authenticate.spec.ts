import { describe, beforeEach, it, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate.ts";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";
import { hash } from "bcryptjs";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it("should be able to authenticate", async () => {
    await organizationsRepository.create({
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
      email: "sample@example.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await organizationsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: "wrong@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await organizationsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: "wrong@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
