import { Command } from '../../../../core/types';
import { ApplicationCommandTypes } from 'oceanic.js';

export const ServerInfo: Command = {
    name: 'server',
    description: 'Get information about the server',
    type: ApplicationCommandTypes.CHAT_INPUT,
    execute: async (client, interaction) => {
        if (!interaction.guild) return;

        const guild = interaction.guild;
        const owner = await client.users.get(guild.ownerID);
        
        await interaction.createMessage({
            embeds: [{
                title: guild.name,
                thumbnail: { url: guild.iconURL() || '' },
                fields: [
                    { name: 'Owner', value: owner ? owner.username : 'Unknown', inline: true },
                    { name: 'Members', value: guild.memberCount.toString(), inline: true },
                    { name: 'Created At', value: new Date(guild.createdAt).toLocaleDateString(), inline: true },
                    { name: 'ID', value: guild.id, inline: true }
                ],
                color: 0x7289da
            }]
        });
    }
};
