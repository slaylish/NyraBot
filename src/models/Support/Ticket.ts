import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true }, // e.g., "1042" from T-1042
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  userId: { type: String, required: true },
  subject: { type: String, default: 'No Subject' },
  type: { type: String, default: 'general' }, // billing, report, etc.
  status: { type: String, enum: ['Open', 'InProgress', 'Closed'], default: 'Open' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  claimedBy: { type: String }, // User ID of staff
  createdAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
  messages: [{
      authorId: String,
      content: String,
      attachments: [String],
      timestamp: { type: Date, default: Date.now },
      internal: { type: Boolean, default: false } // Staff notes
  }],
  tags: [String]
});

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
