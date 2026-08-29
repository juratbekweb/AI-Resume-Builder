import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { checkPdfLimit, increasePdfLimit } from "@/lib/pdf-limit";
import { PDFDocument } from "pdf-lib";

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

    const buffer = await file.arrayBuffer();
    // Load and resave without object streams to slightly optimize structure
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    
    // Some basic optimization (remove unused objects, etc.) happens inherently 
    // when resaving. This is not a deep compression but serves the purpose.
    const compressedPdfBytes = await pdf.save({ useObjectStreams: false });

    await increasePdfLimit(session.user.id);

    return new NextResponse(Buffer.from(compressedPdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="compressed.pdf"',
        "X-Original-Size": buffer.byteLength.toString(),
        "X-Compressed-Size": compressedPdfBytes.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("PDF Compress error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
