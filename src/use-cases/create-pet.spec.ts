import { expect, describe, it, beforeEach } from "vitest";
import { CreatePetUseCase } from "./create-pet.ts";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { hash } from "bcryptjs";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreatePetUseCase(petsRepository, organizationsRepository);
  });

  it("should be able to create a new pet", async () => {
    const organization = await organizationsRepository.create({
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

    const { pet } = await sut.execute({
      species: "Dog",
      name: "Rex",
      gender: "Male",
      color: "Brown",
      about: "A friendly dog",
      age: "Adult",
      size: "Medium",
      energyLevel: 6,
      independenceLevel: 6,
      environmentSize: "Large",
      adoptionRequirements: ["Fenced yard", "Regular vet visits"],
      photos: ["photo1.jpg", "photo2.jpg"],
      orgId: organization.id,
      city: organization.city,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("Rex");
    expect(pet.city).toEqual("Rio de Janeiro");
  });
});
