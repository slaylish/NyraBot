import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  guildId: { type: String, required: true },
  reporterId: { type: String, required: true }, // Encrypted or just displayed anonymously
  targetId: { type: String }, // User being reported
  content: { type: String, required: true },
  evidence: [String], // URLs
  status: { type: String, enum: ['New', 'Investigating', 'Resolved', 'Dismissed'], default: 'New' },
  validity: { type: String, enum: ['Helpful', 'Neutral', 'FalseAlarm', 'Malicious'] },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
