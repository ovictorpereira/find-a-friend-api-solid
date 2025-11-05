import type { FastifyRequest, FastifyReply } from "fastify";
import { makeGetOrganizationProfileUseCase } from "../../../use-cases/factories/make-get-organization-profile-use-case.ts";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase();

  const { organization } = await getOrganizationProfile.execute({
    orgId: request.user.sub,
  });

  return reply.status(200).send({
    ...organization,
    password_hash: undefined,
  });
}
