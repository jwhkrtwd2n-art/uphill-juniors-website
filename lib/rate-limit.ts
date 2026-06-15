import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    firstForwardedIp ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function cleanupExpiredBuckets(now: number) {
  buckets.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  });
}

export function getRateLimitResponse(
  request: Request,
  namespace: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {}
) {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const key = `${namespace}:${getClientIdentifier(request)}`;
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (entry.count >= limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)),
        },
      }
    );
  }

  entry.count += 1;
  return null;
}

export function isSpamTrapFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
