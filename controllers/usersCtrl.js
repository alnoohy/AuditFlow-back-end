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
// GET /users/:userId  (admin only — view a single user's details)
const show = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Only admins can view user details.' });
    }
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// PUT /users/:userId  (admin only — change someone's role or department)
const update = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Only admins can update users.' });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// DELETE /users/:userId  (admin only)
const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ err: 'Only admins can delete users.' });
    }
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
module.exports={index,show,update,delete:deleteUser};