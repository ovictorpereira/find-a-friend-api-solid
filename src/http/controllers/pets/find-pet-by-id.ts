import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFindPetByIdUseCase } from "../../../use-cases/factories/make-find-pet-by-id-use-case.ts";

export async function findPetByIdRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetQuerySchema = z.object({
    id: z.uuid(),
  });

  const { id } = createPetQuerySchema.parse(request.params);

  const findPetByIdUseCase = makeFindPetByIdUseCase();

  const pet = await findPetByIdUseCase.execute({ id });
  return reply.status(200).send(pet);
}
