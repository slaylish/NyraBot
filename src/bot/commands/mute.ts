import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('mute')
  .setDescription('Timeout a user')
  .addUserOption(opt => opt.setName('user').setDescription('User to mute').setRequired(true))
  .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in minutes').setRequired(true))
  .addStringOption(opt => opt.setName('reason').setDescription('Reason for mute'))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const target = interaction.options.getUser('user', true);
  const duration = interaction.options.getInteger('duration', true);
  const reason = interaction.options.getString('reason') ?? 'No reason provided';
  
  try {
    const guildMember = await interaction.guild?.members.fetch(target.id);
    await guildMember?.timeout(duration * 60 * 1000, reason);
    await interaction.reply({ content: `🤐 Muted **${target.tag}** for ${duration} minutes | ${reason}`, ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: `❌ Failed to mute user`, ephemeral: true });
  }
}
