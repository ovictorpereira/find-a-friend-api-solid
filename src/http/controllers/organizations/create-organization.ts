import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateOrganizationUseCase } from "../../../use-cases/factories/make-create-organization-use-case.ts";
import { OrganizationAlreadyExistsError } from "../../../use-cases/errors/organization-already-exists-error.ts";

export async function createOrganizationRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrganizationBodySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    zipcode: z.string().min(5).max(8),
    city: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    address: z.string().min(2).max(100),
    number: z.string().min(1).max(10),
    complement: z.string().max(100).optional(),
    phone: z.string().min(10).max(15),
    password: z.string().min(6).max(100),
  });

  const body = createOrganizationBodySchema.parse(request.body);

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase();

    await createOrganizationUseCase.execute(body);
    return reply.status(201).send();
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
