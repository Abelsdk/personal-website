"use client";

import { useEffect, useState } from "react";

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string;
};

type SpotifyResponse = {
  configured: boolean;
  track: Track | null;
};

export function NowPlaying() {
  const [data, setData] = useState<SpotifyResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) return;
        const json = (await res.json()) as SpotifyResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ configured: false, track: null });
      }
    }

    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  if (!data?.track) {
    return null;
  }

  const { track } = data;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex max-w-md items-center gap-3 border border-foreground/10 px-3 py-2.5 transition-colors hover:border-foreground/30"
    >
      {track.albumImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={track.albumImageUrl}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 object-cover"
        />
      ) : (
        <div className="h-10 w-10 shrink-0 bg-foreground/10" />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-widest uppercase opacity-45">
          {track.isPlaying ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              Now playing
            </span>
          ) : (
            "Last played"
          )}
        </p>
        <p className="truncate text-sm font-medium tracking-tight group-hover:underline group-hover:underline-offset-4">
          {track.title}
        </p>
        <p className="truncate text-xs opacity-55">{track.artist}</p>
      </div>
    </a>
  );
}
