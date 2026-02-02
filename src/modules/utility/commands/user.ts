import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from 'oceanic.js';

export const UserInfo: Command = {
    name: 'user',
    description: 'Get information about a user',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            name: 'target',
            description: 'The user to get info for',
            type: ApplicationCommandOptionTypes.USER,
            required: false
        }
    ],
    execute: async (client, interaction) => {
        // @ts-ignore
        const user = interaction.data.options.raw?.[0]?.value ? await client.users.get(interaction.data.options.raw[0].value) : interaction.user;
        
        if (!user) return;

        await interaction.createMessage({
            embeds: [{
                title: user.username,
                thumbnail: { url: user.avatarURL() },
                fields: [
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'Created At', value: new Date(user.createdAt).toLocaleDateString(), inline: true },
                    { name: 'Bot?', value: user.bot ? 'Yes' : 'No', inline: true }
                ],
                color: 0x7289da
            }]
        });
    }
};
