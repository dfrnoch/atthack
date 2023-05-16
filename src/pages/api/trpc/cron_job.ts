import {NextApiRequest, NextApiResponse} from "next";
import PhishingMailer from "~/pages/api/phishingMailUtils";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Now we have all users that should receive the phishing email. Send it to everyone.

    const phishingMailer = new PhishingMailer(openai);
    await phishingMailer.sendRandomPhishingMailsToAllEligibleUsers();
}