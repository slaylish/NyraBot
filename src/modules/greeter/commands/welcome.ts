import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes, Permissions } from 'oceanic.js';
import { GuildConfig } from '../models/GuildConfig';

export const Welcome: Command = {
    name: 'welcome',
    description: 'Configure welcome messages',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            name: 'set',
            description: 'Set the welcome channel',
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'channel',
                    description: 'The channel to send welcome messages to',
                    type: ApplicationCommandOptionTypes.CHANNEL,
                    required: true
                }
            ]
        },
        {
            name: 'msg',
            description: 'Set the welcome message',
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'text',
                    description: 'The message (supports {user}, {server})',
                    type: ApplicationCommandOptionTypes.STRING,
                    required: true
                }
            ]
        },
        {
            name: 'test',
            description: 'Test the welcome message',
            type: ApplicationCommandOptionTypes.SUB_COMMAND
        }
    ],
    execute: async (client, interaction) => {
        // Permission check
        if (!interaction.member?.permissions.has('MANAGE_GUILD')) {
             await interaction.createMessage({ content: 'You need Manage Guild permissions.', flags: 64 });
             return;
        }

        const subCommand = interaction.data.options.raw?.[0];
        if (!subCommand || !interaction.guildID) return;

        let config = await GuildConfig.findOne({ guildId: interaction.guildID });
        if (!config) {
            config = new GuildConfig({ guildId: interaction.guildID });
        }

        if (subCommand.name === 'set') {
             // @ts-ignore
             const channelId = subCommand.options[0].value;
             config.welcome.channelId = channelId;
             config.welcome.enabled = true;
             await config.save();
             await interaction.createMessage({ content: `Welcome channel set to <#${channelId}>` });
        } else if (subCommand.name === 'msg') {
             // @ts-ignore
             const msg = subCommand.options[0].value;
             config.welcome.message = msg;
             await config.save();
             await interaction.createMessage({ content: `Welcome message updated:\n${msg}` });
        } else if (subCommand.name === 'test') {
             // Simulate join
             const msg = config.welcome.message
                 .replace('{user}', `<@${interaction.user.id}>`)
                 .replace('{server}', interaction.guild?.name || 'Server');
             
             await interaction.createMessage({ content: `Test Welcome:\n${msg}` });
        }
    }
};
