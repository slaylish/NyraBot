import { CommandInteraction, Client } from 'oceanic.js';

export interface Command {
    name: string;
    description: string;
    type: number; // 1 for Slash Command
    options?: any[];
    execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

export interface Module {
    name: string;
    init: (client: Client) => void;
}
