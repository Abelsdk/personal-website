import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const track = await getNowPlaying();

    if (!track) {
      return NextResponse.json(
        { configured: Boolean(process.env.SPOTIFY_REFRESH_TOKEN), track: null },
        { status: 200 },
      );
    }

    return NextResponse.json({ configured: true, track });
  } catch {
    return NextResponse.json(
      { configured: false, track: null },
      { status: 200 },
    );
  }
}
