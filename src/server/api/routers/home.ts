import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  loadData: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        currentCategory: true,
        currentExercise: true,
      },
    });

    const completedRegistration = !!user;
    console.log("completedRegistration", completedRegistration);

    const data = await ctx.prisma.category.findMany({
      include: {
        exercises: true,
      },
    });

    return { completedRegistration, user, data };
  }),
});
