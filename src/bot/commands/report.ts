import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import Report from '../../models/Support/Report';

export const data = new SlashCommandBuilder()
  .setName('report')
  .setDescription('Report a user to the moderation team.')
  .addUserOption(option => 
      option.setName('user')
      .setDescription('The user you want to report')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const targetUser = interaction.options.getUser('user');

  // Show a modal to get details
  const modal = new ModalBuilder()
      .setCustomId(`report_modal:${targetUser?.id}`)
      .setTitle(`Report ${targetUser?.username}`);

  const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel("What happened?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

  const evidenceInput = new TextInputBuilder()
      .setCustomId('evidence')
      .setLabel("Evidence (Links/URLs)")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

  const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reasonInput);
  const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(evidenceInput);

  modal.addComponents(firstActionRow, secondActionRow);

  await interaction.showModal(modal);
}
