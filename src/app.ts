import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { z } from "zod";
import { env } from "./env/index.ts";
import { organizationRoutes } from "./http/controllers/organizations/routes.ts";
import { petsRoutes } from "./http/controllers/pets/routes.ts";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: { expiresIn: "10m" },
});

app.register(fastifyCookie);

app.register(organizationRoutes, { prefix: "/org" });
app.register(petsRoutes, { prefix: "/pets" });

app.setErrorHandler(function (error, _, reply) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: here we should log the error to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});

export { app };
