import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { guildId, channelId, embed } = await request.json();
    const botToken = process.env.DISCORD_TOKEN;

    if (!botToken) {
      return NextResponse.json({ error: 'Bot not configured' }, { status: 500 });
    }

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID required' }, { status: 400 });
    }

    // Build Discord embed object
    const discordEmbed: any = {};
    
    if (embed.title) discordEmbed.title = embed.title;
    if (embed.description) discordEmbed.description = embed.description;
    if (embed.color) discordEmbed.color = parseInt(embed.color.replace('#', ''), 16);
    if (embed.footer) discordEmbed.footer = { text: embed.footer };
    if (embed.thumbnail) discordEmbed.thumbnail = { url: embed.thumbnail };
    if (embed.image) discordEmbed.image = { url: embed.image };
    if (embed.fields && embed.fields.length > 0) {
      discordEmbed.fields = embed.fields.filter((f: any) => f.name && f.value);
    }

    // Send to Discord
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [discordEmbed] }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Discord API error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send embed error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
