const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  sowFileName: {
    type: String,
    required: true,
  },
  vendorAnalyses: [{
    vendorName: {
      type: String,
      required: true,
    },
    positives: [{
      point: String,
      reason: String,
    }],
    negatives: [{
      point: String,
      reason: String,
    }],
    completionScore: {
      type: Number,
      required: true,
    },
    scoreReasoning: {
      type: String,
      required: true,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
