const express = require("express");
const router = express.Router();


router.get("/dashboard", function (req, res, next) {
  res.render("umkm/dashboard", {
    title: "dashboard",
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
