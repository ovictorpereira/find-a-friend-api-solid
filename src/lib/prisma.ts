import { PrismaClient } from "@prisma/client";
import { env } from "../env/index.ts";

export const prisma = new PrismaClient();
