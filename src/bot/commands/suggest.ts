import { SlashCommandBuilder, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('suggest')
  .setDescription('Submit a suggestion for the server.');

export async function execute(interaction: ChatInputCommandInteraction) {
  const modal = new ModalBuilder()
      .setCustomId('suggestion_modal')
      .setTitle('Submit Suggestion');

  const suggestionInput = new TextInputBuilder()
      .setCustomId('content')
      .setLabel("What's your idea?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

  const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(suggestionInput);

  modal.addComponents(firstActionRow);

  await interaction.showModal(modal);
}
