import ChatSidebar from "@/components/chat-sidebar";

export default function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id: conversationId } = params;

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <ChatSidebar conversation_id={conversationId} />
      {children}
    </div>
  );
}
