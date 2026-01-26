import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check bot latency');

export async function execute(interaction: ChatInputCommandInteraction) {
  const latency = interaction.client.ws.ping;
  await interaction.reply({ 
    content: `🏓 Pong! Latency: **${latency}ms**`,
  });
}
