import type { FastifyInstance } from "fastify";

// import { verifyJWT } from "../../middlewares/verify-jwt.ts";

// import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";
// import { profile } from "./profile.ts";
// import { refresh } from "./refresh.ts";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organizations", authenticate);
  app.post("/sessions", authenticate);
  //   app.get("/me", { onRequest: [verifyJWT] }, profile);
}
