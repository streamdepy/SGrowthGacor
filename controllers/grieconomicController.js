const GRIEconomic = require("../models/GRIEconomic");
const BusinessProfile = require("../models/BusinessProfile");

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



exports.saveFinanceData = async (req, res) => {
  try {
    const userId = req.user.id; // dari middleware auth
    const {
      gri_id, // id record GRIEconomic yang akan diupdate
      revenue,
      revenue_notes,
      revenue_files,
      general_admin_expenses,
      general_admin_notes,
      salary_expenses,
      salary_employee_notes,
      transport_expenses,
      transport_notes,
      fuel_expenses,
      fuel_notes,
      electricity_expenses,
      electricity_notes,
      internet_expenses,
      internet_notes,
      telephone_expenses,
      telephone_notes,
      water_expenses,
      water_notes,
      other_operating_expenses,
      other_operating_notes,
      non_operating_expenses,
      non_operating_notes,
      expenses_files
    } = req.body;

    console.log("📥 saveFinanceData req.body:", req.body);

    // 1. Pastikan business profile ada
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) {
      return res.status(400).json({ error: "Business profile not found for this user" });
    }

    // 2. Cari record GRIEconomic sesuai id & business
    const griRecord = await GRIEconomic.findOne({
      where: { id: gri_id, business_id: business.id },
    });

    if (!griRecord) {
      return res.status(404).json({ error: "GRI Economic record not found for update" });
    }

    // 3. Update data
    await griRecord.update({
      revenue,
      revenue_notes,
      revenue_files,
      general_admin_expenses,
      general_admin_notes,
      salary_expenses,
      salary_employee_notes,
      transport_expenses,
      transport_notes,
      fuel_expenses,
      fuel_notes,
      electricity_expenses,
      electricity_notes,
      internet_expenses,
      internet_notes,
      telephone_expenses,
      telephone_notes,
      water_expenses,
      water_notes,
      other_operating_expenses,
      other_operating_notes,
      non_operating_expenses,
      non_operating_notes,
      expenses_files
    });

    // 4. Redirect ke Bagian 3 sambil kirim id & periode
    res.redirect(
      `/umkm/gri-3?gri_id=${griRecord.id}&period=${encodeURIComponent(griRecord.reporting_period)}&edit=true`
    );
  } catch (error) {
    console.error("🔥 Error saving Finance Data:", error);
    res.status(500).json({ error: "Failed to save Finance Data" });
  }
};

exports.saveNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      gri_id,
      unusual_expenses_flag,
      unusual_expenses_notes,
      accounting_adjustment_flag,
      accounting_adjustment_notes,
    } = req.body;

    if (!gri_id) {
      console.error("❌ gri_id tidak ditemukan di req.body:", req.body);
      return res.status(400).json({ error: "gri_id wajib dikirim dari form" });
    }

    const griRecord = await GRIEconomic.findOne({
      where: { id: gri_id },
      include: [{ model: BusinessProfile, where: { user_id: userId } }],
    });

    if (!griRecord) {
      return res.status(404).json({ error: "GRI Economic record not found" });
    }

    await griRecord.update({
      unusual_expenses_flag,
      unusual_expenses_notes,
      accounting_adjustment_flag,
      accounting_adjustment_notes,
    });

    res.redirect(
      `/umkm/gri-4?gri_id=${griRecord.id}&period=${encodeURIComponent(
        griRecord.reporting_period
      )}&edit=true`
    );
  } catch (error) {
    console.error("🔥 Error saving Notes:", error);
    res.status(500).json({ error: "Failed to save Notes" });
  }
};
