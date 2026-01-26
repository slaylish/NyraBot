import mongoose from 'mongoose';

const AppealSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  infractionId: { type: String }, // Links to the Ban infraction
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Denied'], default: 'Pending' },
  snapshot: {
      infractions: [Object], // Warns, Kicks history
      chatLogs: [{
          content: String,
          timestamp: Date,
          channelId: String
      }]
  },
  resolution: {
      by: String, // Staff ID
      note: String,
      at: Date
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Appeal || mongoose.model('Appeal', AppealSchema);
