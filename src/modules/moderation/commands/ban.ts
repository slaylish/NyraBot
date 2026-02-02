import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from 'oceanic.js';
import { ModCase } from '../models/ModCase';

export const Ban: Command = {
    name: 'ban',
    description: 'Ban a member from the server',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        { name: 'user', description: 'User to ban', type: ApplicationCommandOptionTypes.USER, required: true },
        { name: 'reason', description: 'Reason for ban', type: ApplicationCommandOptionTypes.STRING, required: false },
        { name: 'days', description: 'Days of messages to delete (0-7)', type: ApplicationCommandOptionTypes.INTEGER, required: false }
    ],
    execute: async (client, interaction) => {
        if (!interaction.guildID || !interaction.member?.permissions.has('BAN_MEMBERS')) {
             await interaction.createMessage({ content: 'You are missing BAN_MEMBERS permission.', flags: 64 });
             return;
        }

        // @ts-ignore
        const userId = interaction.data.options.raw?.[0].value as string;
        // @ts-ignore
        const reason = interaction.data.options.raw?.[1]?.value as string || 'No reason provided';
        // @ts-ignore
        const deleteDays = interaction.data.options.raw?.[2]?.value || 0;
        
        try {
            await client.rest.guilds.createBan(interaction.guildID, userId, { reason, deleteMessageSeconds: deleteDays * 86400 });
            
            const count = await ModCase.countDocuments({ guildId: interaction.guildID });
            await ModCase.create({
                guildId: interaction.guildID,
                caseId: count + 1,
                targetId: userId,
                moderatorId: interaction.user.id,
                type: 'BAN',
                reason: reason
            });

            await interaction.createMessage({ content: `🔨 Banned <@${userId}> | Case #${count + 1}\nReason: ${reason}` });
        } catch (err) {
            await interaction.createMessage({ content: `Failed to ban user.`, flags: 64 });
        }
    }
};
