import { type OrganizationsRepository } from "../repositories/organizations-repository.ts";
import { hash } from "bcryptjs";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error.ts";
import type { Organization } from "@prisma/client";

interface OrganizationUseCaseRequest {
  name: string;
  email: string;
  zipcode: string;
  city: string;
  state: string;
  address: string;
  number: string;
  complement?: string;
  phone: string;
  password: string;
}

interface OrganizationUseCaseResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {
    this.organizationsRepository = organizationsRepository;
  }

  async execute({
    name,
    email,
    zipcode,
    city,
    state,
    address,
    number,
    complement,
    phone,
    password,
  }: OrganizationUseCaseRequest): Promise<OrganizationUseCaseResponse> {
    const orgAlreadyExists = await this.organizationsRepository.findByEmail(
      email
    );

    if (orgAlreadyExists) {
      throw new OrganizationAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      name,
      email,
      zipcode,
      city,
      state,
      address,
      number,
      complement,
      phone,
      password_hash,
    });

    return { organization };
  }
}
