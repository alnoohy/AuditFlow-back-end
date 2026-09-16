const express = require("express");
const router = express.Router({ mergeParams: true });
const submissionCtrl = require("../controllers/submissionsCtrl");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//POST
router.post(
  "/",
  upload.single("evidenceFile"),
  submissionCtrl.createSubmission,
);

//PUT
router.put("/:submissionId", submissionCtrl.updateSubmission);

//DELETE
router.delete("/:submissionId", submissionCtrl.deleteSubmission);

//
module.exports = router;
