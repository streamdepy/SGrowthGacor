// middlewares/userMiddleware.js
const { User } = require("../models"); // Memperbaiki impor model dari direktori 'models'

const userMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // findByPk adalah metode yang ada pada model Sequelize.
    // Memastikan objek User adalah model Sequelize yang benar.
    const user = await User.findByPk(userId, {
      attributes: ["name", "role"]
    });

    if (user) {
      // Lampirkan data user ke res.locals
      // Ini membuat data 'user' tersedia untuk semua template
      res.locals.user = user.get({ plain: true });
    } else {
      // Atur nilai default jika user tidak ditemukan
      res.locals.user = { name: "Guest", role: "-" };
    }

    next(); // Lanjutkan ke handler rute berikutnya
  } catch (error) {
    console.error("🔥 Error in userMiddleware:", error);
    res.locals.user = { name: "Guest", role: "-" };
    next();
  }
};

module.exports = userMiddleware;
