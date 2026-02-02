import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    guildId: string;
    name: string;
    content: string;
    createdBy: string;
    createdAt: Date;
}

const TagSchema: Schema = new Schema({
    guildId: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

TagSchema.index({ guildId: 1, name: 1 }, { unique: true });

export const Tag = mongoose.model<ITag>('Tag', TagSchema);
