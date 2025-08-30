const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", (req, res) => res.render("pages/home"));
router.get("/login", function (req, res, next) {
  res.render("auth/login", {
    title: "Login",
    layout: "auth_login",
  });
});

router.post("/login", authController.login);

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", authController.register);

module.exports = router;

/*
router.get('/login', function(req, res, next) {
    res.render('auth/login', { 
      title: 'Login',
      layout: 'layouts/layout_login', 
    });
});
  
router.post('/login', login);
*/
