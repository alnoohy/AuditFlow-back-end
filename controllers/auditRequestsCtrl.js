const AuditRequest = require('../models/auditRequest');

const index = async (req, res) => {
  try {
    const filter = {};

    if (req.user.role === 'employee') {
      filter.assignedTo = req.user._id;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

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
      )
      .populate(
        'department',
        'name'
      )
      .populate(
        'submissions.submittedBy',
        'username email role'
      );

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
      )
      .populate(
        'department',
        'name'
      )
      .populate(
        'submissions.submittedBy',
        'username email role'
      );

    if (!auditRequest) {
      return res.status(404).json({
        err: 'Audit request not found.',
      });
    }

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

const update = async (req, res) => {
  try {
    if (req.user.role !== 'auditor') {
      return res.status(403).json({
        err: 'Only auditors can update audit requests.',
      });
    }

    delete req.body.createdBy;

    const updatedAuditRequest =
      await AuditRequest.findByIdAndUpdate(
        req.params.requestId,
        req.body,
        {
          returnDocument: 'after',
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