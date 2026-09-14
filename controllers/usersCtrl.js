const bcrypt=require('bcrypt');
const User = require('../models/user');
const SALT_ROUNDS=10;

// GET /users  (admin only — view all users, e.g. for Manage Users page)
const create = async (req, res) => {
  try {

    const usernameTaken = await User.findOne({ username: req.body.username });
    if (usernameTaken) {
      return res.status(409).json({ err: 'Username already in use' });
    }

    const emailTaken = await User.findOne({ email: req.body.email });
    if (emailTaken) {
      return res.status(409).json({ err: 'Email already in use' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const index = async (req, res) => {
  try {
    const users = await User.find().populate('department');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
// GET /users/:userId  (admin only — view a single user's details)
const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('department');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// PUT /users/:userId  (admin only — change someone's role or department)
const update = async (req, res) => {
  try {
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
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
module.exports={create,index,show,update,delete:deleteUser};