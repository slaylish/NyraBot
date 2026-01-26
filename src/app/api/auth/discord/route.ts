import { NextResponse } from 'next/server';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3498/api/auth/callback';

export async function GET() {
  const scope = 'identify guilds';
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;
  
  return NextResponse.redirect(authUrl);
}
