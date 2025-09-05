const { User, BusinessProfile, EsgScore } = require("../models");

const getDashboardUmkm = async (req, res, next) => {
  try {
    const user = req.user;

    // Cari profil bisnis berdasarkan user_id
    const business = await BusinessProfile.findOne({
      where: { user_id: user.id },
    });

    if (!business) {
      console.error(`❌ Tidak ditemukan BusinessProfile untuk user_id: ${user.id}`);
      return res.render("umkm/dashboard", {
        title: "Dashboard UMKM",
        layout: "umkm.hbs",
        user,
        business: null,
        esgScores: [],
        error: "Business profile tidak ditemukan",
      });
    }

    // Cari ESG Score secara manual
    // const esgScores = await EsgScore.findAll({
    //   where: { business_id: business.id },
    // });

    // if (!esgScores || esgScores.length === 0) {
    //   console.warn(`⚠️ ESG Score kosong untuk business_id: ${business.id}`);
    // }

    console.log(user.name)
    // Kirim ke view
    res.render("umkm/dashboard", {
      title: "Dashboard UMKM",
      layout: "umkm.hbs",
      user,
      business,
      // esgScores,
    });

  } catch (error) {
    console.error("🔥 Error getDashboardUmkm:", error);
    next(error);
  }
};

module.exports = { getDashboardUmkm };
