const GRIEnvironment = require("../models/GRIEnvironment");
const BusinessProfile = require("../models/BusinessProfile");

exports.saveEnvironmentBasicInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    // Cari Business Profile user
    const business = await BusinessProfile.findOne({ where: { user_id: userId } });
    if (!business) {
      return res.status(400).json({ error: "Business profile not found" });
    }

    const { unit_name, operational_location, reporting_period, period_year, period_year_quarter, period_quarter, calculation_method } = req.body;
    console.log(unit_name + "-----" + operational_location + "-----" + reporting_period + "-----" + period_year + "-----" + period_year_quarter + "-----" + period_quarter + "-----" + calculation_method);

    if (!unit_name || !operational_location || !reporting_period) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // 🔹 Gabungkan reporting_period
    let reporting_period_full = "";
    if (reporting_period === "tahun") {
      reporting_period_full = 'Tahun ' + period_year;
      if (period_year_quarter) {
        reporting_period_full += ` - Triwulan ${period_year_quarter}`;
      }
    } else if (reporting_period === "triwulan") {
      reporting_period_full = `Triwulan ${period_quarter}`;
    } else {
      reporting_period_full = reporting_period;
    }

    // 🔹 Cek apakah sudah ada record untuk business_id + periode + tahun
    let record = await GRIEnvironment.findOne({
      where: {
        business_id: business.id,
        reporting_period: reporting_period_full,
      },
    });

    if (record) {
      console.log("⚠️ Record sudah ada, redirect ke edit:", record.id);
      return res.redirect(`env-2?env_id=${record.id}&period=${encodeURIComponent(reporting_period_full)}&edit=true`);
    }

    // 🔹 Jika belum ada → buat baru
    record = await GRIEnvironment.create({
      business_id: business.id,
      unit_name,
      operational_location,
      reporting_period,
      calculation_method,
    });

    console.log("✅ Data Environment baru dibuat:", record.id);

    res.redirect(`env-2?env_id=${record.id}&period=${encodeURIComponent(reporting_period)}&year=${period_year}`);
  } catch (error) {
    console.error("🔥 Error saving Environment Basic Info:", error);
    res.status(500).json({ error: "Failed to save Environment Basic Info" });
  }
};
