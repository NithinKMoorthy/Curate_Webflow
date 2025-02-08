import { getAccessToken } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API ROUTE HIT - Fetching Auth0 Access Token");

  try {
    const session = await getAccessToken({
      cookies: cookies(),
      authorizationParams: {
        audience: "https://curate-api", // Must match AWS API Gateway audience
        scope: "openid profile email",  // Ensure necessary scopes are included
      },
    });

    if (!session || !session.accessToken) {
      return NextResponse.json({ error: "Unauthorized: No access token found" }, { status: 401 });
    }

    console.log("USER ACCESS TOKEN:", session.accessToken);

    return NextResponse.json({ accessToken: session.accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
