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
      gri_id, // id dari record GRIEconomic yang mau diupdate (harus dikirim hidden di form Bagian 2)
      revenue,
      general_admin_expenses,
      general_admin_notes,
      salary_expenses,
      salary_employee_notes,
      transport_expenses,
      transport_notes,
      fuel_expenses,
      electricity_expenses,
      internet_expenses,
      telephone_expenses,
      water_expenses,
      other_operating_expenses,
      other_operating_notes,
      non_operating_expenses,
      non_operating_notes,
    } = req.body;

    console.log("📥 saveFinanceData req.body:", req.body);

    // 1. Cek apakah business profile user ada
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) {
      return res.status(400).json({ error: "Business profile not found for this user" });
    }

    // 2. Cari record GRIEconomic berdasarkan id
    const griRecord = await GRIEconomic.findOne({
      where: { id: gri_id, business_id: business.id },
    });

    if (!griRecord) {
      return res.status(404).json({ error: "GRI Economic record not found for update" });
    }

    // 3. Update record
    await griRecord.update({
      revenue,
      general_admin_expenses,
      general_admin_notes,
      salary_expenses,
      salary_employee_notes,
      transport_expenses,
      transport_notes,
      fuel_expenses,
      electricity_expenses,
      internet_expenses,
      telephone_expenses,
      water_expenses,
      other_operating_expenses,
      other_operating_notes,
      non_operating_expenses,
      non_operating_notes,
    });

    res.status(200).json({ message: "Finance data updated successfully", data: griRecord });
  } catch (error) {
    console.error("🔥 Error saving Finance Data:", error);
    res.status(500).json({ error: "Failed to save Finance Data" });
  }
};


exports.saveNotes = async (req, res) => {
  try {
    const { id, unusual_expenses_flag, unusual_expenses_notes, accounting_adjustment_flag, accounting_adjustment_notes } = req.body;

    const record = await GRIEconomic.findByPk(id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    await record.update({
      unusual_expenses_flag,
      unusual_expenses_notes,
      accounting_adjustment_flag,
      accounting_adjustment_notes,
    });

    res.status(200).json({ message: "Notes saved", data: record });
  } catch (error) {
    console.error("🔥 Error saving Notes:", error);
    res.status(500).json({ error: "Failed to save Notes" });
  }
};
