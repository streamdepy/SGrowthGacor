const express = require("express");
const dotenv = require("dotenv");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Handlebars setup
app.engine("hbs", engine({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "partials" });

// routes
const authRoutes = require("./routes/auth");
const umkmRoutes = require("./routes/umkm");
app.use("/", authRoutes);
app.use("/auth", authRoutes);
app.use("/umkm", umkmRoutes);

// DB Sync
sequelize.sync().then(() => {
  console.log("✅ Database connected & synced");
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(err => console.log("❌ DB Error: ", err));
