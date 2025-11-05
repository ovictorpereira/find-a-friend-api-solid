import { expect, describe, it, beforeEach } from "vitest";
import { FindPetsByCityUseCase } from "./find-pets-by-city.ts";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { hash } from "bcryptjs";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FindPetsByCityUseCase;

describe("Find Pets by City Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);

    sut = new FindPetsByCityUseCase(petsRepository);
  });

  it("should be able to find pets by city", async () => {
    const orgRio = await organizationsRepository.create({
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

    await petsRepository.create({
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
      orgId: orgRio.id,
    });

    const { pets } = await sut.execute({ city: "Rio de Janeiro" });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toEqual("Rex");
  });

  it("should be able to find pets by city with filters", async () => {
    const orgRio = await organizationsRepository.create({
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

    await petsRepository.create({
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
      orgId: orgRio.id,
    });

    await petsRepository.create({
      species: "Cat",
      name: "Mycat",
      gender: "Female",
      color: "Brown",
      about: "A friendly cat",
      age: "Adult",
      size: "Medium",
      energyLevel: 6,
      independenceLevel: 6,
      environmentSize: "Large",
      adoptionRequirements: ["Fenced yard", "Regular vet visits"],
      photos: ["photo1.jpg", "photo2.jpg"],
      orgId: orgRio.id,
    });

    const { pets } = await sut.execute({
      city: "Rio de Janeiro",
      species: "Cat",
    });

    expect(pets).toHaveLength(1);
    expect(pets[0].name).toEqual("Mycat");
  });
});
