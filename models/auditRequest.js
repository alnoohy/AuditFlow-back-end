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

const workspaceReviewSchema = new mongoose.Schema(
  {
    relevant: {
      type: Boolean,
      default: true,
    },

    reliable: {
      type: Boolean,
      default: true,
    },

    sufficient: {
      type: Boolean,
      default: false,
    },

    objective: {
      type: String,
      default: "",
    },

    procedure: {
      type: String,
      default: "",
    },

    result: {
      type: String,
      enum: ["", "pass", "exception", "more-evidence"],
      default: "",
    },

    evidenceNote: {
      type: String,
      default: "",
    },

    finding: {
      type: String,
      default: "",
    },

    conclusion: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const workspaceBalanceSchema = new mongoose.Schema(
  {
    glBalance: {
      type: Number,
      default: 0,
    },

    supportingBalance: {
      type: Number,
      default: 0,
    },

    threshold: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const workspaceNoteSchema = new mongoose.Schema(
  {
    noteId: {
      type: Number,
      required: true,
    },

    author: {
      type: String,
      default: "Auditor",
    },

    text: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const workspaceEvidenceSchema = new mongoose.Schema(
  {
    evidenceId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["approved", "submitted", "requested", "rejected"],
      default: "submitted",
    },

    version: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const workspaceSchema = new mongoose.Schema(
  {
    review: {
      type: workspaceReviewSchema,
      default: () => ({}),
    },

    balances: {
      type: workspaceBalanceSchema,
      default: () => ({}),
    },

    notes: {
      type: [workspaceNoteSchema],
      default: [],
    },

    evidence: {
      type: [workspaceEvidenceSchema],
      default: [],
    },

    selectedEvidenceId: {
      type: Number,
      default: null,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  },
);

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    submissions: [submissionSchema],

    workspace: {
      type: workspaceSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  },
);

const AuditRequest = mongoose.model("AuditRequest", auditRequestSchema);

module.exports = AuditRequest;