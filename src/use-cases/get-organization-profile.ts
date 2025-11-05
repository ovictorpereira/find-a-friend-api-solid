import { type OrganizationsRepository } from "../repositories/organizations-repository.ts";
import type { Organization } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.ts";

interface GetOrganizationProfileUseCaseRequest {
  orgId: string;
}

interface GetOrganizationProfileUseCaseResponse {
  organization: Organization;
}

export class GetOrganizationProfileUseCase {
  private organizationsRepository: OrganizationsRepository;
  constructor(organizationsRepository: OrganizationsRepository) {
    this.organizationsRepository = organizationsRepository;
  }

  async execute({
    orgId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(orgId);

    if (!organization) {
      throw new ResourceNotFoundError();
    }

    return {
      organization,
    };
  }
}
