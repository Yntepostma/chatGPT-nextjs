import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json("invalid request");
    return;
  }
  const { input } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: `${input}`,
        },
      ],
    });

    const chatGptResponse = response.data.choices[0].message;
    res.status(200).send({ message: chatGptResponse });
  } catch (err: any) {
    res.status(400).send(err.message);
  }
}
