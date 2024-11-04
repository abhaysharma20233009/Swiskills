const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  requestedSkills: [{ type: String }],
  approvedByUser1: {
    type: Boolean,
    default: false,
  },
  approvedByUser2: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'complete'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

swapSchema.pre('save', function (next) {
  if (this.approvedByUser1 && this.approvedByUser2) {
    this.status = 'complete';
    this.updatedAt = Date.now();
  }
  next();
});

const Swap = mongoose.model('Swap', swapSchema);
module.exports = Swap;
