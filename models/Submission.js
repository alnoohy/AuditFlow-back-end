const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
      required: true,
    },

    evidenceURL: {
      type: String,
      required: true,
    },

    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamp: { createdAt: "submittedAt", updatedAt: false },
  },
);

module.exports = submissionSchema;
