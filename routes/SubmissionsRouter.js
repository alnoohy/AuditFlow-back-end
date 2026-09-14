const express = require("express");
const router = express.Router({ mergeParams: true });
const submissionCtrl = require("../controllers/submissionsCtrl");

router.post("/", submissionCtrl.createSubmission);

module.exports = router;
