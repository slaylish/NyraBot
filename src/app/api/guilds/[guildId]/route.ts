import { NextRequest, NextResponse } from 'next/server';

// GET /api/guilds/[guildId] - Get guild info and stats
export async function GET(
  request: NextRequest,
  { params }: { params: { guildId: string } }
) {
  const { guildId } = params;
  const botToken = process.env.DISCORD_TOKEN;

  if (!botToken) {
    return NextResponse.json({ 
      guild: { name: 'Unknown Server', icon: null, memberCount: 0, isPremium: false, region: 'Unknown' },
      stats: { actions: 0, tickets: 0, members: 0 }
    });
  }

  try {
    // Fetch guild info from Discord using bot token
    const guildRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      // Add cache control
      next: { revalidate: 60 }
    });

    if (!guildRes.ok) {
      const errorText = await guildRes.text();
      console.error('Failed to fetch guild:', guildRes.status, errorText);
      return NextResponse.json({ 
        guild: { name: 'Unknown Server', icon: null, memberCount: 0, isPremium: false, region: 'Unknown' },
        stats: { actions: 0, tickets: 0, members: 0 }
      });
    }

    const guildData = await guildRes.json();

    // Get region from preferred_locale or default
    const regionMap: Record<string, string> = {
      'en-US': 'US',
      'en-GB': 'UK',
      'de': 'DE',
      'fr': 'FR',
      'es-ES': 'ES',
      'ja': 'JP',
    };

    const region = regionMap[guildData.preferred_locale] || guildData.preferred_locale?.split('-')[0]?.toUpperCase() || 'Auto';

    // TODO: Fetch actual stats from MongoDB
    const stats = {
      actions: 0,
      tickets: 0,
      members: guildData.approximate_member_count || 0,
    };

    return NextResponse.json({
      guild: {
        name: guildData.name,
        icon: guildData.icon,
        memberCount: guildData.approximate_member_count || 0,
        isPremium: false, // TODO: Check premium status from DB
        region,
      },
      stats,
    });

  } catch (error) {
    console.error('Error fetching guild:', error);
    return NextResponse.json({ 
      guild: { name: 'Unknown', icon: null, memberCount: 0, isPremium: false, region: 'Unknown' },
      stats: { actions: 0, tickets: 0, members: 0 }
    });
  }
}
