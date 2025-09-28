import Chat from "@/components/chat";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: conversationId } = await params;

  return <Chat conversation_id={conversationId} />;
}
