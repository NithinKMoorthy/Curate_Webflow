import { handleLogout } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await handleLogout(req, {
      returnTo: "https://main.d32znpesnpj1dh.amplifyapp.com",
    });

    // Ensure CORS headers are present for production
    response.headers.set("Access-Control-Allow-Origin", "https://main.d32znpesnpj1dh.amplifyapp.com");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle preflight (OPTIONS) requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://main.d32znpesnpj1dh.amplifyapp.com",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}
