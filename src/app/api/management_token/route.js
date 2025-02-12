import { NextResponse } from "next/server";

export async function POST() {
  console.log("HIT POST ROUTE");
  try {
    const auth0Domain = "https://dev-scn53u7fbhita2im.us.auth0.com";
    const tokenEndpoint = `${auth0Domain}/oauth/token`;

    const payload = {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://curate-api",
      grant_type: "client_credentials",
    };

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch token", details: error.message },
      { status: 500 }
    );
  }
}
