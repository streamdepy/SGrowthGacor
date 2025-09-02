const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Middleware validasi login
const middlewareValidation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "supersecretkey");
    const user = await User.findByPk(decoded.id);

    if (!user) return res.redirect("/login");

    // Simpan user agar bisa dipakai di semua template handlebars
    req.user = user;
    res.locals.user = user; // 🔑 ini yang penting

    next();
  } catch (error) {
    console.error("Middleware validation error:", error);
    res.redirect("/login");
  }
};

module.exports = { middlewareValidation };


// Middleware cek role admin
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (req.user.role !== "admin") {
      return res.redirect("/dashboard");
    }
    next();
  } catch (error) {
    console.error("Admin validation error:", error);
    res.redirect("/login");
  }
};

// Middleware cek role auditor
const isAuditor = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (req.user.role !== "auditor") {
      return res.redirect("/dashboard");
    }
    next();
  } catch (error) {
    console.error("Auditor validation error:", error);
    res.redirect("/login");
  }
};

// Middleware cek role UMKM
const isUMKM = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (req.user.role !== "umkm") {
      return res.redirect("/dashboard");
    }
    next();
  } catch (error) {
    console.error("UMKM validation error:", error);
    res.redirect("/login");
  }
};

module.exports = {
  middlewareValidation,
  isAdmin,
  isAuditor,
  isUMKM,
};
