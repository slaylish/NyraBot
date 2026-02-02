import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from 'oceanic.js';
import { ModCase } from '../models/ModCase';

export const Kick: Command = {
    name: 'kick',
    description: 'Kick a member from the server',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        { name: 'user', description: 'User to kick', type: ApplicationCommandOptionTypes.USER, required: true },
        { name: 'reason', description: 'Reason for kick', type: ApplicationCommandOptionTypes.STRING, required: false }
    ],
    execute: async (client, interaction) => {
        if (!interaction.guildID || !interaction.member?.permissions.has('KICK_MEMBERS')) {
             await interaction.createMessage({ content: 'You are missing KICK_MEMBERS permission.', flags: 64 });
             return;
        }

        // @ts-ignore
        const userId = interaction.data.options.raw?.[0].value as string;
        // @ts-ignore
        const reason = interaction.data.options.raw?.[1]?.value as string || 'No reason provided';
        
        try {
            await client.rest.guilds.removeMember(interaction.guildID, userId, reason);
            
            // Create Mod Case
            const count = await ModCase.countDocuments({ guildId: interaction.guildID });
            await ModCase.create({
                guildId: interaction.guildID,
                caseId: count + 1,
                targetId: userId,
                moderatorId: interaction.user.id,
                type: 'KICK',
                reason: reason
            });

            await interaction.createMessage({ content: `✅ Kicked <@${userId}> | Case #${count + 1}\nReason: ${reason}` });
        } catch (err) {
            await interaction.createMessage({ content: `Failed to kick user. Ensure my role is higher than theirs.`, flags: 64 });
        }
    }
};
