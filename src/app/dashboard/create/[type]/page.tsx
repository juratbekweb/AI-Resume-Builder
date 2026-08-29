import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { DocumentType } from "@prisma/client"
import { DocumentHubClient } from "@/components/dashboard/document-hub-client"

export default async function DocumentTypeHubPage({ params }: { params: Promise<{ type: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect("/login")
  }
  const { type } = await params;
  const uppercaseType = type.toUpperCase().replace('-', '_');
  
  if (!Object.values(DocumentType).includes(uppercaseType as DocumentType)) {
    redirect("/dashboard");
  }

  const documents = await prisma.document.findMany({
    where: { 
      userId: session.user.id,
      type: uppercaseType as DocumentType,
      deletedAt: null
    },
    orderBy: { updatedAt: 'desc' },
    take: 6,
  });

  return (
    <DocumentHubClient 
      type={uppercaseType as DocumentType} 
      recentDocuments={documents} 
    />
  )
}
