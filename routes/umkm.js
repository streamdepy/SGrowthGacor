const express = require("express");
const router = express.Router();
const { middlewareValidation, isAdmin, isUMKM } = require("../middlewares/authMiddleware");
const { getDashboardUmkm } = require("../controllers/umkmController");
const businessController = require("../controllers/businessController");


router.get("/dashboard", middlewareValidation, isUMKM, getDashboardUmkm, function (req, res, next) {
});

router.get("/form-gi", function (req, res, next) {
  res.render("umkm/form-gi", {
    title: "Form GI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.post("/form-gi", middlewareValidation, businessController.saveGeneralInformation);

router.get("/form-gri", function (req, res, next) {
  res.render("umkm/form-gri", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
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
