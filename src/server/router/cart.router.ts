import { t } from "../trpc";
import * as trpc from "@trpc/server";
import { editCategorySchema } from "../../schema/category.schema";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import {
  inputDeleteCartSchema,
  inputGetCartSchema,
  outputGetCartSchema,
  registCartSchema,
} from "../../schema/cart.schema";

export const cartRouter = t.router({
  regist: t.procedure.input(registCartSchema).mutation(async ({ input }) => {
    try {
      await prisma.cartData.create({
        data: { ...input },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "SYSTEM ERROR",
        });
      }
      throw e;
    }
  }),
  get: t.procedure
    .input(inputGetCartSchema)
    .output(outputGetCartSchema)
    .query(async ({ input }) => {
      try {
        const cart = await prisma.cart.findUnique({
          where: {
            id: input.cartId,
          },
          include: {
            products: true,
          },
        });
        return {
          products: cart?.products ?? null,
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  delete: t.procedure
    .input(inputDeleteCartSchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.cartData.delete({
          where: {
            id: input.cartDataId,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "SYSTEM ERROR",
          });
        }
        throw e;
      }
    }),
  edit: t.procedure.input(editCategorySchema).mutation(async ({ input }) => {}),
});
