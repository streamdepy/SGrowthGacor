// AuthController

// - login
// - ganti password
// - middlewareCheck
// - logout (opsional)

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

    if (!user) {
      return res.status(401).send("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log(user.password + " ------ " + password + " ------ " + valid);
    if (!valid) return res.status(401).send("Invalid password");

    // 🔑 Buat JWT token dengan payload sesuai middlewareValidation
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY || "supersecretkey", {
      expiresIn: "1d",
    });

    // Simpan token di cookie
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Redirect berdasarkan role (opsional)
    if (user.role === "admin") {
      res.redirect("/admin/dashboard");
    } else if (user.role === "auditor") {
      res.redirect("/auditor/dashboard");
    } else {
      res.redirect("/umkm/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed.");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
