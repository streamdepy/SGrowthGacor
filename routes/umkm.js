const express = require("express");
const router = express.Router();
const { GRIEconomic } = require("../models");


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


router.get("/gri-2", async function (req, res, next) {
  try {
    const { gri_id } = req.query;

    // Cari record GRI Economic
    const record = await GRIEconomic.findByPk(gri_id);

    res.render("umkm/gri-economic/gri-2", {
      record: record ? record.get({ plain: true }) : null,
      title: "Form GRI",
      layout: "umkm",
      currentPath: req.path,
      gri_id,
      reporting_period: req.query.period,
      editMode: req.query.edit === "true" // 🔥 data lama untuk pre-fill form
    });
  } catch (err) {
    console.error("🔥 Error load gri-2:", err);
    res.status(500).send("Gagal load form");
  }
});

router.get("/gri-3", async function (req, res, next) {
  const { gri_id } = req.query;

  let record = null;
  if (gri_id) {
    const griRecord = await GRIEconomic.findByPk(gri_id);
    record = griRecord ? griRecord.get({ plain: true }) : null;
  }

  res.render("umkm/gri-economic/gri-3", {
    record,
    gri_id, // 👉 biar bisa dipakai di hidden input
    title: "Form GRI - Bagian 3",
    layout: "umkm",
    currentPath: req.path,
  });
});

router.get("/gri-4", async function (req, res, next) {
  try {
    const { gri_id, period } = req.query;

    let record = null;
    let summary = null;
    let biggestExpense = { category: null, value: 0, percentage: 0 };

    if (gri_id) {
      const griRecord = await GRIEconomic.findByPk(gri_id);
      if (griRecord) {
        record = griRecord.get({ plain: true });

        // Hitung total operasional
        totalOps =
          (record.general_admin_expenses*1*1 || 0) +
          (record.salary_expenses*1 || 0) +
          (record.transport_expenses*1 || 0) +
          (record.fuel_expenses*1 || 0) +
          (record.electricity_expenses*1 || 0) +
          (record.internet_expenses*1 || 0) +
          (record.telephone_expenses*1 || 0) +
          (record.water_expenses*1 || 0) +
          (record.other_operating_expenses*1 || 0);

        // Cari biaya terbesar
        const categories = [
          { key: "general_admin_expenses", label: "General & Administrative", value: record.general_admin_expenses || 0 },
          { key: "salary_expenses", label: "Salary", value: record.salary_expenses || 0 },
          { key: "transport_expenses", label: "Transportation", value: record.transport_expenses || 0 },
          { key: "fuel_expenses", label: "Fuel", value: record.fuel_expenses || 0 },
          { key: "electricity_expenses", label: "Electricity", value: record.electricity_expenses || 0 },
          { key: "internet_expenses", label: "Internet", value: record.internet_expenses || 0 },
          { key: "telephone_expenses", label: "Telephone", value: record.telephone_expenses || 0 },
          { key: "water_expenses", label: "Water", value: record.water_expenses || 0 },
          { key: "other_operating_expenses", label: "Other Operating", value: record.other_operating_expenses || 0 },
        ];

        const maxCat = categories.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), { value: 0 });

        if (maxCat.value > 0 && totalOps > 0) {
          biggestExpense = {
            category: maxCat.label,
            value: maxCat.value,
            percentage: ((maxCat.value / totalOps) * 100).toFixed(2),
          };
        }
      }
    }

    res.render("umkm/gri-economic/gri-4", {
      record,
      summary,
      biggestExpense,
      title: "Laporan GRI Economic",
      layout: "umkm",
      currentPath: req.path,
      gri_id,
      totalOps,
      reporting_period: period,
      editMode: req.query.edit === "true",
      docs: {
        has_financial_report: true,
        has_sales_notes: false,
        has_expenses_notes: true,
      },
    });
  } catch (error) {
    console.error("🔥 Error loading gri-report:", error);
    res.status(500).send("Internal Server Error");
  }
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

router.get("/gov-1", function (req, res, next) {
  res.render("umkm/gri-gov/gov-1", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gov-2", function (req, res, next) {
  res.render("umkm/gri-gov/gov-2", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gov-3", function (req, res, next) {
  res.render("umkm/gri-gov/gov-3", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gov-4", function (req, res, next) {
  res.render("umkm/gri-gov/gov-4", {
    title: "Form GRI",
    layout: "umkm",
    currentPath: req.path
  });
});

router.get("/gov-5", function (req, res, next) {
  res.render("umkm/gri-gov/gov-5", {
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
