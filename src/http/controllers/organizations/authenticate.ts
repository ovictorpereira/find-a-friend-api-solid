import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.ts";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case.ts";

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});

export async function authenticateRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = authSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }
    throw err;
  }
}
