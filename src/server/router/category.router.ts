import { t } from "../trpc";
import * as trpc from "@trpc/server";
import {
  deleteCategorySchema,
  editCategorySchema,
  outPutCategorySchema,
  registCategorySchema,
} from "../../schema/category.schema";
import { prisma } from "../../utils/prisma";
import { Prisma } from "@prisma/client";

export const categoryRouter = t.router({
  regist: t.procedure
    .input(registCategorySchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.category.create({
          data: {
            name: input.name,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2002":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "This category is already existed",
              });
          }
        }
        throw e;
      }
    }),
  get: t.procedure.output(outPutCategorySchema).query(async () => {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      throw e;
    }
  }),
  delete: t.procedure
    .input(deleteCategorySchema)
    .mutation(async ({ input }) => {
      try {
        await prisma.category.delete({
          where: { name: input.name },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2025":
              throw new trpc.TRPCError({
                code: "CONFLICT",
                message: "Record to delete does not exist.",
              });
          }
        }
        throw e;
      }
    }),
  edit: t.procedure.input(editCategorySchema).mutation(async ({ input }) => {
    try {
      await prisma.category.update({
        where: {
          name: input.targetName,
        },
        data: {
          name: input.newName,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2025":
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Record to delete does not exist.",
            });
        }
      }
      throw e;
    }
  }),
});
