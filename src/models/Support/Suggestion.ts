import mongoose from 'mongoose';

const SuggestionSchema = new mongoose.Schema({
  suggestionId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true },
  userId: { type: String, required: true }, // Can be null if anonymous
  content: { type: String, required: true },
  channelId: { type: String }, // Discord channel message lives in
  messageId: { type: String },
  status: { type: String, enum: ['New', 'Approved', 'InProgress', 'Implemented', 'Rejected'], default: 'New' },
  votes: {
      up: { type: Number, default: 0 },
      down: { type: Number, default: 0 },
      voters: [String] // Prevent double voting
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema);
