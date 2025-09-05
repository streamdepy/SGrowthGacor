const express = require("express");
const router = express.Router();
const { middlewareValidation, isAdmin, isUMKM } = require("../middlewares/authMiddleware");
const { getDashboardUmkm } = require("../controllers/umkmController");


router.get("/dashboard", middlewareValidation, isUMKM, getDashboardUmkm, function (req, res, next) {
});

router.get("/form-gi", function (req, res, next) {
  res.render("umkm/form-gi", {
    title: "Form GI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/form-gri", function (req, res, next) {
  res.render("umkm/form-gri", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-1", function (req, res, next) {
  res.render("umkm/gri-1", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-2", function (req, res, next) {
  res.render("umkm/gri-2", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-3", function (req, res, next) {
  res.render("umkm/gri-3", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-4", function (req, res, next) {
  res.render("umkm/gri-4", {
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
