import { getAccessToken } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Manually pass cookies for Next.js App Router
    const token = await getAccessToken({
      cookies: cookies(),
      authorizationParams: {
        audience: "https://curate-api",
        scope: "openid profile email",
      },
    });

    if (!token || !token.accessToken) {
      return NextResponse.json({ error: "Unauthorized: No access token found" }, { status: 401 });
    }

    return NextResponse.json({ accessToken: token.accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
