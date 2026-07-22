/**
 * One-time helper: get a Spotify refresh token for Now Playing.
 *
 * 1. Create an app at https://developer.spotify.com/dashboard
 * 2. Edit Settings → Redirect URIs → add http://127.0.0.1:3456/callback
 * 3. Copy Client ID + Client Secret into .env.local (see .env.example)
 * 4. Run: npm run spotify-auth
 * 5. Open the printed URL, approve, then paste the refresh token into
 *    .env.local and Vercel → Project → Settings → Environment Variables
 */

import http from "node:http";
import { URL } from "node:url";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://127.0.0.1:3456/callback";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

if (!clientId || !clientSecret) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local",
  );
  process.exit(1);
}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", redirectUri);
authUrl.searchParams.set("scope", scopes);

console.log("\nOpen this URL in your browser:\n");
console.log(authUrl.toString());
console.log("\nWaiting for Spotify callback on", redirectUri, "...\n");

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url ?? "/", "http://127.0.0.1:3456");
    if (reqUrl.pathname !== "/callback") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const code = reqUrl.searchParams.get("code");
    const error = reqUrl.searchParams.get("error");

    if (error || !code) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(`Auth failed: ${error ?? "missing code"}`);
      server.close();
      process.exit(1);
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const json = await tokenRes.json();

    if (!tokenRes.ok || !json.refresh_token) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(
        `Token exchange failed: ${json.error_description ?? json.error ?? tokenRes.status}`,
      );
      server.close();
      process.exit(1);
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h1>Success</h1><p>Refresh token printed in your terminal. You can close this tab.</p>",
    );

    console.log("Add this to .env.local and Vercel env vars:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);

    server.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("Server error");
    server.close();
    process.exit(1);
  }
});

server.listen(3456, "127.0.0.1");
