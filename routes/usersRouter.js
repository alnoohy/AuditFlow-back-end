const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');
const usersCtrl = require('../controllers/usersCtrl');

router.use(isSignedIn);

router.post('/', usersCtrl.create);
router.get('/', usersCtrl.index);
router.get('/:userId', usersCtrl.show);
router.put('/:userId', usersCtrl.update);
router.delete('/:userId', usersCtrl.delete);

module.exports = router;