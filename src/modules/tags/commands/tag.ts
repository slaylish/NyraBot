import { Command } from '../../../../core/types';
import { ApplicationCommandTypes, ApplicationCommandOptionTypes } from 'oceanic.js';
import { Tag } from '../models/Tag';

export const TagCmd: Command = {
    name: 'tag',
    description: 'Manage custom tags',
    type: ApplicationCommandTypes.CHAT_INPUT,
    options: [
        {
            name: 'create',
            description: 'Create a new tag',
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                { name: 'name', description: 'Tag name', type: ApplicationCommandOptionTypes.STRING, required: true },
                { name: 'content', description: 'Tag content', type: ApplicationCommandOptionTypes.STRING, required: true }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a tag',
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                { name: 'name', description: 'Tag name', type: ApplicationCommandOptionTypes.STRING, required: true }
            ]
        },
        {
            name: 'show',
            description: 'Show a tag',
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                { name: 'name', description: 'Tag name', type: ApplicationCommandOptionTypes.STRING, required: true }
            ]
        },
        {
            name: 'list',
            description: 'List all tags',
            type: ApplicationCommandOptionTypes.SUB_COMMAND
        }
    ],
    execute: async (client, interaction) => {
         const subCommand = interaction.data.options.raw?.[0];
         if (!subCommand || !interaction.guildID) return;

         if (subCommand.name === 'create') {
             if (!interaction.member?.permissions.has('MANAGE_MESSAGES')) {
                 await interaction.createMessage({ content: 'You need Manage Messages permissions.', flags: 64 });
                 return;
             }
             // @ts-ignore
             const name = subCommand.options[0].value;
             // @ts-ignore
             const content = subCommand.options[1].value;
             
             try {
                 await Tag.create({
                     guildId: interaction.guildID,
                     name,
                     content,
                     createdBy: interaction.user.id
                 });
                 await interaction.createMessage({ content: `Tag \`${name}\` created.` });
             } catch (e) {
                 await interaction.createMessage({ content: `Tag \`${name}\` already exists.` });
             }

         } else if (subCommand.name === 'delete') {
            if (!interaction.member?.permissions.has('MANAGE_MESSAGES')) {
                 await interaction.createMessage({ content: 'You need Manage Messages permissions.', flags: 64 });
                 return;
             }
             // @ts-ignore
             const name = subCommand.options[0].value;
             const result = await Tag.deleteOne({ guildId: interaction.guildID, name });
             
             if (result.deletedCount > 0) {
                 await interaction.createMessage({ content: `Tag \`${name}\` deleted.` });
             } else {
                 await interaction.createMessage({ content: `Tag \`${name}\` not found.` });
             }
             
         } else if (subCommand.name === 'show') {
             // @ts-ignore
             const name = subCommand.options[0].value;
             const tag = await Tag.findOne({ guildId: interaction.guildID, name });
             
             if (tag) {
                 await interaction.createMessage({ content: tag.content });
             } else {
                 await interaction.createMessage({ content: `Tag \`${name}\` not found.` });
             }
             
         } else if (subCommand.name === 'list') {
             const tags = await Tag.find({ guildId: interaction.guildID }).select('name');
             if (tags.length === 0) {
                 await interaction.createMessage({ content: 'No tags found.' });
             } else {
                 const tagList = tags.map(t => `\`${t.name}\``).join(', ');
                 await interaction.createMessage({ content: `Tags: ${tagList}` });
             }
         }
    }
};
