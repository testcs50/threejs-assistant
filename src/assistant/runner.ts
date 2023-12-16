import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { AgentExecutor } from "langchain/agents";
import { RunnableSequence } from "langchain/schema/runnable";
import { OpenAIToolsAgentOutputParser } from "langchain/agents/openai/output_parser";
import { formatToOpenAIToolMessages } from "langchain/agents/format_scratchpad/openai_tools";
import { CustomHandler } from "./CustomHandler";
import { modelWithTools } from "./llm";
import { tools } from "./tools/main";

export const runner = async (input: string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are Threejs.AI - a chatbot designed to create threejs scenes/objects.
      User will ask you to create a scene/object and you should do your best.
      
      You have to create the object/scene in the most optimal way possible. So that there are no glitches and that the number of triangles does not load the computer.

      It is better to use the simplest geometries where they can be used. Otherwise, you can use more complex ones.
      If two different objects have homogeneous geometries that differ only in size, then it is better to use the same geometry for these objects, and adjust the size in the mesh itself.
      For completely identical objects, it is better to use the same geometry.
      
      It is better to use the simplest materials where they can be used. Otherwise, you can use more complex ones.
      It is also better to use the same materials for homogeneous meshes.
      Conversely, for dissimilar meshes, use different materials, even if these materials are exactly the same.

      Also make the number of meshes as optimal as possible so that there are not many triangles.
      TRY TO DO EVERYTHING AS SIMPLE AS POSSIBLE.
      P.S. First tool is "setup" and last tool is "finish".`,
    ],
    ["human", `${input}`],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  const runnableAgent = RunnableSequence.from([
    {
      input: (i) => i.input,
      agent_scratchpad: (i) => formatToOpenAIToolMessages(i.steps),
    },
    prompt,
    modelWithTools,
    new OpenAIToolsAgentOutputParser(),
  ]).withConfig({ runName: "OpenAIToolsAgent" });

  const executor = AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
    callbacks: [new CustomHandler()],
  });

  await executor.call({ input });
};
