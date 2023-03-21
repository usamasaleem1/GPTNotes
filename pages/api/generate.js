import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generate(req, res) {
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: generatePrompt(req.body.animal),
    },
  ];

  const completion = await openai.ChatCompletion.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  res.status(200).json({
    result: completion.data.choices[0].message.content,
    loading: false,
  });
}

function generatePrompt(animal) {
  const question = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `I am a highly intelligent bot that can generate lecture notes for you. Given the lecture slides, I will create lecture notes for you.

Q: ${question}
A: `;
}
