import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, CommandInteraction, MessageFlags } from 'oceanic.js';

export const Ping: Command = {
    name: 'ping',
    description: 'Check the bot\'s latency',
    type: ApplicationCommandTypes.CHAT_INPUT,
    execute: async (client, interaction) => {
        const start = Date.now();
        await interaction.defer();
        const end = Date.now();
        
        await interaction.createFollowup({
            content: `Pong! 🏓\nLatency: ${end - start}ms\nShard: ${interaction.guild?.shard.latency}ms`
        });
    }
};
