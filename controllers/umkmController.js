const { User, BusinessProfile, EsgScore } = require("../models");

const getDashboardUmkm = async (req, res, next) => {
  try {
    const userId = req.user.id; // user login diverifikasi middlewareValidation

    // 🔹 Ambil user info
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "role"]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔹 Ambil Business Profile terkait user
    const business = await BusinessProfile.findOne({
      where: { user_id: userId },
      attributes: [
        "id",
        "business_name",
        "established_year",
        "headquarters",
        "legal_form",
        "industry_type",
        "city",
        "market_scope",
        "target_market",
        "province"
      ]
    });

    // Default kalau belum ada business profile
    const businessData = business
      ? business.get({ plain: true })
      : {
          business_name: "Belum diisi",
          established_year: "-",
          headquarters: "-",
          legal_form: "-",
          industry_type: "-",
          city: "-",
          province: "-"
        };

    res.render("umkm/dashboard", {
      title: "Dashboard UMKM",
      layout: "umkm",
      currentPath: req.path,
      user: user.get({ plain: true }),
      business: businessData,
    });
  } catch (error) {
    console.error("🔥 Error loading dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getDashboardUmkm };
