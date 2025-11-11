import { expect, describe, it, beforeEach } from "vitest";
import { FindPetByIdUseCase } from "./find-pet-by-id.ts";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository.ts";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository.ts";
import { hash } from "bcryptjs";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: FindPetByIdUseCase;

describe("Find Pet by ID Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);

    sut = new FindPetByIdUseCase(petsRepository);
  });

  it("should be able to find a pet by id", async () => {
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

    const newPet = await petsRepository.create({
      species: "DOG",
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

    const { pet } = await sut.execute({ id: newPet.id });

    expect(pet?.name).toEqual("Rex");
  });
});
