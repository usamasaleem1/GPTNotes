import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-003", {
    prompt: generatePrompt(req.body.animal),
    temperature: 0.3,
    max_tokens: 700,
  });
  res
    .status(200)
    .json({ result: completion.data.choices[0].text, loading: false });
}

function generatePrompt(animal) {
  const question = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `I am a highly intelligent bot that can generate lecture notes for you. Given the lecture slides, I will create lecture notes for you.

Q: ${question}
A: `;
}
