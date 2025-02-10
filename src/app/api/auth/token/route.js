import { getAccessToken } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers"; // ✅ Import `cookies()` for App Router
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API ROUTE HIT - Fetching Auth0 Access Token");

  try {
    const session = await getAccessToken({
      cookies: cookies(), // ✅ Use cookies() instead of req
      authorizationParams: {
        audience: "https://curate-api",
        scope: "openid profile email",
      },
    });

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized: No access token found" }, { status: 401 });
    }

    console.log("USER ACCESS TOKEN:", session.accessToken);

    return NextResponse.json({ accessToken: session.accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
