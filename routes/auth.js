const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { middlewareValidation, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", function (req, res, next) {
  res.render("pages/home", {
    title: "Landing Page", 
  });
});
router.get("/login", function (req, res, next) {
  res.render("auth/login", {
    title: "Login",
    layout: "auth_login",
  });
});

router.post("/login", authController.login);

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "reg",
    layout: "auth_login",
  });
  
});

router.post("/register", authController.register);

module.exports = router;

