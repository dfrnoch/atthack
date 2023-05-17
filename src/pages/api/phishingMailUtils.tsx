import { prisma } from "~/server/db";
import {User, UserDetails} from ".prisma/client";
import Email from "~/pages/api/Email";
import phishingEmails from "~/pages/api/phishingEmails";
import {OpenAIApi} from "openai";

export type UserWithDetails = User & {UserDetails: UserDetails | null};

export default class PhishingMailer {
    readonly openai: OpenAIApi;
    constructor(openai: OpenAIApi) {
        this.openai = openai;
    }

    public async sendRandomPhishingMailsToAllEligibleUsers() {
        const users = await this.getAllReceivingUsers();
        for (const user of users) {
            await this.sendRandomPhishingMail(user);
        }
    }

    public async sendRandomPhishingMail(user: UserWithDetails) {
        const email = await this.createRandomPhishingEmail(user);
        await Email.sendMail({
            to: user.email!,
            content: email.content,
            subject: email.subject
        })
    }

    public async createRandomPhishingEmail(user: UserWithDetails): Promise<{
        subject: string,
        content: string
    }> {
        const email = phishingEmails[Math.floor(Math.random() * phishingEmails.length)]!;
        const formatted = email.subject + "\n\n" + email.content;
        console.log("formatted etc. going to personalization");
        const personalized = await this.personalizeMail({user, mail: formatted});

        return {
            subject: email.subject,
            content: personalized
        }
    }

    public async personalizeMail(props: {
        mail: string,
        user: UserWithDetails
    }): Promise<string> {
        const user = props.user;
        const userDetails = props.user.UserDetails!;
        const genderCzech = userDetails.gender === "FEMALE" ? "žena" : "muž";

        console.log(`Prompt: Budeš personalizovat e-mail pro zaměstnance, který se jmenuje ${user.name}, je to ${genderCzech}, je mu ${userDetails.age} let, a jeho koníčky jsou ${userDetails.hobbies}. Personalizuj pro něj tento e-mail:\n\n ${props.mail}`);
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            user: user.email!,
            messages: [
                {
                    role: "system", content: `Jsi pomocník na personalizování důležitých e-mailů. 
            Dostaneš obecný text e-mailu a upravíš ho tak, aby byl personalizovaný danému člověku. 
            Dnešní datum: ${new Date().toLocaleDateString("cs-CZ")}`
                },
                {
                    role: "user",
                    content:
                        `Personalizuj e-mail pro zaměstnance, který se jmenuje ${user.name}. Je to ${genderCzech}, je mu ${userDetails.age} let, a jeho koníčky jsou ${userDetails.hobbies}. E-mail:\n\n${props.mail}`
                },
            ],
        });

        const response = completion.data.choices[0]?.message?.content;
        if (!response) throw new Error("No response from OpenAI API.");
        console.log("Response from openai: ", response);
        return response;
    }

    public async getAllReceivingUsers() {
        // Fetch all companies that have phishing_email_frequency_days larger than 0.
        const companies = await prisma.company.findMany({
            where: {
                phishingEmailFrequencyDays: {
                    gt: 0
                }
            }
        })

        // Select companies whose lastPhishingEmailSendTime (possibly null) is phishingEmailFrequencyDays or more days ago.
        const receivingCompanies = companies.filter(company => {
            if (!company.lastPhishingEmailSendTime) return true;
            return company.lastPhishingEmailSendTime.getTime() <= Date.now() - (company.phishingEmailFrequencyDays * 24 * 60 * 60 * 1000);
        });

        // Now select all users in those companies.
        return prisma.user.findMany({
            where: {
                Company: {
                    id: {
                        in: receivingCompanies.map(company => company.id)
                    }
                }
            },
            include: {
                Company: true,
                UserDetails: true
            }
        });
    }
}