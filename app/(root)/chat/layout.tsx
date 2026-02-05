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
    <div className="flex h-[calc(100vh-80px)] bg-[#FDFBF7] overflow-hidden">
      <ChatSidebar conversation_id={conversationId} />
      <main className="flex-1 flex flex-col min-w-0 bg-[#FDFBF7] relative">
        {children}
      </main>
    </div>
  );
}
