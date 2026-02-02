import { Client, ClientOptions, ApplicationCommandTypes } from 'oceanic.js';
import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import winston from 'winston';
import { Command } from './types';

export class OmniClient extends Client {
    public logger: winston.Logger;

    public commands: Map<string, Command> = new Map();

    constructor() {
        super({
            auth: `Bot ${process.env.BOT_TOKEN}`,
            gateway: {
                intents: [
                    'GUILDS',
                    'GUILD_MEMBERS',
                    'GUILD_MESSAGES',
                    'MESSAGE_CONTENT',
                    'GUILD_VOICE_STATES'
                ]
            }
        });

        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.cli(),
            transports: [new winston.transports.Console()]
        });

        this.on('ready', async () => {
            this.logger.info(`Logged in as ${this.user.tag}`);
            await this.registerCommands();
        });

        this.on('interactionCreate', async (interaction) => {
            if (interaction.type === 2) { // CommandInteraction
                 // @ts-ignore - Oceanic types can be tricky with raw interaction checks, casting safely later
                 const cmd = this.commands.get(interaction.data.name);
                 if (cmd) {
                     try {
                         // @ts-ignore
                         await cmd.execute(this, interaction);
                     } catch (err) {
                         this.logger.error(`Error executing command ${interaction.data.name}`, err);
                     }
                 }
            }
        });
    }

    public async start() {
        await this.connectDatabase();
        await this.loadModules();
        await this.connect();
    }


    private async connectDatabase() {
        try {
            await mongoose.connect(process.env.MONGO_URI as string);
            this.logger.info('Connected to MongoDB');
        } catch (error) {
            this.logger.error('Failed to connect to MongoDB', error);
            process.exit(1);
        }
    }

    private async loadModules() {
        const modulesPath = path.join(__dirname, '../modules');
        if (!fs.existsSync(modulesPath)) return;

        const modules = fs.readdirSync(modulesPath);
        for (const moduleName of modules) {
            const modulePath = path.join(modulesPath, moduleName);
            // Check if index.ts or index.js exists
            if (fs.existsSync(path.join(modulePath, 'index.ts')) || fs.existsSync(path.join(modulePath, 'index.js'))) {
                 try {
                    // Dynamic import
                    const mod = await import(modulePath);
                    if(mod.default && typeof mod.default.init === 'function') {
                        mod.default.init(this);
                        this.logger.info(`Loaded Module: ${moduleName}`);
                    }
                 } catch (err) {
                     this.logger.error(`Failed to load module ${moduleName}`, err);
                 }
            }
        }
    }

    private async registerCommands() {
        const commandsArray = Array.from(this.commands.values()).map(cmd => ({
            name: cmd.name,
            description: cmd.description,
            type: cmd.type,
            options: cmd.options
        }));

        if (commandsArray.length > 0) {
            try {
                this.logger.info(`Registering ${commandsArray.length} commands...`);
                // Bulk overwrite global commands
                await this.application.bulkEditGlobalCommands(commandsArray);
                this.logger.info('Commands Registered Successfully!');
            } catch (err) {
                this.logger.error('Failed to register commands', err);
            }
        }
    }
}

