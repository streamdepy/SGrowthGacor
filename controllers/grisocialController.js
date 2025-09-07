const GRISocial = require("../models/GRISocial");
const BusinessProfile = require("../models/BusinessProfile");

// =======================
// BAGIAN 1: K3 / Insiden Kerja
// =======================
exports.saveBasicInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    // Cari business profile
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) {
      return res.status(400).json({ error: "Business profile not found for this user" });
    }

    const {
      unit_name,
      responsible_person,
      reporting_period,
      period_year,
      period_year_quarter,
      period_quarter
    } = req.body;

    console.log("📥 saveBasicInfo req.body:", req.body);

    if (!unit_name || !reporting_period || !responsible_person) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // 🔹 Gabungkan reporting_period
    let reporting_period_full = "";
    if (reporting_period === "tahun") {
      reporting_period_full = `Tahun ${period_year}`;
      if (period_year_quarter) {
        reporting_period_full += ` - Triwulan ${period_year_quarter}`;
      }
    } else if (reporting_period === "triwulan") {
      reporting_period_full = `Triwulan ${period_quarter}`;
    } else {
      reporting_period_full = reporting_period;
    }

    // 🔹 Cek apakah sudah ada record untuk business_id + periode
    let record = await GRIEconomic.findOne({
      where: { business_id: business.id, reporting_period: reporting_period_full }
    });

    if (record) {
      console.log("⚠️ Record sudah ada, redirect ke edit:", record.id);
      // Jika sudah ada, langsung redirect (edit mode)
      return res.redirect(`gri-2?gri_id=${record.id}&period=${encodeURIComponent(reporting_period_full)}&edit=true`);
    }

    // 🔹 Kalau belum ada → buat baru
    record = await GRIEconomic.create({
      business_id: business.id,
      unit_name,
      reporting_period: reporting_period_full,
      responsible_person,
    });

    res.redirect(`gri-2?gri_id=${record.id}&period=${encodeURIComponent(reporting_period_full)}`);
  } catch (error) {
    console.error("🔥 Error saving Basic Info:", error);
    res.status(500).json({ error: "Failed to save Basic Info" });
  }
};

exports.saveK3Data = async (req, res) => {
  try {
    const userId = req.user.id; // dari middleware auth
    const {
      gri_id,
      has_incident,
      total_injuries,
      total_fatalities,
      main_incident_type,
      incident_location,
      incident_cause,
      lost_workdays,
      corrective_actions,
    } = req.body;

    // Cek Business Profile
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) return res.status(400).json({ error: "Business profile not found" });

    let record;
    if (gri_id) {
      // update data
      record = await GRISocial.findOne({ where: { id: gri_id, business_id: business.id } });
      if (!record) return res.status(404).json({ error: "GRI Social record not found" });

      await record.update({
        has_incident,
        total_injuries,
        total_fatalities,
        main_incident_type,
        incident_location,
        incident_cause,
        lost_workdays,
        corrective_actions,
      });
    } else {
      // create baru (jika misalnya langsung mulai dari Bagian 1)
      record = await GRISocial.create({
        business_id: business.id,
        reporting_period: req.body.reporting_period || "default", // bisa diganti input dari form periode
        has_incident,
        total_injuries,
        total_fatalities,
        main_incident_type,
        incident_location,
        incident_cause,
        lost_workdays,
        corrective_actions,
      });
    }

    res.redirect(`gri-social-2?gri_id=${record.id}&period=${encodeURIComponent(record.reporting_period)}`);
  } catch (error) {
    console.error("🔥 Error saving K3 Data:", error);
    res.status(500).json({ error: "Failed to save K3 Data" });
  }
};

// =======================
// BAGIAN 2: Penyakit Akibat Kerja
// =======================
exports.saveDiseaseData = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      gri_id,
      has_disease,
      total_disease_cases,
      disease_type,
      affected_unit,
      prevention_actions,
    } = req.body;

    // Cek Business Profile
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) return res.status(400).json({ error: "Business profile not found" });

    const record = await GRISocial.findOne({ where: { id: gri_id, business_id: business.id } });
    if (!record) return res.status(404).json({ error: "GRI Social record not found" });

    await record.update({
      has_disease,
      total_disease_cases,
      disease_type,
      affected_unit,
      prevention_actions,
    });

    res.redirect(`gri-social-3?gri_id=${record.id}&period=${encodeURIComponent(record.reporting_period)}`);
  } catch (error) {
    console.error("🔥 Error saving Disease Data:", error);
    res.status(500).json({ error: "Failed to save Disease Data" });
  }
};
