import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  registUserSchema,
  getUserEmailSchema, 
  editUserSchema,
} from "../../schema/user.schema";
import { prisma } from "../../utils/prisma";
import { Input } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";

export const userRouter = t.router({
  regist: t.procedure.input(registUserSchema).mutation(async ({ input }) => {
    try {
      await prisma.user.create({ data: { ...input } });
      await prisma.cart.create({
        data: { userEmail: input.email },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2002":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "This email is already existed",
            });
        }
      }
      throw e;
    }
  }),
  get: t.procedure
    .input(getUserEmailSchema)
    .query(async ({input}) =>{
      const userSnapshot = await prisma.user.findFirst({
        where: {
          email: input.email
        },
      })
      return userSnapshot
  }),
  edit: t.procedure
    .input(editUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            email: input.email,
            password: input.password
          },
        });
      } catch(e) {
        console.log(e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2025":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "Record to delete does not exist.",
              });
            default:
              throw new trpc.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "SYSTEM ERROR",
              });
          }
        }
        throw e;
      }
    }),
});
