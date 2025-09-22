"use client";

import { useSearchParams } from "next/navigation";

import Posts from "@/components/Posts";

export default function page() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  return (
    <>
      <Posts query={query} />
    </>
  );
}
