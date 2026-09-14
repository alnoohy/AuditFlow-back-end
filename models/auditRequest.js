const mongoose = require("mongoose");

//const submissionSchema = require('./submission');

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
      required: true,
    },

    //submissions: [submissionSchema];
  },
  {
    timestamps: true,
  },
);

const AuditRequest = mongoose.model("AuditRequest", auditRequestSchema);

module.exports = AuditRequest;
