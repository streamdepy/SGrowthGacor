const express = require("express");
const router = express.Router();
const { middlewareValidation, isAdmin, isUMKM } = require("../middlewares/authMiddleware");
const { getDashboardUmkm } = require("../controllers/umkmController");
const businessController = require("../controllers/businessController");
const grieconomicController = require("../controllers/grieconomicController");


router.get("/dashboard", middlewareValidation, isUMKM, getDashboardUmkm, function (req, res, next) {
});

router.get("/form-gi", middlewareValidation, businessController.cekformgi,function (req, res, next) {
});

router.post("/form-gi", middlewareValidation, businessController.saveGeneralInformation);

router.get("/form-gri", function (req, res, next) {
  res.render("umkm/form-gri", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-1", function (req, res, next) {
  res.render("umkm/gri-economic/gri-1", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.post("/gri-1", middlewareValidation, grieconomicController.saveBasicInfo);
router.post("/gri-2", middlewareValidation, grieconomicController.saveFinanceData);
router.post("/gri-3", middlewareValidation, grieconomicController.saveNotes);


router.get("/gri-2", function (req, res, next) {
  res.render("umkm/gri-economic/gri-2", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path,
    gri_id: req.query.gri_id,          // 🔥 ambil dari query
    reporting_period: req.query.period // 🔥 oper juga periode
  });
});


router.get("/gri-3", function (req, res, next) {
  res.render("umkm/gri-economic/gri-3", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gri-4", function (req, res, next) {
  res.render("umkm/gri-economic/gri-4", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-1", function (req, res, next) {
  res.render("umkm/gri-social/social-1", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-2", function (req, res, next) {
  res.render("umkm/gri-social/social-2", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-3", function (req, res, next) {
  res.render("umkm/gri-social/social-3", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-4", function (req, res, next) {
  res.render("umkm/gri-social/social-4", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-5", function (req, res, next) {
  res.render("umkm/gri-social/social-5", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/social-6", function (req, res, next) {
  res.render("umkm/gri-social/social-6", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-1", function (req, res, next) {
  res.render("umkm/gri-env/env-1", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-2", function (req, res, next) {
  res.render("umkm/gri-env/env-2", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-3", function (req, res, next) {
  res.render("umkm/gri-env/env-3", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-4", function (req, res, next) {
  res.render("umkm/gri-env/env-4", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-5", function (req, res, next) {
  res.render("umkm/gri-env/env-5", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/env-6", function (req, res, next) {
  res.render("umkm/gri-env/env-6", {
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
