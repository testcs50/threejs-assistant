import { BaseCallbackHandler } from "langchain/callbacks";
import {
  AgentFinish,
  ChainValues,
  LLMResult,
  AgentAction,
  BaseMessage,
} from "langchain/schema";

type SerializedAny = any;

export class CustomHandler extends BaseCallbackHandler {
  name = "custom_handler";

  constructor() {
    super();
  }
  handleChatModelStart(
    llm: SerializedAny,
    messages: BaseMessage[][],
    runId: string,
    parentRunId?: string | undefined,
    extraParams?: Record<string, unknown> | undefined,
    tags?: string[] | undefined,
    metadata?: Record<string, unknown> | undefined,
    name?: string | undefined
  ) {
    // console.log("===handleChatModelStart", { llm, messages, runId, parentRunId, extraParams, tags, metadata, name });
    console.log("===handleChatModelStart");
    console.log({ llm: JSON.stringify(llm, null, 2) });
    console.log({ messages: JSON.stringify(messages, null, 2) });
    console.log({ runId, parentRunId, tags, metadata, name });
  }

  // handleLLMNewToken(token: string, idx, runId, parentRunId?, tags?, fields?) {
  //   console.log("===handleLLMNewToken", { token, idx, runId, parentRunId, tags, fields })
  //   res.write(token)
  // }

  handleLLMStart(
    llm: SerializedAny,
    prompts: string[],
    runId: string,
    parentRunId?: string | undefined,
    extraParams?: Record<string, unknown> | undefined,
    tags?: string[] | undefined,
    metadata?: Record<string, unknown> | undefined,
    name?: string | undefined
  ) {
    console.log("===handleLLMStart", {
      llm,
      prompts,
      runId,
      parentRunId,
      extraParams,
      tags,
      metadata,
      name,
    });
  }

  handleLLMEnd(
    output: LLMResult,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleLLMEnd", {
      output: JSON.stringify(output, null, 2),
      runId,
      parentRunId,
      tags,
    });
  }

  handleLLMError(
    err: any,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleLLMError", { err, runId, parentRunId, tags });
  }

  handleChainStart(
    chain: SerializedAny,
    inputs: ChainValues,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined,
    metadata?: Record<string, unknown> | undefined,
    runType?: string | undefined,
    name?: string | undefined
  ) {
    console.log("===handleChainStart", {
      chain,
      inputs,
      runId,
      parentRunId,
      tags,
      metadata,
      runType,
      name,
    });
  }

  handleChainEnd(
    outputs: ChainValues,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined,
    kwargs?: { inputs?: Record<string, unknown> | undefined } | undefined
  ) {
    console.log("===handleChainEnd", {
      outputs,
      runId,
      parentRunId,
      tags,
      kwargs,
    });
  }

  handleChainError(
    err: any,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined,
    kwargs?: { inputs?: Record<string, unknown> | undefined } | undefined
  ) {
    console.log("===handleChainError", {
      err,
      runId,
      parentRunId,
      tags,
      kwargs,
    });
  }

  handleAgentAction(
    action: AgentAction,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ): void | Promise<void> {
    console.log("===handleAgentAction", { action, runId, parentRunId, tags });
  }

  handleAgentEnd(
    action: AgentFinish,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ): void | Promise<void> {
    console.log("===handleAgentEnd", { action, runId, parentRunId, tags });
  }

  handleToolEnd(
    output: string,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleToolEnd", { output, runId, parentRunId, tags });
  }

  handleToolError(
    err: any,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleToolError", { err, runId, parentRunId, tags });
  }

  handleRetrieverStart(
    retriever: SerializedAny,
    query: string,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined,
    metadata?: Record<string, unknown> | undefined,
    name?: string | undefined
  ) {
    console.log("===handleRetrieverStart", {
      retriever,
      query,
      runId,
      parentRunId,
      tags,
      metadata,
      name,
    });
  }

  handleRetrieverEnd(
    documents: any[],
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleRetrieverEnd", {
      documents,
      runId,
      parentRunId,
      tags,
    });
  }

  handleRetrieverError(
    err: any,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ) {
    console.log("===handleRetrieverError", { err, runId, parentRunId, tags });
  }

  handleToolStart(
    tool: SerializedAny,
    input: string,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined,
    metadata?: Record<string, unknown> | undefined,
    name?: string | undefined
  ) {
    console.log("===handleToolStart", {
      tool,
      input,
      runId,
      parentRunId,
      tags,
      metadata,
      name,
    });
  }

  handleText(
    text: string,
    runId: string,
    parentRunId?: string | undefined,
    tags?: string[] | undefined
  ): void | Promise<void> {
    console.log("===handleText", { text, runId, parentRunId, tags });
  }
}
