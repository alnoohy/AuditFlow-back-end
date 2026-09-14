const AuditRequest = require("../models/auditRequest");

// create submission

const createSubmission = async (req, res) => {
  try {
    const auditRequest = await AuditRequest.findById(req.params.requestId);

    if (!auditRequest) {
      return res.status(404).json({ err: "Audit request not found." });
    }

    const newSubmission = {
      comments: req.body.comments,
      evidenceURL: req.body.evidenceURL,
      submittedBy: req.user._id,
      status: "pending review",
    };

    AuditRequest.push(newSubmission);
    AuditRequest.status = "under Review";

    //saving the new submission
    await AuditRequest.Save();

    const updatedAuditRequest = await AuditRequest.findById(auditRequest._id)
      .populate("createdBy", "username email role department")
      .populate("assignedTo", "username email role department")
      .populate("submissions.submittedBy", "username email role");

    res.status(201).json(updatedAuditRequest);
    //end of the creating
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateSubmission = async (req, res) => {
  try {
    const { requestId, submissionId } = req.params;

    const auditRequest = await AuditRequest.findById(submissionId);

    if (!auditRequest) {
      return res.status(404).json({ err: "Audit request not found " }); // Not Found error
    }

    const submission = auditRequest.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({ err: "Submission not found." }); // Not Found error
    }

    if (req.user.role === "employee") {
      if (submission.submittedBy.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ err: "you can only edit your own submission" }); // Not Authreized error (I think not sure)
      }
      if (req.body.comments) submission.comments = req.body.comments;
      if (req.body.evidenceUrl) submission.evidenceUrl = req.body.evidenceUrl;
    }

    if (req.user.role === "auditor" || req.user.role === "admin") {
      if (req.body.status) {
        submission.status = req.body.status;
        //sync the status
        if (req.body.status === "approved") {
          auditRequest.status = "completed";
        } else if (req.body.status === "rejected") {
          auditRequest.status = "rejected";
        } else if (req.body.status === "changes requested") {
          auditRequest.status = "pending"; // or back to employee
        }
      }
    }

    await auditRequest.save();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createSubmission,
};
