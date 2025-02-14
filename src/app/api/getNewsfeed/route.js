import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = `https://vj7uo68ik2.execute-api.us-west-2.amazonaws.com/newsfeed?userId=annoymous`;

export async function GET(req) {
  console.log("API ROUTE for Newsfeed API Hit");

  // Extract token from request query parameters
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  console.log("TOKEN: ", token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: Missing token parameter" }, { status: 401 });
  }

  try {
    // Forward request to external API with the token
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
