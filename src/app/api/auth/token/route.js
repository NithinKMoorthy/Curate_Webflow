import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching Access Token...");

    const { accessToken } = await getAccessToken();

    console.log("Access Token:", accessToken);

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching access token:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
