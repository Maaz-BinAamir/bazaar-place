import UserProfile from "@/components/user-profile";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <UserProfile id={id} />
    </>
  );
}
