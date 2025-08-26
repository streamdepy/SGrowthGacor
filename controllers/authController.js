const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "umkm",
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).send("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send("Invalid password");

    // JWT session
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed.");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
