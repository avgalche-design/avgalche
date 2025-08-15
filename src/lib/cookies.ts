// lib/cookies.ts
"use client";

export function setConsentCookie(value: "accepted" | "rejected") {
  document.cookie = `cookie_consent=${value}; path=/; max-age=${
    60 * 60 * 24 * 180
  }`;
}

export function getConsentCookie(): "accepted" | "rejected" | null {
  const match = document.cookie.match(/cookie_consent=(accepted|rejected)/);
  return match ? (match[1] as "accepted" | "rejected") : null;
}
