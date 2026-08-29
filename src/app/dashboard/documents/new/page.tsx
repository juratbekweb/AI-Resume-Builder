import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { redirect } from "next/navigation";
import { NewDocumentFlow } from "@/components/dashboard/new-document-flow";

export default async function NewDocumentPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/login");
  }

  return <NewDocumentFlow />;
}
