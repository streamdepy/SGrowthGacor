"use strict";

module.exports = {
  async up(queryInterface) {
    // USERS
    await queryInterface.bulkInsert("users", [
      {
        name: "UMKM Owner",
        email: "umkm@example.com",
        password: "hashedpassword1",
        role: "umkm",
        avatar_url: null,
      },
      {
        name: "Auditor One",
        email: "auditor@example.com",
        password: "hashedpassword2",
        role: "auditor",
        avatar_url: null,
      },
      {
        name: "Admin",
        email: "admin@example.com",
        password: "hashedpassword3",
        role: "admin",
        avatar_url: null,
      },
    ]);

    // Ambil kembali ID user yang sudah diinsert
    const [users] = await queryInterface.sequelize.query(`SELECT id, email FROM users`);
    const umkmUser = users.find((u) => u.email === "umkm@example.com");
    const auditorUser = users.find((u) => u.email === "auditor@example.com");
    const adminUser = users.find((u) => u.email === "admin@example.com");

    // BUSINESS PROFILES (varchar PK TES1)
    await queryInterface.bulkInsert("business_profiles", [
      {
        id: "TES1",
        user_id: umkmUser.id,
        business_name: "Green Coffee Co.",
        business_scale: "small",
        industry_category: "Food & Beverage",
        location: "Padang",
        latitude: -0.9471,
        longitude: 100.4172,
      },
    ]);

    // AUDITOR PROFILES
    await queryInterface.bulkInsert("auditor_profiles", [
      {
        user_id: auditorUser.id,
        headline: "Sustainability Consultant",
        bio: "10+ years in ESG auditing",
        years_experience: 10,
        expertise_area: "Environmental, Social, Governance",
        hourly_rate: 500000,
        currency: "IDR",
        cv_url: "http://example.com/cv.pdf",
      },
    ]);

    // Ambil kembali ID auditor
    const [auditors] = await queryInterface.sequelize.query(`SELECT id, user_id FROM auditor_profiles`);
    const auditorProfile = auditors[0];

    // AUDITOR PORTFOLIOS
    await queryInterface.bulkInsert("auditor_portfolios", [
      {
        auditor_id: auditorProfile.id,
        title: "ESG Certification Project",
        description: "Audited 50 SMEs for ESG compliance",
        file_url: null,
        link_url: "http://portfolio-link.com",
      },
    ]);

    // GRI SUBMISSIONS
    await queryInterface.bulkInsert("gri_submissions", [
      {
        business_id: "TES1",
        section: "general",
        input_data: JSON.stringify({ company_size: "50 employees", sector: "F&B" }),
        period_start: "2025-01-01",
        period_end: "2025-06-30",
      },
    ]);

    const [submissions] = await queryInterface.sequelize.query(`SELECT id FROM gri_submissions`);
    const griSubmission = submissions[0];

    // SUPPORTING DOCUMENTS
    await queryInterface.bulkInsert("supporting_documents", [
      {
        submission_id: griSubmission.id,
        document_name: "Business License",
        file_url: "http://example.com/license.pdf",
      },
    ]);

    // VALIDATION RESULTS
    await queryInterface.bulkInsert("validation_results", [
      {
        submission_id: griSubmission.id,
        validator_type: "ai",
        validation_summary: "Submission looks valid",
        is_valid: true,
        ai_feedback: "Good compliance with ESG standards",
      },
    ]);

    // ESG SCORES
    await queryInterface.bulkInsert("esg_scores", [
      {
        business_id: "TES1",
        score_environment: 80.5,
        score_social: 75.0,
        score_economic: 85.0,
        score_governance: 70.0,
      },
    ]);

    // CERTIFICATES
    await queryInterface.bulkInsert("certificates", [
      {
        business_id: "TES1",
        certificate_number: "CERT-2025-001",
        certificate_url: "http://example.com/cert.pdf",
      },
    ]);

    const [certs] = await queryInterface.sequelize.query(`SELECT id FROM certificates`);
    const cert = certs[0];

    // BLOCKCHAIN HASHES
    await queryInterface.bulkInsert("blockchain_hashes", [
      {
        certificate_id: cert.id,
        hash_value: "0xABC123HASHVALUE",
        chain_name: "Polygon",
        tx_hash: "0xTRANSACTION123",
      },
    ]);

    // BOOKINGS
    await queryInterface.bulkInsert("bookings", [
      {
        business_id: "TES1",
        auditor_id: auditorProfile.id,
        status: "confirmed",
        purpose: "ESG Audit",
        scheduled_at: "2025-09-01 10:00:00",
        duration_minutes: 120,
        price: 1000000,
        currency: "IDR",
      },
    ]);

    const [bookings] = await queryInterface.sequelize.query(`SELECT id FROM bookings`);
    const booking = bookings[0];

    // BOOKING MESSAGES
    await queryInterface.bulkInsert("booking_messages", [
      {
        booking_id: booking.id,
        sender_user_id: umkmUser.id,
        message: "Hello, can we confirm the audit details?",
      },
      {
        booking_id: booking.id,
        sender_user_id: auditorUser.id,
        message: "Yes, the schedule is confirmed.",
      },
    ]);

    // PAYMENTS
    await queryInterface.bulkInsert("payments", [
      {
        booking_id: booking.id,
        amount: 1000000,
        currency: "IDR",
        method: "transfer",
        status: "paid",
        provider: "BCA",
        transaction_ref: "TRX123456",
        paid_at: "2025-08-20 12:00:00",
      },
    ]);

    // COMMUNITY POSTS
    await queryInterface.bulkInsert("community_posts", [
      {
        author_user_id: umkmUser.id,
        title: "How to start ESG reporting?",
        content: "Can someone share their experience with ESG indicators?",
      },
    ]);

    const [posts] = await queryInterface.sequelize.query(`SELECT id FROM community_posts`);
    const post = posts[0];

    // COMMUNITY COMMENTS
    await queryInterface.bulkInsert("community_comments", [
      {
        post_id: post.id,
        author_user_id: auditorUser.id,
        content: "You should start with General Information section first.",
      },
    ]);

    // CHAT LOGS
    await queryInterface.bulkInsert("chat_logs", [
      {
        user_id: umkmUser.id,
        question: "What is GRI?",
        response: "GRI stands for Global Reporting Initiative, a framework for sustainability reporting.",
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("chat_logs", null, {});
    await queryInterface.bulkDelete("community_comments", null, {});
    await queryInterface.bulkDelete("community_posts", null, {});
    await queryInterface.bulkDelete("payments", null, {});
    await queryInterface.bulkDelete("booking_messages", null, {});
    await queryInterface.bulkDelete("bookings", null, {});
    await queryInterface.bulkDelete("blockchain_hashes", null, {});
    await queryInterface.bulkDelete("certificates", null, {});
    await queryInterface.bulkDelete("esg_scores", null, {});
    await queryInterface.bulkDelete("validation_results", null, {});
    await queryInterface.bulkDelete("supporting_documents", null, {});
    await queryInterface.bulkDelete("gri_submissions", null, {});
    await queryInterface.bulkDelete("auditor_portfolios", null, {});
    await queryInterface.bulkDelete("auditor_profiles", null, {});
    await queryInterface.bulkDelete("business_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
