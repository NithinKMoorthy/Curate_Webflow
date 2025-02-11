import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API ROUTE HIT - Fetching Auth0 Access Token");

  try {
    const session = await getAccessToken({
      authorizationParams: {
        audience: "https://curate-api",
        scope: "openid profile email",
      },
    });

    if (!session || !session.accessToken) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized: No access token found" }), {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    console.log("USER ACCESS TOKEN:", session.accessToken);

    return new NextResponse(
      JSON.stringify({ accessToken: session.accessToken }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching access token:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
