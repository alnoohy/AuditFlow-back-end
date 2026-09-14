const express = require('express');

const router = express.Router();

const isSignedIn = require('../middleware/isSignedIn');

const auditRequestsCtrl = require (
    '../controllers/auditRequestsCtrl'
);

router.use(isSignedIn);

//GET /audit-requests
router.get('/', auditRequestsCtrl.index);

// POST /audit-requests
router.post('/', auditRequestsCtrl.create);

// GET /audit-requests/:requestId
router.get('/:requestId', auditRequestsCtrl.show);

// PUT /audit-requests/:requestId
router.put('/:requestId', auditRequestsCtrl.update);

// DELETE /audit-requests/:requestId
router.delete(
    '/:requestId',
    auditRequestsCtrl.deleteAuditRequest
  );

  module.exports = router;
