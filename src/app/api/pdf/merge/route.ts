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
    const files = formData.getAll("files") as File[];
    
    if (files.length < 2) {
      return NextResponse.json({ error: "At least 2 PDF files are required" }, { status: 400 });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    const mergedPdfFile = await mergedPdf.save();
    await increasePdfLimit(session.user.id);

    return new NextResponse(Buffer.from(mergedPdfFile), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="merged.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Merge error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
