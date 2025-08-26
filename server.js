const express = require("express");
const dotenv = require("dotenv");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/database");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
app.engine("hbs", engine({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials")
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);
app.use("/auth", authRoutes);

// DB Sync
sequelize.sync().then(() => {
  console.log("✅ Database connected & synced");
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(err => console.log("❌ DB Error: ", err));
