import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Species } from "@prisma/client";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";
import { makeFindPetsByCityUseCase } from "../../../use-cases/factories/make-find-pets-by-city-use-case";

export async function findPetByCityRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetBodySchema = z.object({
    city: z.string().min(2).max(100),
    species: z.enum(Species).optional(),
    gender: z.string().optional(),
    color: z.string().optional(),
    about: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.coerce.number().optional(),
    independenceLevel: z.coerce.number().optional(),
    environmentSize: z.string().optional(),
  });

  const body = createPetBodySchema.parse(request.body);

  try {
    const findPetsByCityUseCase = makeFindPetsByCityUseCase();

    await findPetsByCityUseCase.execute(body);
    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
