const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const departmentsCtrl = require('../controllers/departmentsCtrl');

router.get('/', departmentsCtrl.index); // any signed-in user can view (dropdowns)
router.post('/', isAdmin, departmentsCtrl.create);
router.put('/:departmentId', isAdmin, departmentsCtrl.update);
router.delete('/:departmentId', isAdmin, departmentsCtrl.delete);

module.exports = router;