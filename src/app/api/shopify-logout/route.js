import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Optional: If you store a customer access token in cookies, clear it
    const response = NextResponse.redirect("https://www.avgalche.com");
    response.cookies.set("shopify_customer_token", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return new Response("Logout failed", { status: 500 });
  }
}
