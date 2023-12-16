// import { z } from "zod";
// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { AgentExecutor } from "langchain/agents";
// import { RunnableSequence } from "langchain/schema/runnable";
// import { OpenAIToolsAgentOutputParser } from "langchain/agents/openai/output_parser"
// import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
// import { DynamicStructuredTool, formatToOpenAITool } from "langchain/tools";
// import { BaseCallbackHandler } from "langchain/callbacks";
// import { formatToOpenAIToolMessages } from "langchain/agents/format_scratchpad/openai_tools";

// import { cookies } from "next/headers";

// import {
//   AIMessage,
//   AgentFinish,
//   ChainValues,
//   HumanMessage,
//   LLMResult,
//   AgentAction,
//   BaseMessage,
// } from "langchain/schema";

// import type { NextApiRequest, NextApiResponse } from "next";
// import { Serialized } from "langchain/dist/load/serializable";
// import { Document } from "langchain/dist/document";
// import { createClient } from "@supabase/supabase-js";
// import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// enum Role {
//   assistant = "assistant",
//   user = "user",
// }

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// }

// const patients = JSON.stringify([{
//   name: "John Smith",
//   prescription: "Class 2 malocclusion. Missing canines",
//   age: "21",
//   sex: "male"
// }, {
//   name: "Jane Doe",
//   prescription: "Class 1 malocclusion. Supernumeral teeth present",
//   age: "12",
//   sex: "female"
// }])

// const tools = [
//   new DynamicStructuredTool({
//     name: 'rotate-tooth',
//     schema: z.object({
//       index: z.number().describe('index of the tooth to rotate'),
//       angle: z.number().describe('angle to rotate the tooth to'),
//     }),
//     description: 'rotate tooth with given index to given angle',
//     func: async ({ index, angle }) => {
//       if (index < 1 || index > 32) {
//         return 'Error: index must be in range from 1 to 32'
//       }
//       const output = `rotated tooth ${index} to ${angle} degrees`
//       console.log({ output })
//       return output
//     }
//   }),
//   new DynamicStructuredTool({
//     name: 'move-tooth',
//     schema: z.object({
//       index: z.number().describe('index of the tooth to move'),
//       x: z.number().describe('x coordinate to move the tooth to'),
//       y: z.number().describe('y coordinate to move the tooth to'),
//     }),
//     description: 'move tooth with given index to given coordinates',
//     func: async ({ index, x, y }) => {
//       if (index < 1 || index > 32) {
//         return 'Error: index must be in range from 1 to 32'
//       }
//       const output = `moved tooth ${index} to ${x}, ${y}`
//       console.log({ output })
//       return output
//     }
//   }),
// ];

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const supabase = createPagesServerClient({ req, res }, {
//     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
//   })

//   // const supabase = createPagesServerClient({ req, res })

//   // console.log({ supabase })

//   // This is needed if you're planning to invoke your function from a browser.
//   // console.log({ res })
//   // if (req.method === "OPTIONS") {
//   //   return new Response("ok", { headers: corsHeaders });
//   // }

//   // try {
//   const { messages: inputs } = await req.body;

//   const input = inputs[inputs.length - 1].content;

//   const messages = [
//     ...inputs.map(message => (
//       message.role === Role.assistant
//         ? new AIMessage(message.content)
//         : new HumanMessage(message.content)
//     )),
//   ];

//   const prompt = ChatPromptTemplate.fromMessages([
//     [
//       "system",
//       "You are Vision.AI - a chatbot designed to help create orthodontic treatment plans.\n"
//     ],
//     ["human", `${input}`],
//     new MessagesPlaceholder("agent_scratchpad"),
//   ]);

//   // Check if the request is for a streaming response.
//   // const streaming = req.headers.get("accept") === "text/event-stream";

//   class CustomHandler extends BaseCallbackHandler {
//     name = "custom_handler";

//     constructor() {
//       super();
//     }
//     handleChatModelStart(llm: Serialized, messages: BaseMessage[][], runId: string, parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined, tags?: string[] | undefined, metadata?: Record<string, unknown> | undefined, name?: string | undefined) {
//       // console.log("===handleChatModelStart", { llm, messages, runId, parentRunId, extraParams, tags, metadata, name });
//       console.log("===handleChatModelStart");
//       console.log({ llm: JSON.stringify(llm, null, 2) })
//       console.log({ messages: JSON.stringify(messages, null, 2) })
//       console.log({ runId, parentRunId, tags, metadata, name })
//     }

//     // handleLLMNewToken(token: string, idx, runId, parentRunId?, tags?, fields?) {
//     //   console.log("===handleLLMNewToken", { token, idx, runId, parentRunId, tags, fields })
//     //   res.write(token)
//     // }

//     handleLLMStart(llm: Serialized, prompts: string[], runId: string, parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined, tags?: string[] | undefined, metadata?: Record<string, unknown> | undefined, name?: string | undefined) {
//       console.log("===handleLLMStart", { llm, prompts, runId, parentRunId, extraParams, tags, metadata, name })
//     }

//     handleLLMEnd(output: LLMResult, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleLLMEnd", {
//         output: JSON.stringify(output, null, 2),
//         runId, parentRunId, tags
//       });
//     }

//     handleLLMError(err: any, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleLLMError", { err, runId, parentRunId, tags });
//     }

//     handleChainStart(chain: Serialized, inputs: ChainValues, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined, metadata?: Record<string, unknown> | undefined, runType?: string | undefined, name?: string | undefined) {
//       console.log("===handleChainStart", { chain, inputs, runId, parentRunId, tags, metadata, runType, name });
//     }

//     handleChainEnd(outputs: ChainValues, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined, kwargs?: { inputs?: Record<string, unknown> | undefined; } | undefined) {
//       console.log("===handleChainEnd", { outputs, runId, parentRunId, tags, kwargs });
//     }

//     handleChainError(err: any, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined, kwargs?: { inputs?: Record<string, unknown> | undefined; } | undefined) {
//       console.log("===handleChainError", { err, runId, parentRunId, tags, kwargs });
//     }

//     async handleAgentAction(action: AgentAction, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined): void | Promise<void> {
//       console.log("===handleAgentAction", { action, runId, parentRunId, tags });

//       const { data, error } = await supabase
//         .from('commands')
//         .insert([
//           {
//             type: action.tool,
//             params: action.toolInput,
//             prompt: input
//           },
//         ])
//         .select()

//       console.log({ data, error })

//     }

//     handleAgentEnd(action: AgentFinish, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined): void | Promise<void> {
//       console.log("===handleAgentEnd", { action, runId, parentRunId, tags });
//     }

//     handleToolEnd(output: string, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleToolEnd", { output, runId, parentRunId, tags });
//     }

//     handleToolError(err: any, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleToolError", { err, runId, parentRunId, tags });
//     }

//     handleRetrieverStart(retriever: Serialized, query: string, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined, metadata?: Record<string, unknown> | undefined, name?: string | undefined) {
//       console.log("===handleRetrieverStart", { retriever, query, runId, parentRunId, tags, metadata, name });
//     }

//     handleRetrieverEnd(documents: Document<Record<string, any>>[], runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleRetrieverEnd", { documents, runId, parentRunId, tags });
//     }

//     handleRetrieverError(err: any, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined) {
//       console.log("===handleRetrieverError", { err, runId, parentRunId, tags });
//     }

//     handleToolStart(tool: Serialized, input: string, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined, metadata?: Record<string, unknown> | undefined, name?: string | undefined) {
//       console.log("===handleToolStart", { tool, input, runId, parentRunId, tags, metadata, name });
//     }

//     handleText(text: string, runId: string, parentRunId?: string | undefined, tags?: string[] | undefined): void | Promise<void> {
//       console.log("===handleText", { text, runId, parentRunId, tags });
//     }
//   }

//   const llm = new ChatOpenAI({
//     // modelName: "gpt-3.5-turbo-1106",
//     modelName: "gpt-4",
//     streaming: true,
//     temperature: 0,
//     // verbose: true,
//     // callbacks: [new CustomHandler()],
//     callbacks: [{
//       handleLLMNewToken: (token) => {
//         // console.log({ token, idx, runId, parentRunId, tags, fields })
//         res.write(token)
//       }
//     }]
//   });

//   const modelWithTools = llm.bind({ tools: tools.map(formatToOpenAITool) });

//   const runnableAgent = RunnableSequence.from([
//     {
//       input: (i) => i.input,
//       agent_scratchpad: (i) => formatToOpenAIToolMessages(i.steps),
//     },
//     prompt,
//     modelWithTools,
//     new OpenAIToolsAgentOutputParser()
//   ]).withConfig({ runName: "OpenAIToolsAgent" });

//   const executor = AgentExecutor.fromAgentAndTools({
//     agent: runnableAgent,
//     tools,
//     // verbose: true,
//     // logLevel: "debug",
//     callbacks: [new CustomHandler()],
//   });

//   await executor.call(
//     { input },
//     // [new CustomHandler()],
//   )

//   res.end()
// }
