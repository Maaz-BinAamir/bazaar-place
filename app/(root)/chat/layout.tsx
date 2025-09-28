import ChatSidebar from "@/components/chat-sidebar";

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id: conversationId } = await params;

  return (
    <div className="flex h-full bg-background">
    {/* Sidebar */}
      <ChatSidebar conversation_id={conversationId} />
      {children}
    </div>
  );
}
