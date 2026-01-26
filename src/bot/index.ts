import { Client, GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🤖 Bot Service Starting...');

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('✅ Connected to MongoDB (Bot)'))
  .catch(err => console.error('❌ MongoDB Error:', err));

import { registerCommands, setupCommandHandlers } from './commands';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

let botGuildIds: string[] = [];

client.once('clientReady', () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
  console.log(`📊 Connected to ${client.guilds.cache.size} guilds`);
  botGuildIds = [...client.guilds.cache.keys()];
  registerCommands(client);
});

client.on('guildCreate', guild => {
  botGuildIds = [...client.guilds.cache.keys()];
});

client.on('guildDelete', guild => {
  botGuildIds = [...client.guilds.cache.keys()];
});

setupCommandHandlers(client);

client.login(process.env.DISCORD_TOKEN).catch(e => {
  console.error('❌ Login Failed:', e);
});

export function getBotGuildIds(): string[] {
  return botGuildIds;
}
