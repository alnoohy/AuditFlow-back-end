const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "auditor") {
    return res.status(403).json({
      err: "Authentication access required",
    });
  }

  next();
};

module.exports = isAdmin;
