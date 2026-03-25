export type JwtPayloadShape = {
  role?: string;
  exp?: number;
};

export function parseJwtPayload(token: string): JwtPayloadShape | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    if (typeof atob !== "function") return null;
    const json = atob(padded);
    return JSON.parse(json) as JwtPayloadShape;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwtPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now();
}

export function isAdminToken(token: string | null): boolean {
  if (!token) return false;
  if (isTokenExpired(token)) return false;
  return parseJwtPayload(token)?.role === "admin";
}
