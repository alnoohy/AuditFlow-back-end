const AuditRequest = require('../models/auditRequest');

// GET the audit request
const index = async (req, res) => {
  try {
    const filter = {};

    // Employees only see requests assigned to them
    if (req.user.role === 'employee') {
      filter.assignedTo = req.user._id;
    }

    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by priority
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    // Filter by department
    if (req.query.department) {
      filter.department = req.query.department;
    }

    let auditRequests = await AuditRequest.find(filter)
      .populate(
        'createdBy',
        'username email role department'
      )
      .populate(
        'assignedTo',
        'username email role department'
      );

    // Search by title
    if (req.query.search) {
      const searchText = req.query.search.toLowerCase();

      auditRequests = auditRequests.filter((auditRequest) =>
        auditRequest.title
          .toLowerCase()
          .includes(searchText)
      );
    }

    res.status(200).json(auditRequests);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};


// POST by audit requests
const create = async (req, res) => {
  try {
    if (req.user.role !== 'auditor') {
      return res.status(403).json({
        err: 'Only auditors can create audit requests.',
      });
    }

    req.body.createdBy = req.user._id;

    const auditRequest = await AuditRequest.create(
      req.body
    );

    res.status(201).json(auditRequest);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};


// GET /audit-requests/:requestId
const show = async (req, res) => {
  try {
    const auditRequest = await AuditRequest.findById(
      req.params.requestId
    )
      .populate(
        'createdBy',
        'username email role department'
      )
      .populate(
        'assignedTo',
        'username email role department'
      );

    if (!auditRequest) {
      return res.status(404).json({
        err: 'Audit request not found.',
      });
    }

    // Employees can only view requests assigned to them
    if (
      req.user.role === 'employee' &&
      auditRequest.assignedTo._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        err: 'You do not have access to this audit request.',
      });
    }

    res.status(200).json(auditRequest);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};


// PUT /audit-requests/:requestId
const update = async (req, res) => {
  try {
    if (req.user.role !== 'auditor') {
      return res.status(403).json({
        err: 'Only auditors can update audit requests.',
      });
    }

    // Do not allow createdBy to be changed
    delete req.body.createdBy;

    const updatedAuditRequest =
      await AuditRequest.findByIdAndUpdate(
        req.params.requestId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedAuditRequest) {
      return res.status(404).json({
        err: 'Audit request not found.',
      });
    }

    res.status(200).json(updatedAuditRequest);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};


// DELETE /audit-requests/:requestId
const deleteAuditRequest = async (req, res) => {
  try {
    if (req.user.role !== 'auditor') {
      return res.status(403).json({
        err: 'Only auditors can delete audit requests.',
      });
    }

    const deletedAuditRequest =
      await AuditRequest.findByIdAndDelete(
        req.params.requestId
      );

    if (!deletedAuditRequest) {
      return res.status(404).json({
        err: 'Audit request not found.',
      });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};


module.exports = {
  index,
  create,
  show,
  update,
  deleteAuditRequest,
};