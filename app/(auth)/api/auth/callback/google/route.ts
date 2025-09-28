import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";

export async function GET(req: NextRequest) {
  const user = await fetchQuery(
    api.users.currentUser,
    {},
    { token: await convexAuthNextjsToken() }
  );

  if (!user) {
    // OAuth failed
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!user.username) {
    // Profile incomplete -> redirect to edit profile
    return NextResponse.redirect(
      new URL("/profile/edit?complete-signup=true", req.url)
    );
  }

  // Profile complete -> redirect to main app
  return NextResponse.redirect(new URL("/bazaar", req.url));
}
