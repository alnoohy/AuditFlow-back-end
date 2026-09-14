const Department = require("../models/Department");

const index = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: "asc" });
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
      { new: true },
    );
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.departmentId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  index,
  create,
  update,
  delete: deleteDepartment,
};
