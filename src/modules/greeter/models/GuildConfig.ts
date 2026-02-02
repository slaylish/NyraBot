import mongoose, { Schema, Document } from 'mongoose';

export interface IGuildConfig extends Document {
    guildId: string;
    welcome: {
        enabled: boolean;
        channelId: string;
        message: string;
        roleId: string;
    };
}

const GuildConfigSchema: Schema = new Schema({
    guildId: { type: String, required: true, unique: true },
    welcome: {
        enabled: { type: Boolean, default: false },
        channelId: { type: String, default: '' },
        message: { type: String, default: 'Welcome {user} to {server}!' },
        roleId: { type: String, default: '' }
    }
});

export const GuildConfig = mongoose.model<IGuildConfig>('GuildConfig', GuildConfigSchema);
