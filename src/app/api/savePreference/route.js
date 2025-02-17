import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = `https://vj7uo68ik2.execute-api.us-west-2.amazonaws.com/preferences`;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("HELLO");
    const { token, selectedNameArray } = body; // Extract token and selected preferences
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }

    if (!selectedNameArray || !Array.isArray(selectedNameArray)) {
      return NextResponse.json({ error: "Invalid preferences data" }, { status: 400 });
    }

    console.log("Saving Preferences: ", selectedNameArray);

    // Forward request to external API
    const response = await axios.post(API_URL, {preferences: selectedNameArray }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Missing token parameter" }, { status: 401 });
    }

    console.log("Fetching Preferences for Token: ", token);

    // Fetch user preferences
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: error.response?.data || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
