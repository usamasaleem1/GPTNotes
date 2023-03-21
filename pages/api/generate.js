import openai from "openai";

async function generatePrompt(animal) {
  const question = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `I am a highly intelligent bot that can generate lecture notes for you. Given the lecture slides, I will create lecture notes for you.\n\nQ: ${question}\nA: `;
}

export default async function (req, res) {
  const response = await openai.ChatCompletion.create({
    engine: "gpt-3.5-turbo",
    prompt: generatePrompt(req.body.animal),
    max_tokens: 700,
    temperature: 0.3,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "What are the main points of the lecture?" },
    ],
  });

  res.status(200).json({
    result: response.choices[0].text,
    loading: false,
  });
}
