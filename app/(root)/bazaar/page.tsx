"use client";

import { useSearchParams } from "next/navigation";

import { Posts } from "@/components/posts";

export default function Page() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <Posts query={query} />
    </>
  );
}
