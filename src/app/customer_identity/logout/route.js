// app/customer_identity/logout/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  // Parse return_url if it exists, else default to home
  const { searchParams } = new URL(request.url);
  const returnUrl = searchParams.get("return_url") || "/";

  // Redirect to home (or the return_url)
  return NextResponse.redirect(returnUrl);
}
