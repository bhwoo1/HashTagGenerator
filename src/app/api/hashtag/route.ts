import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";
import OpenAI from "openai";

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GCP_CLIENT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  },
  projectId: process.env.NEXT_PUBLIC_GCP_CLIENT_PROJECT_ID,
});

const gptClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API
});

let hashtags: string | null = null;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const language = formData.get("language");
    const quantity = formData.get("quantity");


    if (!file) {
      return NextResponse.json({ error: "Image not found" }, { status: 400 });
    }


    if (!language || !quantity) {
      return NextResponse.json({ error: "Language or Quantity not found" }, { status: 400 });
    }

    // 파일을 임시로 저장
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempFilePath = path.join(tmpdir(), uuidv4() + "_" + file.name);
    await writeFile(tempFilePath, buffer);

    // Google Vision API 사용
    const [result] = await client.labelDetection(tempFilePath);
    const labels = result.labelAnnotations;

    const descriptions = labels?.map(item => item.description);


    const response = await gptClient.responses.create({
      model: "gpt-3.5-turbo",
      input: `내 이미지에는 다음과 같은 요소가 있어: ${descriptions?.join(",")}. 이걸 보고 SNS용 ${language} 해시태그 ${quantity} 개를 추천해 줘. 다만 각 해시태그는 쉼표로 나열해 줘줘`
    })

    hashtags = response.output_text;

  } catch (err) {
    console.error("Error: ", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function GET() {
  return NextResponse.json({ hashtags }, { status: 200 });
}
