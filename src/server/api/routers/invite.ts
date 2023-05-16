import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const inviteRouter = createTRPCRouter({
  getInviteInfo: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const inviteData = await ctx.prisma.invite.findUnique({
      where: {
        id: input,
      },
    });

    return inviteData;
  }),
});
