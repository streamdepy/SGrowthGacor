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

    const {
      unit_name,
      operational_location,
      reporting_period,
      period_year,
      calculation_method,
    } = req.body;

    if (!unit_name || !operational_location || !reporting_period || !period_year || !calculation_method) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    // 🔹 Cek apakah sudah ada record untuk business_id + periode + tahun
    let record = await GRIEnvironment.findOne({
      where: {
        business_id: business.id,
        reporting_period,
        period_year,
      },
    });

    if (record) {
      // Update data jika sudah ada
      await record.update({
        unit_name,
        operational_location,
        calculation_method,
      });

      console.log("✅ Data Environment diperbarui:", record.id);

      return res.redirect(
        `/env-2?env_id=${record.id}&period=${encodeURIComponent(reporting_period)}&year=${period_year}&edit=true`
      );
    }

    // 🔹 Jika belum ada → buat baru
    record = await GRIEnvironment.create({
      business_id: business.id,
      unit_name,
      operational_location,
      reporting_period,
      period_year,
      calculation_method,
    });

    console.log("✅ Data Environment baru dibuat:", record.id);

    res.redirect(
      `/env-2?env_id=${record.id}&period=${encodeURIComponent(reporting_period)}&year=${period_year}`
    );

  } catch (error) {
    console.error("🔥 Error saving Environment Basic Info:", error);
    res.status(500).json({ error: "Failed to save Environment Basic Info" });
  }
};
