const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On Client, also delete the Access Token

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No Content to send back

  const refreshToken = cookies.jwt;

  // Is refresh token in DB(in this case file)
  const foundUser = await User.findOne({ refreshToken }).exec();

  console.log(foundUser);

  if (!foundUser) {
    // erase cookie that was sent
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //No Content but successful
  }

  // Delete the refresh Token in DB(file)
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204); // secure: true - only serves on https
};

module.exports = { handleLogout };
