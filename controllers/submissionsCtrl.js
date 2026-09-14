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

module.exports = {
  createSubmission,
};
