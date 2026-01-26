import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/bot'; // Import the running bot client instance
import { TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export async function POST(req: NextRequest) {
  try {
     const body = await req.json();
     const { guildId, channelId, embed, components } = body;

     // 1. Get Guild & Channel
     const guild = client.guilds.cache.get(guildId);
     if (!guild) return NextResponse.json({ error: 'Bot not in guild' }, { status: 404 });

     const channel = guild.channels.cache.get(channelId) as TextChannel;
     if (!channel) return NextResponse.json({ error: 'Channel not found' }, { status: 404 });

     // 2. Construct Discord Message Payload
     const discordEmbed = new EmbedBuilder()
         .setTitle(embed.title)
         .setDescription(embed.description)
         .setColor(embed.color || '#5865f2');
     
     if (embed.footer) discordEmbed.setFooter({ text: embed.footer });
     // ... add other fields

     // Mock Component Reconstruction (simplified)
     const row = new ActionRowBuilder<ButtonBuilder>()
         .addComponents(
             new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('Create Ticket')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('📩')
         );

     // 3. Send
     await channel.send({ embeds: [discordEmbed], components: [row] });

     return NextResponse.json({ success: true });
  } catch (error) {
     console.error('Failed to deploy panel:', error);
     return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
