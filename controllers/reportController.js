// controllers/reportController.js
const BusinessProfile = require("../models/BusinessProfile");
const BusinessCertification = require("../models/BusinessCertification");
const BusinessStakeholder = require("../models/BusinessStakeholder");
const BusinessDepartement = require("../models/BusinessDepartement");
const BusinessShareholder = require("../models/BusinessShareholder");
const GRIEconomic = require("../models/GRIEconomic");

exports.getReport = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔹 Cari business profile UMKM
    // Gunakan { raw: true } untuk mendapatkan objek JavaScript biasa
    const business = await BusinessProfile.findOne({
      where: { user_id: userId },
      raw: true, // 👈 Tambahkan ini
    });
    if (!business) {
      return res.status(404).json({ error: "Business profile not found" });
    }

    // 🔹 Ambil Economic Data
    // Gunakan { raw: true } untuk mendapatkan objek JavaScript biasa
    const economic = await GRIEconomic.findOne({
      where: { business_id: business.id },
      raw: true, // 👈 Tambahkan ini
    });

    const shareholders = await BusinessShareholder.findAll({
      where: { business_id: business.id },
      raw: true,
    });

    const departments = await BusinessDepartement.findAll({
      where: { business_id: business.id },
      raw: true,
    });

    const certifications = await BusinessCertification.findAll({
      where: { business_id: business.id },
      raw: true,
    });

    const stakeholders = await BusinessStakeholder.findAll({
      where: { business_id: business.id },
      raw: true,
    });
    // Jika data economic tidak ditemukan, inisialisasi sebagai objek kosong
    const economicData = economic || {};

    // ====== HITUNG SCORE SEDERHANA (dummy logic, bisa diubah sesuai kebutuhan) ======
    let giScore = business ? 100 : 0;
    let economicScore = 0;

    // Gunakan objek economicData yang sudah dipastikan ada
    if (economicData.responsible_person) {
      economicScore = economicScore + 10;
      if (economicData.revenue) {
        economicScore = economicScore + 20;
        if (economicData.general_admin_expenses) {
          economicScore = economicScore + 7;
          if (economicData.salary_expenses) {
            economicScore = economicScore + 7;
            if (economicData.transport_expenses) {
              economicScore = economicScore + 7;
              if (economicData.fuel_expenses) {
                economicScore = economicScore + 7;
                if (economicData.electricity_expenses) {
                  economicScore = economicScore + 7;
                  if (economicData.internet_expenses) {
                    economicScore = economicScore + 7;
                    if (economicData.telephone_expenses) {
                      economicScore = economicScore + 7;
                      if (economicData.water_expenses) {
                        economicScore = economicScore + 7;
                        if (economicData.other_operating_expenses) {
                          economicScore = economicScore + 7;
                          if (economicData.non_operating_expenses) {
                            economicScore = economicScore + 7;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    // Perbaikan: Pastikan economicData tidak null sebelum diakses
    if (economicData) {
      // Re-assign economicScore based on the new logic
      // This is a cleaner way to write the nested if statements
      const fields = [
        "responsible_person",
        "revenue",
        "general_admin_expenses",
        "salary_expenses",
        "transport_expenses",
        "fuel_expenses",
        "electricity_expenses",
        "internet_expenses",
        "telephone_expenses",
        "water_expenses",
        "other_operating_expenses",
        "non_operating_expenses",
      ];

      let totalFieldsFilled = 0;
      fields.forEach((field) => {
        if (economicData[field]) {
          totalFieldsFilled++;
        }
      });

      // Calculate score based on percentage of fields filled
      economicScore = Math.round((totalFieldsFilled / fields.length) * 100);
    }

    const overallScore = Math.round((giScore + economicScore + 74 + 78 + 85) / 5);

    // 🔹 Rekomendasi akhir
    const recommendations = [];

    if (giScore === 0) {
      recommendations.push("Lengkapi **General Information** agar laporan lebih akurat dan skor meningkat.");
    }

    // Mengubah rekomendasi agar lebih spesifik
    if (!economicData.revenue) {
      recommendations.push("Isi data **pendapatan** pada bagian GRI Economic untuk menampilkan analisis keuangan.");
    }
    if (!economicData.general_admin_expenses) {
      recommendations.push("Lengkapi data **pengeluaran administrasi** pada bagian GRI Economic.");
    }
    // Tambahkan rekomendasi lain sesuai dengan logika yang Anda butuhkan
    // 🔹 Response
    res.render("umkm/lap", {
      title: "Form GRI",
      layout: "umkm",
      currentPath: req.path,
      business,
      shareholders,
      departments,
      certifications,
      stakeholders,
      economic: economicData, // Kirim objek biasa yang sudah diperiksa
      scores: {
        gi: giScore,
        economic: economicScore,
        overall: overallScore,
      },
      recommendations,
    });
  } catch (error) {
    console.error("🔥 Error fetching report:", error);
    res.status(500).json({ error: "Failed to load report" });
  }
};
