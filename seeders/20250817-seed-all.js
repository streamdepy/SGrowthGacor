"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "UMKM Test",
        email: "umkm@test.com",
        password: "hashed_password",
        role: "umkm",
        created_at: new Date()
      },
      {
        id: 2,
        name: "Auditor Test",
        email: "auditor@test.com",
        password: "hashed_password",
        role: "auditor",
        created_at: new Date()
      },
      {
        id: 3,
        name: "Admin Test",
        email: "admin@test.com",
        password: "hashed_password",
        role: "admin",
        created_at: new Date()
      }
    ]);

    // BUSINESS PROFILES
    await queryInterface.bulkInsert("business_profiles", [
      {
        id: 1,
        user_id: 1,
        business_name: "Warung Kopi Mantap",
        business_scale: "small",
        industry_category: "Food & Beverage",
        location: "Padang",
        created_at: new Date()
      }
    ]);

    // AUDITOR PROFILES
    await queryInterface.bulkInsert("auditor_profiles", [
      {
        id: 1,
        user_id: 2,
        headline: "Sustainability Auditor",
        bio: "Berpengalaman 5 tahun dalam ESG reporting",
        years_experience: 5,
        expertise_area: "Environmental",
        hourly_rate: 500000,
        currency: "IDR",
        created_at: new Date()
      }
    ]);

    // AUDITOR PORTFOLIOS
    await queryInterface.bulkInsert("auditor_portfolios", [
      {
        id: 1,
        auditor_id: 1,
        title: "Audit ESG 2024",
        description: "Audit perusahaan manufaktur terkait GRI reporting",
        file_url: null,
        link_url: "https://linkedin.com/testportfolio",
        created_at: new Date()
      }
    ]);

    // GRI SUBMISSIONS
    await queryInterface.bulkInsert("gri_submissions", [
      {
        id: 1,
        business_id: 1,
        gri_code: "GRI 302-1",
        section: "environmental",
        input_data: JSON.stringify({ energy_consumed: "1000 kWh" }),
        period_start: new Date("2025-01-01"),
        period_end: new Date("2025-06-30"),
        created_at: new Date()
      }
    ]);

    // SUPPORTING DOCUMENTS
    await queryInterface.bulkInsert("supporting_documents", [
      {
        id: 1,
        submission_id: 1,
        document_name: "Laporan Energi",
        file_url: "https://example.com/docs/energi.pdf",
        uploaded_at: new Date()
      }
    ]);

    // VALIDATION RESULTS
    await queryInterface.bulkInsert("validation_results", [
      {
        id: 1,
        submission_id: 1,
        validator_type: "ai",
        validator_user_id: null,
        validation_summary: "Data sesuai format",
        is_valid: true,
        ai_feedback: "Bagus, data sudah valid",
        validated_at: new Date()
      }
    ]);

    // ESG SCORES
    await queryInterface.bulkInsert("esg_scores", [
      {
        id: 1,
        business_id: 1,
        score_environment: 70.5,
        score_social: 65.0,
        score_economic: 80.0,
        scored_at: new Date()
      }
    ]);

    // CHAT LOGS
    await queryInterface.bulkInsert("chat_logs", [
      {
        id: 1,
        user_id: 1,
        question: "Apa itu indikator GRI?",
        response: "GRI adalah standar global untuk pelaporan keberlanjutan.",
        created_at: new Date()
      }
    ]);

    // CERTIFICATES
    await queryInterface.bulkInsert("certificates", [
      {
        id: 1,
        business_id: 1,
        certificate_number: "CERT-2025-001",
        certificate_url: "https://example.com/certificates/sgrowth.pdf",
        issued_at: new Date()
      }
    ]);

    // BLOCKCHAIN HASHES
    await queryInterface.bulkInsert("blockchain_hashes", [
      {
        id: 1,
        certificate_id: 1,
        hash_value: "0xabcdef1234567890",
        chain_name: "Polygon",
        tx_hash: "0x12345abcde",
        recorded_at: new Date()
      }
    ]);

    // BOOKINGS
    await queryInterface.bulkInsert("bookings", [
      {
        id: 1,
        business_id: 1,
        auditor_id: 1,
        status: "confirmed",
        purpose: "Konsultasi GRI",
        scheduled_at: new Date("2025-08-20 10:00:00"),
        duration_minutes: 60,
        price: 750000,
        currency: "IDR",
        notes: "Bahas indikator GRI 302-1",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // BOOKING MESSAGES
    await queryInterface.bulkInsert("booking_messages", [
      {
        id: 1,
        booking_id: 1,
        sender_user_id: 1,
        message: "Halo, apakah konsultasi bisa dilakukan online?",
        sent_at: new Date()
      },
      {
        id: 2,
        booking_id: 1,
        sender_user_id: 2,
        message: "Bisa, kita pakai Zoom ya.",
        sent_at: new Date()
      }
    ]);

    // PAYMENTS
    await queryInterface.bulkInsert("payments", [
      {
        id: 1,
        booking_id: 1,
        amount: 750000,
        currency: "IDR",
        method: "transfer",
        status: "paid",
        provider: "Midtrans",
        transaction_ref: "MID-2025-0001",
        paid_at: new Date(),
        created_at: new Date()
      }
    ]);

    // COMMUNITY POSTS
    await queryInterface.bulkInsert("community_posts", [
      {
        id: 1,
        author_user_id: 1,
        title: "Selamat datang di Sgrowth!",
        content: "Ini adalah postingan perdana di komunitas global kita.",
        created_at: new Date()
      }
    ]);

    // COMMUNITY COMMENTS
    await queryInterface.bulkInsert("community_comments", [
      {
        id: 1,
        post_id: 1,
        author_user_id: 2,
        content: "Mantap, mari kita bangun komunitas ini.",
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("community_comments", null, {});
    await queryInterface.bulkDelete("community_posts", null, {});
    await queryInterface.bulkDelete("payments", null, {});
    await queryInterface.bulkDelete("booking_messages", null, {});
    await queryInterface.bulkDelete("bookings", null, {});
    await queryInterface.bulkDelete("blockchain_hashes", null, {});
    await queryInterface.bulkDelete("certificates", null, {});
    await queryInterface.bulkDelete("chat_logs", null, {});
    await queryInterface.bulkDelete("esg_scores", null, {});
    await queryInterface.bulkDelete("validation_results", null, {});
    await queryInterface.bulkDelete("supporting_documents", null, {});
    await queryInterface.bulkDelete("gri_submissions", null, {});
    await queryInterface.bulkDelete("auditor_portfolios", null, {});
    await queryInterface.bulkDelete("auditor_profiles", null, {});
    await queryInterface.bulkDelete("business_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
  }
};
