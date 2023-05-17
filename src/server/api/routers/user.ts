import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createUserDetails: protectedProcedure
    .input(
      z.object({
        inviteId: z.string(),
        workerGroupId: z.string(),
        age: z.number(),
        gender: z.enum(["MALE", "FEMALE"]),
        hobbies: z.array(z.string()).optional(),
        education: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const invite = await ctx.prisma.invite.findUnique({
        where: {
          id: input.inviteId,
        },
        select: {
          Company: true,
        },
      });

      if (!invite) throw new Error("Invite not found");

      return await ctx.prisma.userDetails.create({
        data: {
          age: input.age,
          gender: input.gender,
          hobbies: input.hobbies,
          userId: ctx.session.user.id,
          companyId: invite.Company.id,
          workerGroupId: input.workerGroupId,
        },
      });
    }),

  getRole: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        role: true,
      },
    });
  }),
});
