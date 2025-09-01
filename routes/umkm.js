const express = require("express");
const router = express.Router();


router.get("/dashboard", function (req, res, next) {
  res.render("umkm/dashboard", {
    title: "dashboard",
    layout: "umkm",
  });
});

router.get("/form-gi", function (req, res, next) {
  res.render("umkm/form-gi", {
    title: "Form GI",
    layout: "umkm",
  });
});

router.get("/form-gri", function (req, res, next) {
  res.render("umkm/form-gri", {
    title: "Form GRI",
    layout: "umkm",
  });
});

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
