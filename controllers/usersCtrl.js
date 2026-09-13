const User = require('../models/user');

// GET /users  (admin only — view all users, e.g. for Manage Users page)
const index = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Only admins can view all users.' });
    }
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
module.exports={index};