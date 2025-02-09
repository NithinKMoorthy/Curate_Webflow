import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("API ROUTE HIT - Fetching Auth0 Access Token");

  try {
    const session = await getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: No session found" }, { status: 401 });
    }

    const token = await getAccessToken({
      req, // Pass the full request to ensure cookies are included
      authorizationParams: {
        audience: "https://curate-api",
        scope: "openid profile email",
      },
    });

    if (!token || !token.accessToken) {
      return NextResponse.json({ error: "Unauthorized: No access token found" }, { status: 401 });
    }

    console.log("USER ACCESS TOKEN:", token.accessToken);

    return NextResponse.json({ accessToken: token.accessToken }, { status: 200 });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
