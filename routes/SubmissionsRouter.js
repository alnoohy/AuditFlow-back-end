const express = require("express");
const router = express.Router({ mergeParams: true });
const submissionCtrl = require("../controllers/submissionsCtrl");

//POST
router.post("/", submissionCtrl.createSubmission);

//PUT
router.put("/:submissionId", submissionCtrl.updateSubmission);

//DELETE
router.delete("/:submissionId", submissionCtrl.deleteSubmission);

//
module.exports = router;
