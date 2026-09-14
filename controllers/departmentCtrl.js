const Department = require('../models/Department');

const index = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 'asc' });
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.departmentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};