import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const excersiceRouter = createTRPCRouter({
  alterCompleted: protectedProcedure
    .input(
      z.object({
        category: z.number(),
        excercisePosition: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const ctg = await ctx.prisma.category.findUnique({
        where: {
          id: input.category,
        },
        include: {
          exercises: {
            where: {
              categoryPosition: input.excercisePosition,
              categoryId: input.category,
            },
          },
        },
      });

      if (!ctg || !ctg?.exercises[0]) {
        throw new Error("Category not found");
      }

      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          completedExercises: {
            connect: {
              id: ctg?.exercises[0].id,
            },
          },
        },
      });
    }),
});
