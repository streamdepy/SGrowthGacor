const { BusinessProfile, BusinessShareholder, BusinessDepartment, BusinessCertification, BusinessStakeholder } = require("../models");

exports.cekformgi = async (req, res) => {
  try {
    const userId = req.user.id; // user login diverifikasi middlewareValidation
    // 🔹 Ambil user info
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "role"]
    });
    // Cari profil bisnis berdasarkan user_id
    const business = await BusinessProfile.findOne({
      where: { user_id: userId.id },
    });
    console.log(business);

    if(!business || business === null) {
      res.render("umkm/form-gi", {
        title: "Form GI",
        layout: "umkm",
        user: user.get({ plain: true }),
        currentPath: req.path
      });
    } else {
      res.redirect("form-gri");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed." + error);
  }
};

exports.saveGeneralInformation = async (req, res) => {
  const t = await BusinessProfile.sequelize.transaction(); // pakai transaksi biar aman
  try {
    const userId = req.user.id; // dari middleware auth
    const {
      // Bagian Informasi Umum
      business_id,
      business_name,
      established_year,
      legal_form,

      // Bagian Industri & Produk
      industry_type,
      headquarters,
      city, //ini operational
      province,
      products_offered,

      // Bagian Kepemilikan
      shareholders, // array [{name, ownership_percentage}]
      ownership_percentage,

      // Pasar
      market_scope,
      target_market,
      target_market_other,

      // Karyawan
      total_employees_fulltime,
      total_employees_parttime,
      male_percentage,
      female_percentage,
      departments, // array [{department_name, employee_count}]

      // Nilai & Standar
      core_values,
      ethics_principles,
      certifications, // array string

      // Stakeholders
      stakeholders, // array [{type, stakeholder_other, relationship}]
      //relation stakeholdernya belum

      // Kontak
      pic_name,
      pic_position,
      pic_phone,
      pic_email,
      supporting_documents,
    } = req.body;

    // --- Normalisasi shareholders ---
    let shareholderArray = [];
    if (Array.isArray(shareholders)) {
      shareholderArray = shareholders; // sudah bentuk [{ name, ownership_percentage }]
    } else {
      shareholderArray = [];
    }

    // Total ownership sum
    const ownershipSum = shareholderArray.reduce((acc, s) => acc + Number(s.ownership_percentage || 0), 0);

    let marketScopeValue = null;
    if (Array.isArray(req.body.market_scope)) {
      marketScopeValue = req.body.market_scope.join(", ");
    } else if (typeof req.body.market_scope === "string") {
      marketScopeValue = req.body.market_scope;
    }

    // Target Market
    let targetMarketValue = null;
    if (Array.isArray(req.body.target_market)) {
      targetMarketValue = req.body.target_market.join(", ");
    } else if (typeof req.body.target_market === "string") {
      targetMarketValue = req.body.target_market;
    }

    const targetMarketOther = req.body.target_market_other?.trim() || null;
    // --- Normalisasi city & province ---
    const provinceValue = Array.isArray(province) ? province[0] : province;
    const cityValue = Array.isArray(city) ? city[0] : city;

    const business = await BusinessProfile.upsert(
      {
        id: business_id,
        user_id: userId,
        business_name,
        established_year,
        legal_form,
        industry_type,
        headquarters,
        city: cityValue,
        province: provinceValue,
        products_offered,
        ownership_percentage: ownershipSum,
        market_scope: marketScopeValue,
        target_market: targetMarketValue,
        target_market_other: targetMarketOther,
        total_employees_fulltime,
        total_employees_parttime,
        male_percentage,
        female_percentage,
        core_values,
        ethics_principles,
        pic_name,
        pic_position,
        pic_phone,
        pic_email,
        supporting_documents,
      },
      { transaction: t }
    );

    const businessId = business[0].id || business_id;

    // 2. Shareholders
    if (shareholderArray.length > 0) {
      await BusinessShareholder.destroy({ where: { business_id: business_id }, transaction: t });
      for (const sh of shareholderArray) {
        await BusinessShareholder.create(
          {
            business_id: business_id,
            shareholder_name: sh.name,
            ownership_percentage: sh.ownership_percentage,
          },
          { transaction: t }
        );
      }
    }

    // 3. Departments
    if (Array.isArray(req.body.departments)) {
      await BusinessDepartment.destroy({ where: { business_id: businessId }, transaction: t });

      for (const d of req.body.departments) {
        if (d.employee_count && parseInt(d.employee_count) > 0) {
          await BusinessDepartment.create(
            {
              business_id: businessId,
              department_name: d.department_name,
              employee_count: d.employee_count,
            },
            { transaction: t }
          );
        }
      }
    }

    // 4. Certifications
    if (Array.isArray(req.body.certifications)) {
      await BusinessCertification.destroy({ where: { business_id: businessId }, transaction: t });

      let certs = [...req.body.certifications];

      // Tambahkan jika "lainnya" diisi
      if (req.body.cert_other && req.body.cert_other.trim() !== "") {
        certs.push(req.body.cert_other.trim());
      }

      for (const cert of certs) {
        await BusinessCertification.create(
          {
            business_id: businessId,
            certification_name: cert,
          },
          { transaction: t }
        );
      }
    }

    // 5. Stakeholders
    if (Array.isArray(req.body.stakeholders)) {
      await BusinessStakeholder.destroy({ where: { business_id: businessId }, transaction: t });
      for (const s of req.body.stakeholders) {
        await BusinessStakeholder.create(
          {
            business_id: businessId,
            stakeholder_type: s.type,
            stakeholder_other: s.stakeholder_other || null,
            relationship: s.relationship || null,
          },
          { transaction: t }
        );
      }
    }

    // Commit transaksi
    await t.commit();

    res.redirect("umkm/form-gri")
  } catch (error) {
    await t.rollback();
    console.error("Error saving General Information:", error);
    res.status(500).json({ error: "Failed to save General Information" });
  }
};
