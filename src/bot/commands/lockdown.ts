import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ChannelType, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('lockdown')
  .setDescription('Lock/unlock the current channel')
  .addBooleanOption(opt => opt.setName('lock').setDescription('True to lock, false to unlock').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction: ChatInputCommandInteraction) {
  const lock = interaction.options.getBoolean('lock', true);
  const channel = interaction.channel;
  
  if (channel?.type !== ChannelType.GuildText) {
    await interaction.reply({ content: '❌ This command only works in text channels', ephemeral: true });
    return;
  }

  try {
    await (channel as TextChannel).permissionOverwrites.edit(interaction.guild!.roles.everyone, {
      SendMessages: lock ? false : null
    });
    await interaction.reply({ content: lock ? '🔒 Channel locked' : '🔓 Channel unlocked', ephemeral: true });
  } catch (error) {
    await interaction.reply({ content: '❌ Failed to modify channel', ephemeral: true });
  }
}
