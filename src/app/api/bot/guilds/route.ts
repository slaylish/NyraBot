import { NextResponse } from 'next/server';

// This endpoint returns bot's guild IDs
// In production, this would be fetched from the bot process or a shared cache (Redis)
// For now, we'll fetch directly from MongoDB where we can store guild data

export async function GET() {
  // The bot process caches guild IDs - we need to share this data
  // Options: 1) Shared Redis cache, 2) MongoDB collection, 3) Internal API call
  
  // For now, we fetch from Discord API using bot token
  const botToken = process.env.DISCORD_TOKEN;
  
  if (!botToken) {
    return NextResponse.json({ guilds: [] });
  }

  try {
    // Use bot token to get guilds (this is a workaround - in production use proper caching)
    const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch bot guilds:', await res.text());
      return NextResponse.json({ guilds: [] });
    }

    const guilds = await res.json();
    const guildIds = guilds.map((g: any) => g.id);
    
    return NextResponse.json({ guilds: guildIds });
  } catch (error) {
    console.error('Error fetching bot guilds:', error);
    return NextResponse.json({ guilds: [] });
  }
}
