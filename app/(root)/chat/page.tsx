import NewChat from "@/components/new-chat";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { newFromPost } = await searchParams;

  if (newFromPost) {
    return <NewChat postId={newFromPost} />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-[#FDFBF7] p-8">
      <div className="bg-white p-12 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center max-w-md">
        <h1 className="text-4xl font-black text-black mb-4">MESSAGES</h1>
        <p className="text-lg font-medium text-black/60">
          Select a conversation from the sidebar to start chatting or browse items to make a new offer!
        </p>
      </div>
    </div>
  );
}
