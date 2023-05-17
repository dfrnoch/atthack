import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  loadData: protectedProcedure.query(async ({ ctx }) => {
    const userDetails = await ctx.prisma.userDetails.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const completedRegistration = !!userDetails;
    console.log("completedRegistration", completedRegistration);

    const categories = await ctx.prisma.category.findMany({
      select: {
        name: true,
        description: true,
        id: true,
        image: true,
      },
    });

    return { completedRegistration, categories };
  }),

  categoryInfo: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const category = await ctx.prisma.category.findUnique({
      where: {
        id: input,
      },
      include: {
        exercises: true,
      },
    });

    return category;
  }),
});
