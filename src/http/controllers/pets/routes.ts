import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { createPetRoute } from "./create-pet.ts";
import { findPetByCityRoute } from "./find-pets-by-city.ts";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/", createPetRoute);
  app.get("/", findPetByCityRoute);
}
