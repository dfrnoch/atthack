import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  createUserData: protectedProcedure
    .input(
      z.object({
        age: z.number(),
        gender: z.enum(["MALE", "FEMALE"]),
        hobbies: z.array(z.string()).optional(),
        education: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.create({
        data: {
          clerkId: ctx.auth.userId,
          age: input.age,
          hobbies: input.hobbies?.join(","),
          education: input.education,
          gender: input.gender,
        },
      });
    }),
});
