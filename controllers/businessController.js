const { BusinessProfile, BusinessShareholder, BusinessDepartment, BusinessCertification, BusinessStakeholder } = require("../models");

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
      city,
      province,
      products_offered,

      // Bagian Kepemilikan
      shareholders, // array [{name, ownership_percentage}]

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

      // Kontak
      pic_name,
      pic_position,
      pic_phone,
      pic_email,
      supporting_documents,
    } = req.body;

    // 1. Insert / Update Business Profile
    const business = await BusinessProfile.upsert(
      {
        id: business_id,
        user_id: userId,
        business_name,
        established_year,
        legal_form,
        industry_type,
        headquarters,
        city,
        province,
        products_offered,
        ownership_percentage: shareholders?.reduce((acc, s) => acc + Number(s.ownership_percentage || 0), 0),
        market_scope,
        target_market,
        target_market_other,
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
    if (Array.isArray(shareholders)) {
      await BusinessShareholder.destroy({ where: { business_id: businessId }, transaction: t });
      for (const sh of shareholders) {
        await BusinessShareholder.create({ business_id: businessId, shareholder_name: sh.name, ownership_percentage: sh.ownership_percentage }, { transaction: t });
      }
    }

    // 3. Departments
    if (Array.isArray(departments)) {
      await BusinessDepartment.destroy({ where: { business_id: businessId }, transaction: t });
      for (const d of departments) {
        await BusinessDepartment.create({ business_id: businessId, department_name: d.department_name, employee_count: d.employee_count }, { transaction: t });
      }
    }

    // 4. Certifications
    if (Array.isArray(certifications)) {
      await BusinessCertification.destroy({ where: { business_id: businessId }, transaction: t });
      for (const cert of certifications) {
        await BusinessCertification.create({ business_id: businessId, certification_name: cert }, { transaction: t });
      }
    }

    // 5. Stakeholders
    if (Array.isArray(stakeholders)) {
      await BusinessStakeholder.destroy({ where: { business_id: businessId }, transaction: t });
      for (const s of stakeholders) {
        await BusinessStakeholder.create(
          {
            business_id: businessId,
            stakeholder_type: s.type,
            stakeholder_other: s.stakeholder_other,
            relationship: s.relationship,
          },
          { transaction: t }
        );
      }
    }

    // Commit transaksi
    await t.commit();

    res.status(200).json({ message: "General Information saved successfully", business_id: businessId });
  } catch (error) {
    await t.rollback();
    console.error("Error saving General Information:", error);
    res.status(500).json({ error: "Failed to save General Information" });
  }
};
