const GRISocial = require("../models/GRISocial");
const BusinessProfile = require("../models/BusinessProfile");
const GRISocialK3Incident = require("../models/GRISocialK3Incident");
// =======================
// BAGIAN 1: K3 / Insiden Kerja
// =======================
exports.saveBasicInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔹 Cari business profile
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) {
      return res.status(400).json({ error: "Business profile not found for this user" });
    }

    const {
      unit_name,
      operational_location,
      reporting_period,
      period_year,
      period_year_quarter,
      period_quarter
    } = req.body;

    console.log("📥 saveBasicInfo req.body:", req.body);

    if (!unit_name || !reporting_period || !operational_location) {
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

    // 🔹 Cek apakah sudah ada record (hindari duplikat)
    let record = await GRISocial.findOne({
      where: { business_id: business.id, reporting_period: reporting_period_full }
    });

    if (record) {
      console.log("⚠️ Record sudah ada, redirect ke edit:", record.id);
      return res.redirect(
        `social-2?social_id=${record.id}&period=${encodeURIComponent(reporting_period_full)}&edit=true`
      );
    }

    // 🔹 Kalau belum ada → buat baru
    record = await GRISocial.create({
      business_id: business.id,
      unit_name,
      operational_location,
      reporting_period: reporting_period_full,
    });

    console.log("✅ Record baru dibuat:", record.id);

    // redirect ke Bagian 2
    res.redirect(
      `social-2?social_id=${record.id}&period=${encodeURIComponent(reporting_period_full)}`
    );
  } catch (error) {
    console.error("🔥 Error saving Basic Info:", error);
    res.status(500).json({ error: "Failed to save Basic Info" });
  }
};

exports.saveK3Data = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      social_id,
      has_incident,
      total_injuries = [],
      total_fatalities = [],
      main_incident_type = [],
      incident_location = [],
      incident_cause = [],
      lost_workdays = [],
      corrective_actions = [],
      reporting_period,
    } = req.body;

    // 🔹 Cari business profile
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) return res.status(400).json({ error: "Business profile not found" });

    // 🔹 Cari induk GRI Social
    const socialRecord = await GRISocial.findOne({
      where: { id: social_id, business_id: business.id },
    });
    if (!socialRecord) return res.status(404).json({ error: "GRI Social record not found" });

    // 🔹 Update flag di induk
    await socialRecord.update({
      has_incident: has_incident === "ya",
    });

    // 🔹 Hapus insiden lama → biar clean saat update
    await GRISocialK3Incident.destroy({ where: { social_id: socialRecord.id } });

    // 🔹 Pastikan array (jaga-jaga kalau hanya 1 input)
    const toArray = (val) => (Array.isArray(val) ? val : val ? [val] : []);
    const injuriesArr = toArray(total_injuries);
    const fatalitiesArr = toArray(total_fatalities);
    const typesArr = toArray(main_incident_type);
    const locArr = toArray(incident_location);
    const causeArr = toArray(incident_cause);
    const lostArr = toArray(lost_workdays);
    const actionsArr = toArray(corrective_actions);

    // 🔹 Bentuk data insiden
    const incidents = injuriesArr.map((inj, i) => ({
      social_id: socialRecord.id,
      total_injuries: inj || 0,
      total_fatalities: fatalitiesArr[i] || 0,
      main_incident_type: typesArr[i] || null,
      incident_location: locArr[i] || null,
      incident_cause: causeArr[i] || null,
      lost_workdays: lostArr[i] || 0,
      corrective_actions: actionsArr[i] || null,
    }));

    // 🔹 Simpan batch
    if (incidents.length > 0) {
      await GRISocialK3Incident.bulkCreate(incidents);
    }

    console.log(`✅ ${incidents.length} insiden K3 berhasil disimpan untuk Social ID ${socialRecord.id}`);

    res.redirect(
      `social-3?social_id=${socialRecord.id}&period=${encodeURIComponent(reporting_period)}`
    );
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
