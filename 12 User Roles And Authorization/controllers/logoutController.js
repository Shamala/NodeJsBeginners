const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On Client, also delete the Access Token

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //No Content to send back

  const refreshToken = cookies.jwt;

  // Is refresh token in DB(in this case file)
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  console.log(foundUser);
  if (!foundUser) {
    // erase cookie that was sent
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //No Content but successful
  }

  // Delete the refresh Token in DB(file)
  const otherUsers = usersDB.users.filter(
    (person) => foundUser.refreshToken !== person.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };

  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join("__dirname", "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only serves on https
};

module.exports = { handleLogout };
