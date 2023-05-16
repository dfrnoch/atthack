import PhishingMailer from "~/pages/api/phishingMailUtils";
import {createTRPCRouter, protectedProcedure} from "../trpc";
import {z} from "zod";

const { Configuration, OpenAIApi } = require("openai");

export const mailRouter = createTRPCRouter({
    sendPhishingEmailToSelf: protectedProcedure
        .mutation(async ({ctx}) => {
            const user = await ctx.prisma.user.findUnique({
                where: {id: ctx.session.user.id},
                include: {UserDetails: true}
            });

            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);
            const mailer = new PhishingMailer(openai);

            if (!user!.UserDetails) {
                user!.UserDetails = {
                    age: 40,
                    gender: "MALE",
                    hobbies: ["Byznys", "rybaření", "hra na kytaru"],
                    companyId: null,
                    id: "0",
                    userId: "0",
                };
            }

            await mailer.sendRandomPhishingMail(user!);
        }),

    createPhishingEmail: protectedProcedure
        .output(z.object({
            subject: z.string(),
            content: z.string(),
        }))
        .query(async ({ctx}) => {
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);

            const user = await ctx.prisma.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
                include: {
                    UserDetails: true,
                }
            });

            console.log("found user");

            if (!user!.UserDetails) {
                user!.UserDetails = {
                    age: 40,
                    gender: "MALE",
                    hobbies: ["Byznys", "rybaření", "hra na kytaru"],
                    companyId: null,
                    id: "0",
                    userId: "0",
                };
            }

            const mailer = new PhishingMailer(openai);
            console.log("Creating random phinshing email...");
            return await mailer.createRandomPhishingEmail(user!);
        })
});