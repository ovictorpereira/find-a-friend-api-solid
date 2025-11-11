import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { createPetRoute } from "./create-pet.ts";
import { findPetsByCityRoute } from "./find-pets-by-city.ts";
import { findPetByIdRoute } from "./find-pet-by-id.ts";

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.post("/", createPetRoute);
  app.get("/", findPetsByCityRoute);
  app.get("/unique/:id", findPetByIdRoute);
}
