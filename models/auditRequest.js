const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
      required: true,
    },

    evidenceUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending review", "approved", "rejected", "changes requested"],
      default: "pending review",
    },
    submittedBy: {
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

const auditRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "under review", "completed", "rejected", "overdue"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    deadline: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: {
      type: String,
      ref: "Department",
      required: true,
    },

    submissions: [submissionSchema],
  },
  {
    timestamps: true,
  },
);

const AuditRequest = mongoose.model("AuditRequest", auditRequestSchema);

module.exports = AuditRequest;
