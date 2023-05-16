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

    const data = await ctx.prisma.category.findMany({
      include: {
        exercises: true,
      },
    });

    return { completedRegistration, data };
  }),
});
