import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createUserDetails: protectedProcedure
    .input(
      z.object({
        age: z.number(),
        gender: z.enum(["MALE", "FEMALE"]),
        hobbies: z.array(z.string()).optional(),
        education: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return "";
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
