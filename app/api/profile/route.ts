import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { setDisplayName } from "@/lib/profile-store";

const MAX_LENGTH = 120;

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("displayName" in body) ||
    typeof (body as { displayName: unknown }).displayName !== "string"
  ) {
    return NextResponse.json(
      { error: "displayName must be a string" },
      { status: 400 },
    );
  }

  const displayName = (body as { displayName: string }).displayName.trim();
  if (!displayName) {
    return NextResponse.json(
      { error: "Display name cannot be empty" },
      { status: 400 },
    );
  }
  if (displayName.length > MAX_LENGTH) {
    return NextResponse.json(
      { error: `Display name must be at most ${MAX_LENGTH} characters` },
      { status: 400 },
    );
  }

  await setDisplayName(userId, displayName);
  return NextResponse.json({ ok: true });
}
