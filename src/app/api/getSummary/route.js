import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = `https://vj7uo68ik2.execute-api.us-west-2.amazonaws.com/api/summaries/generate`;

export async function GET(req) {
  console.log("API ROUTE for Summary");

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const url = searchParams.get("url");

  console.log("URL:", url);
  console.log("TOKEN:", token);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized: Missing token parameter" }, { status: 401 });
  }
  let type = 'thread'; 
  if (url?.includes("reddit")) {
    type = "thread";
  } else if (url?.includes("youtube") || url?.includes("youtu.be")) {
    type = "video";
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        url, // Use extracted URL
        type,
        length: "short",
        focusAreas: ["key_points", "arguments", "examples"],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("RESPONSE.data: ", response.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
