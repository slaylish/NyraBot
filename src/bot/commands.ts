import { Client, REST, Routes, Collection, ChatInputCommandInteraction } from 'discord.js';
import * as kick from './commands/kick';
import * as ban from './commands/ban';
import * as mute from './commands/mute';
import * as warn from './commands/warn';
import * as lockdown from './commands/lockdown';
import * as slowmode from './commands/slowmode';
import * as ping from './commands/ping';
import * as report from './commands/report';
import * as suggest from './commands/suggest';

// Command interface
interface Command {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Load all commands
const commands: Collection<string, Command> = new Collection();
const commandModules = [kick, ban, mute, warn, lockdown, slowmode, ping, report, suggest];

for (const cmd of commandModules) {
  commands.set(cmd.data.name, cmd as Command);
}

export async function registerCommands(client: Client) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  const commandData = commandModules.map(cmd => cmd.data.toJSON());

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commandData }
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

export function setupCommandHandlers(client: Client) {
  client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
       const command = commands.get(interaction.commandName);
       if (!command) {
         await interaction.reply({ content: 'Unknown command', ephemeral: true });
         return;
       }
   
       try {
         await command.execute(interaction);
       } catch (error) {
         console.error(`Error executing ${interaction.commandName}:`, error);
         const payload = { content: '❌ Error executing command', ephemeral: true };
         if (interaction.replied || interaction.deferred) await interaction.followUp(payload);
         else await interaction.reply(payload);
       }
    } else if (interaction.isModalSubmit()) {
        const { customId } = interaction;
        
        if (customId.startsWith('report_modal')) {
            const reason = interaction.fields.getTextInputValue('reason');
            // Logic to save Report to DB would go here
            await interaction.reply({ content: '✅ Report submitted successfully. Staff will review it shortly.', ephemeral: true });
        } else if (customId === 'suggestion_modal') {
             const suggestion = interaction.fields.getTextInputValue('content');
             // Logic to save Suggestion to DB
             await interaction.reply({ content: '✅ Suggestion submitted!', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === 'create_ticket') {
             // Logic to create ticket
            await interaction.reply({ content: '🎟️ Creating your ticket...', ephemeral: true });
            
            // Mock: Create a channel (In real app, use interaction.guild.channels.create)
            // Save to DB (Ticket model)
            
            await interaction.followUp({ content: '✅ Ticket #1234 created! <#channel_id>', ephemeral: true });
        }
    }
  });
}

// Export bot guild IDs for API
export function getBotGuildIds(client: Client): string[] {
  return [...client.guilds.cache.keys()];
}
