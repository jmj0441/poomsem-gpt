import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAI } from "langchain/llms/openai";

export async function POST(req: Request) {
  const { question } = await req.json();
  const openaiApiKey = process.env.OPENAI_API_KEY!;
  const pineconeApiKey = process.env.PINECONE_API_KEY!;
  const pineconeIndex = process.env.PINECONE_INDEX_NAME!;

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey });
  const pinecone = new Pinecone({ apiKey: pineconeApiKey });
  const index = pinecone.Index(pineconeIndex);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });

  const results = await vectorStore.similaritySearch(question, 3);

  const model = new OpenAI({ openAIApiKey: openaiApiKey, temperature: 0 });

  const res = await model.call(`
다음 품셈 항목 정보를 참고하여 질문에 답하세요:

${results.map((r) => r.pageContent).join("\n\n")}

질문: ${question}

답변:
  `);

  return NextResponse.json({ answer: res });
}