import mongoose, { Schema, Document } from 'mongoose';

export interface IModCase extends Document {
    guildId: string;
    caseId: number;
    targetId: string;
    moderatorId: string;
    type: string;
    reason: string;
    timestamp: Date;
}

const ModCaseSchema: Schema = new Schema({
    guildId: { type: String, required: true },
    caseId: { type: Number, required: true },
    targetId: { type: String, required: true },
    moderatorId: { type: String, required: true },
    type: { type: String, required: true }, // "BAN", "KICK", "WARN"
    reason: { type: String, default: "No reason provided" },
    timestamp: { type: Date, default: Date.now }
});

export const ModCase = mongoose.model<IModCase>('ModCase', ModCaseSchema);
