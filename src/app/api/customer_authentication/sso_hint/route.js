import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("return_to");

  // Default if missing
  const destination =
    returnTo || "https://shopify.com/93829235007/account/profile";

  return NextResponse.redirect(destination);
}
