const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No Users found." });
  res.json(users);
};

module.exports = {
  getAllUsers,
};
