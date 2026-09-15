const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const departmentsCtrl = require("../controllers/departmentCtrl");
const isSignedIn = require("../middleware/isSignedIn");

//Public - needed to signup for the dropdown of the department
router.get("/", departmentsCtrl.index);

// Admin only
router.post("/", isSignedIn, isAdmin, departmentsCtrl.create);

router.put(
  "/:departmentId",
  isSignedIn,
  isAdmin,
  departmentsCtrl.update
);

router.delete(
  "/:departmentId",
  isSignedIn,
  isAdmin,
  departmentsCtrl.delete
);

module.exports = router;