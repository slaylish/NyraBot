import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Ban a user from the server')
  .addUserOption(opt => opt.setName('user').setDescription('User to ban').setRequired(true))
  .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban'))
  .addIntegerOption(opt => opt.setName('days').setDescription('Days of messages to delete').setMinValue(0).setMaxValue(7))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const target = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') ?? 'No reason provided';
  const days = interaction.options.getInteger('days') ?? 0;
  
  try {
    await interaction.guild?.members.ban(target, { deleteMessageDays: days, reason });
    await interaction.reply({ content: `🔨 Banned **${target.tag}** | ${reason}`, ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: `❌ Failed to ban user`, ephemeral: true });
  }
}
