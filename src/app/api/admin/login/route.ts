import { NextResponse } from "next/server";

function backendOrigin(): string {
  const raw =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://127.0.0.1:4000";
  return raw.replace(/\/$/, "");
}

/**
 * Proxies POST /api/admin/login → Express POST /admin/login.
 * The browser only talks to Next.js, so CORS and wrong NEXT_PUBLIC_API_URL on the client are avoided for sign-in.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const target = `${backendOrigin()}/admin/login`;

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
        error: `Cannot reach Express API at ${backendOrigin()}. Start Wineroad-back (npm run dev) and set BACKEND_URL or NEXT_PUBLIC_API_URL in .env.local.`,
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
