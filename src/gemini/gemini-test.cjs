
import {GoogleGenerativeAI} from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA14eZTGShAoOHx15smh8qpB6T6NWoGRsA");

export async function run(text_prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `write out the one class that is mentioned in this text without any dashes or extra spaces: ${text_prompt}`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text
}