import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';
import Infraction from '../models/Infraction';

export const data = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Issue a warning to a user')
  .addUserOption(opt => opt.setName('user').setDescription('User to warn').setRequired(true))
  .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const target = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason', true);
  
  try {
    // Save to database
    await Infraction.create({
      guildId: interaction.guildId,
      odId: target.id,
      action: 'WARN',
      reason,
      moderatorId: interaction.user.id,
    });

    await interaction.reply({ content: `⚠️ Warned **${target.tag}** | ${reason}`, ephemeral: true });
  } catch (error) {
    console.error('Warn error:', error);
    await interaction.reply({ content: `❌ Failed to warn user`, ephemeral: true });
  }
}
