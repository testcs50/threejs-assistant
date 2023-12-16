import { ChatOpenAI } from "langchain/chat_models/openai";
import { formatToOpenAITool } from "langchain/tools";
import { tools } from "./tools/main";

const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  // modelName: "gpt-4",
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  streaming: true,
  temperature: 0,
  // callbacks: [
  //   {
  //     handleLLMNewToken: (token) => {
  //       console.log("===handleLLMNewToken", { token });
  //     },
  //   },
  // ],
});

export const modelWithTools = llm.bind({
  tools: tools.map(formatToOpenAITool),
});
