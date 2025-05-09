import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(req) {
  console.log("API ROUTE HIT for Search Suggestions");

  // Extract token from request query parameters
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const query = searchParams.get("query");
  const sources = searchParams.get("sources"); 
  console.log("TOKEN: ", token);
  console.log("QUERY: ", query);
  const API_URL = `https://vj7uo68ik2.execute-api.us-west-2.amazonaws.com/api/search/suggestions?query=${query}&sources=${sources}`;

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
    console.log("response.data: ", response.data);
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
