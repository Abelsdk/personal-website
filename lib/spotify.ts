const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type SpotifyTrack = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
};

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken };
}

async function getAccessToken() {
  const creds = getCredentials();
  if (!creds) return null;

  const basic = Buffer.from(
    `${creds.clientId}:${creds.clientSecret}`,
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: creds.refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as { access_token?: string };
  return json.access_token ?? null;
}

function mapTrack(
  track: {
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
    external_urls: { spotify: string };
  },
  isPlaying: boolean,
): SpotifyTrack {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
  };
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  if (!getCredentials()) {
    return null;
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return null;
  }

  const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  // 204 = nothing playing right now
  if (nowPlayingRes.status === 204) {
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!recentRes.ok) return null;

    const recent = (await recentRes.json()) as {
      items?: { track: Parameters<typeof mapTrack>[0] }[];
    };
    const track = recent.items?.[0]?.track;
    if (!track) return null;
    return mapTrack(track, false);
  }

  if (!nowPlayingRes.ok) {
    return null;
  }

  const data = (await nowPlayingRes.json()) as {
    is_playing?: boolean;
    item?: Parameters<typeof mapTrack>[0] | null;
    currently_playing_type?: string;
  };

  if (!data.item || data.currently_playing_type !== "track") {
    return null;
  }

  return mapTrack(data.item, Boolean(data.is_playing));
}
