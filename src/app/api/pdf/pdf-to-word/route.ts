import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { checkPdfLimit, increasePdfLimit } from "@/lib/pdf-limit";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hasLimit = await checkPdfLimit(session.user.id);
    if (!hasLimit) {
      return NextResponse.json({ error: "Limit reached", requireUpgrade: true }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "PDF file is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const data = await pdfParse(buffer);
    
    await increasePdfLimit(session.user.id);

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("PDF to Word error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
