import { Client, REST, Routes, Collection, ChatInputCommandInteraction } from 'discord.js';
import * as kick from './commands/kick';
import * as ban from './commands/ban';
import * as mute from './commands/mute';
import * as warn from './commands/warn';
import * as lockdown from './commands/lockdown';
import * as slowmode from './commands/slowmode';
import * as ping from './commands/ping';

// Command interface
interface Command {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Load all commands
const commands: Collection<string, Command> = new Collection();
const commandModules = [kick, ban, mute, warn, lockdown, slowmode, ping];

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
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({ content: 'Unknown command', ephemeral: true });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`, error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '❌ Error executing command', ephemeral: true });
      } else {
        await interaction.reply({ content: '❌ Error executing command', ephemeral: true });
      }
    }
  });
}

// Export bot guild IDs for API
export function getBotGuildIds(client: Client): string[] {
  return [...client.guilds.cache.keys()];
}
