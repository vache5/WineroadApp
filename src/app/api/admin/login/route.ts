import { NextResponse } from "next/server";

import { getServerBackendOrigin } from "@/lib/api/config";

/**
 * Proxies POST /api/admin/login → Express POST /admin/login.
 * The browser only talks to Next.js, so CORS and wrong NEXT_PUBLIC_API_URL on the client are avoided for sign-in.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const origin = getServerBackendOrigin();
  const target = `${origin}/admin/login`;

  let res: Response;
  try {
    res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        error: `Cannot reach Express API at ${origin}. Set NEXT_PUBLIC_API_URL (and optionally BACKEND_URL) in .env.local or your deployment env, ensure the backend is running, then restart Next.js.`,
      },
      { status: 502 }
    );
  }

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
