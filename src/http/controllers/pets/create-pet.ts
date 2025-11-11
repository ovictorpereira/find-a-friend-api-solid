import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { Species } from "@prisma/client";

declare module "fastify" {
  export interface FastifyRequest {
    user: {
      sub: string;
    };
  }
}

import { makeCreatePetUseCase } from "../../../use-cases/factories/make-create-pet-use-case.ts";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error.ts";

export async function createPetRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createPetBodySchema = z.object({
    species: z.enum(Species),
    name: z.string().min(2).max(100),
    gender: z.string().min(2).max(100),
    color: z.string().min(2).max(100),
    about: z.string().min(2).max(1000),
    age: z.string().min(1).max(50),
    size: z.string().min(1).max(50),
    energyLevel: z.number().min(1).max(5),
    independenceLevel: z.number().min(1).max(5),
    environmentSize: z.string().min(2).max(100),
    adoptionRequirements: z.array(z.string().min(2).max(100)).default([]),
    photos: z.array(z.string().min(2).max(100)).default([]),
  });

  const body = createPetBodySchema.parse(request.body);

  try {
    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
      ...body,
      orgId: request.user.sub, // Pega o ID da organização do JWT
    });
    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
