
import NewChat from "@/components/new-chat";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const newFromPost = searchParams.newFromPost;

  if (newFromPost) {
   return <NewChat postId={newFromPost} />;
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1>Chat</h1>
    </div>
  );
}
