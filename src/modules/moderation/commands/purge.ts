import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from 'oceanic.js';

export const Purge: Command = {
    name: 'purge',
    description: 'Bulk delete messages',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        { name: 'amount', description: 'Number of messages to delete', type: ApplicationCommandOptionTypes.INTEGER, required: true }
    ],
    execute: async (client, interaction) => {
        if (!interaction.guildID || !interaction.member?.permissions.has('MANAGE_MESSAGES')) {
             await interaction.createMessage({ content: 'You are missing MANAGE_MESSAGES permission.', flags: 64 });
             return;
        }

         // @ts-ignore
        const amount = interaction.data.options.raw?.[0].value as number;
        if (amount < 1 || amount > 100) {
            await interaction.createMessage({ content: 'Amount must be between 1 and 100.', flags: 64 });
            return;
        }

        try {
            await client.rest.channels.deleteMessages(interaction.channelID, amount);
            await interaction.createMessage({ content: `Deleted ${amount} messages.`, flags: 64 });
        } catch (err) {
            await interaction.createMessage({ content: `Failed to purge messages.`, flags: 64 });
        }
    }
};
