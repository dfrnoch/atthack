import {z} from "zod";

import {createTRPCRouter, protectedProcedure, publicProcedure} from "../trpc";

export const excersiceRouter = createTRPCRouter({
    alterCompleted: protectedProcedure.input(
        z.number().min(1, {message: "Množství dokončených cvičení je povinné."})
    )
        .query(({input}) => {
          
        }),
});
