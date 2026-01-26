import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Guild, GuildMember } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kick a user from the server')
  .addUserOption(opt => opt.setName('user').setDescription('User to kick').setRequired(true))
  .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick'))
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const target = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') ?? 'No reason provided';
  
  try {
    const guildMember = await interaction.guild?.members.fetch(target.id);
    await guildMember?.kick(reason);
    await interaction.reply({ content: `👢 Kicked **${target.tag}** | ${reason}`, ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: `❌ Failed to kick user`, ephemeral: true });
  }
}
