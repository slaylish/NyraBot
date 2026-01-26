import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ChannelType, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('slowmode')
  .setDescription('Set channel slowmode')
  .addIntegerOption(opt => opt.setName('seconds').setDescription('Slowmode duration (0 to disable)').setRequired(true).setMinValue(0).setMaxValue(21600))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction: ChatInputCommandInteraction) {
  const seconds = interaction.options.getInteger('seconds', true);
  const channel = interaction.channel;
  
  if (channel?.type !== ChannelType.GuildText) {
    await interaction.reply({ content: '❌ This command only works in text channels', ephemeral: true });
    return;
  }

  try {
    await (channel as TextChannel).setRateLimitPerUser(seconds);
    await interaction.reply({ 
      content: seconds === 0 ? '⏱️ Slowmode disabled' : `⏱️ Slowmode set to ${seconds}s`, 
      ephemeral: true 
    });
  } catch (error) {
    await interaction.reply({ content: '❌ Failed to set slowmode', ephemeral: true });
  }
}
