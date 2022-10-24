import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  registAddressSchema,
} from "../../schema/address.schema";
import { prisma } from "../../utils/prisma";
import { Input } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

export const addressRouter = t.router({
  regist: t.procedure
    .input(registAddressSchema)
    .mutation(async ({ input }) => {
      try {
        console.log(input)
        await prisma.address.create({
          data: {
            ...input,
          },
        });
      } catch (e) {
        console.log(e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2002":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "This address is already existed",
              });
          }
        }
        throw e;
      }
    }),
});
