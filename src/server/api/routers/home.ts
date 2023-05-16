import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  loadData: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        clerkId: ctx.auth.userId,
      },
      include: {
        currentCategory: true,
        currentExercise: true,
      },
    });

    const data = await ctx.prisma.category.findMany({
      include: {
        exercises: true,
      },
    });

    return { user, data };
  }),
});
