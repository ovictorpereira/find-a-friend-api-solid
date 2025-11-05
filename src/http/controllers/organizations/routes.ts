import type { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";

import { createOrganizationRoute } from "./create-organization.ts";
import { authenticateRoute } from "./authenticate.ts";
import { profile } from "./profile.ts";
// import { refresh } from "./refresh.ts";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/", createOrganizationRoute);
  app.post("/auth", authenticateRoute);
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
