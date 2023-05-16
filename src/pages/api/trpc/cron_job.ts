import {NextApiRequest, NextApiResponse} from "next";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type Input = {
    to: string,
    name: string,
    age: number,
    gender: "male" | "female",
    hobbies: string,
    mailContent: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {to, name, age, gender, hobbies, role, mailContent} = req.body;

    if (!to || !name || !age || !gender || !hobbies || !role || !mailContent) {
        return res.status(400).send("Some input is missing.");
    }



    const personalized = await personalizeMail(req.body);

    if (gender !== "male" && gender !== "female") return res.status(400).send("Some input is missing.");
    const genderCzech = gender === "male" ? "muž" : "žena";

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        user: "server-cron-job",
        messages: [
            {
                role: "system", content: `Jsi pomocník na personalizování důležitých e-mailů. 
            Dostaneš obecný text e-mailu a upravíš ho tak, aby byl personalizovaný danému člověku. 
            Dnešní datum: ${new Date().toLocaleDateString("cs-CZ")}`
            },
            {
                role: "user",
                content:
                    `Budeš personalizovat e-mail pro zaměstnance, který se jmenuje ${name}, je to ${genderCzech}, je mu ${age} let, `
                    + `a jeho koníčky jsou ${hobbies}. Personalizuj pro něj tento e-mail:\n\n ${mailContent}`
            },
        ],
        max_tokens: 4000,
    });

    const response = completion.data.choices[0].message?.content ?? null;
    if (!response) {
        return res.status(500).send("OpenAI did not return any response.");
    }

    return res.status(200).send(response);
}

async function personalizeMail(props: {
    to: string, name: string, age: number, gender: "male" | "female", hobbies: string, role: string, mailContent: string
}): Promise<string | null> {
    const genderCzech = props.gender === "male" ? "muž" : "žena";

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        user: "server-cron-job",
        messages: [
            {
                role: "system", content: `Jsi pomocník na personalizování důležitých e-mailů. 
            Dostaneš obecný text e-mailu a upravíš ho tak, aby byl personalizovaný danému člověku. 
            Dnešní datum: ${new Date().toLocaleDateString("cs-CZ")}`
            },
            {
                role: "user",
                content:
                    `Budeš personalizovat e-mail pro zaměstnance, který se jmenuje ${props.name}, je to ${genderCzech}, je mu ${props.age} let, `
                    + `a jeho koníčky jsou ${props.hobbies}. Personalizuj pro něj tento e-mail:\n\n ${props.mailContent}`
            },
        ],
        max_tokens: 4000,
    });

    const response = completion.data.choices[0].message?.content ?? null;
    return response;
}

