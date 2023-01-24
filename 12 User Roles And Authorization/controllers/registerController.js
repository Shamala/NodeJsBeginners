const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: `Username and password are required.` });
  }
  // Check for duplicate username in database
  const duplicate = usersDB.users.find((person) => person.username === user);

  if (duplicate) {
    return res.send(409);
  }
  try {
    //encrypt password
    const hashedPassword = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPassword,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};
module.exports = { handleNewUser };