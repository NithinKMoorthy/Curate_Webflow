import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();
  const {accessToken} = await getAccessToken(req,res);
  console.log("ACCESS TOKEN: ", accessToken);
  return NextResponse.json({accessToken}, res); 
});

export {GET}; 