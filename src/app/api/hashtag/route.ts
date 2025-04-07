import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";
import path from "path";
import { tmpdir } from "os";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_GCP_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_GCP_CLIENT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ), // 이게 중요!
  },
  projectId: process.env.NEXT_PUBLIC_GCP_CLIENT_PROJECT_ID,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "Image not found" }, { status: 400 });
    }

    // 파일을 임시로 저장
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempFilePath = path.join(tmpdir(), uuidv4() + "_" + file.name);
    await writeFile(tempFilePath, buffer);

    // Google Vision API 사용
    const [result] = await client.labelDetection(tempFilePath); // 또는 textDetection, landmarkDetection 등
    const labels = result.labelAnnotations;

    return NextResponse.json({ labels }, { status: 200 });
  } catch (err) {
    console.error("Error: ", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
