import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { researchWithLangGraph } from "./research";
import { AnnotatedFunction } from "@copilotkit/shared";

export const runtime = "edge";

const researchAction: AnnotatedFunction<any> = {
  name: "research",
  description: "Call this function to conduct research on a certain topic. Respect other notes about when to call this function",
  argumentAnnotations: [
    {
      name: "topic",
      type: "string",
      description: "The topic to research. 5 characters or longer.",
      required: true,
    },
  ],
  implementation: async (topic) => {
    console.log("Researching topic: ", topic);
    return await researchWithLangGraph(topic);
  },
};

export async function POST(req: Request): Promise<Response> {
  const actions: AnnotatedFunction<any>[] = [];
  if (process.env["TAVILY_API_KEY"]) {
    actions.push(researchAction);
  }
  const copilotKit = new CopilotBackend({
    actions: actions,
  });

  return copilotKit.response(req, new OpenAIAdapter());
}
