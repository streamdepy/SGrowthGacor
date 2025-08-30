"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(160), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: {
        type: Sequelize.ENUM("umkm", "auditor", "admin"),
        allowNull: false,
        defaultValue: "umkm",
      },
      avatar_url: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });

    // BUSINESS PROFILES
    await queryInterface.createTable("business_profiles", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      business_name: { type: Sequelize.STRING(180), allowNull: false },
      business_scale: { type: Sequelize.ENUM("small", "medium"), allowNull: false },
      industry_category: { type: Sequelize.STRING(120) },
      location: { type: Sequelize.STRING(180) },
      latitude: { type: Sequelize.DECIMAL(10, 8) },
      longitude: { type: Sequelize.DECIMAL(11, 8) },
      logo_url: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("business_profiles", {
      fields: ["user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // AUDITOR PROFILES
    await queryInterface.createTable("auditor_profiles", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      headline: { type: Sequelize.STRING(200) },
      bio: { type: Sequelize.TEXT },
      years_experience: { type: Sequelize.INTEGER, defaultValue: 0 },
      expertise_area: { type: Sequelize.STRING(160) },
      hourly_rate: { type: Sequelize.DECIMAL(12, 2) },
      currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
      cv_url: { type: Sequelize.TEXT },
      linkedin_url: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("auditor_profiles", {
      fields: ["user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // AUDITOR PORTFOLIOS
    await queryInterface.createTable("auditor_portfolios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      auditor_id: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING(200), allowNull: false },
      description: { type: Sequelize.TEXT },
      file_url: { type: Sequelize.TEXT },
      link_url: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("auditor_portfolios", {
      fields: ["auditor_id"],
      type: "foreign key",
      references: { table: "auditor_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // GRI SUBMISSIONS
    await queryInterface.createTable("gri_submissions", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false },
      section: {
        type: Sequelize.ENUM("general", "economic", "environmental", "social", "governance"),
        allowNull: false,
      },
      input_data: { type: Sequelize.JSON },
      period_start: { type: Sequelize.DATEONLY },
      period_end: { type: Sequelize.DATEONLY },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("gri_submissions", {
      fields: ["business_id"],
      type: "foreign key",
      references: { table: "business_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("gri_submissions", {
      fields: ["business_id", "section", "period_start", "period_end"],
      type: "unique",
      name: "uniq_submission",
    });

    // SUPPORTING DOCUMENTS
    await queryInterface.createTable("supporting_documents", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      submission_id: { type: Sequelize.INTEGER, allowNull: false },
      document_name: { type: Sequelize.STRING(160), allowNull: false },
      file_url: { type: Sequelize.TEXT, allowNull: false },
      uploaded_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("supporting_documents", {
      fields: ["submission_id"],
      type: "foreign key",
      references: { table: "gri_submissions", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // VALIDATION RESULTS
    await queryInterface.createTable("validation_results", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      submission_id: { type: Sequelize.INTEGER, allowNull: false },
      validator_type: { type: Sequelize.ENUM("ai", "auditor"), defaultValue: "ai" },
      validator_user_id: { type: Sequelize.INTEGER },
      validation_summary: { type: Sequelize.TEXT },
      is_valid: { type: Sequelize.BOOLEAN },
      ai_feedback: { type: Sequelize.TEXT },
      validated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("validation_results", {
      fields: ["submission_id"],
      type: "foreign key",
      references: { table: "gri_submissions", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("validation_results", {
      fields: ["validator_user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // ESG SCORES
    await queryInterface.createTable("esg_scores", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false },
      score_environment: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      score_social: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      score_economic: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      score_governance: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      scored_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("esg_scores", {
      fields: ["business_id"],
      type: "foreign key",
      references: { table: "business_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // CERTIFICATES
    await queryInterface.createTable("certificates", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false },
      certificate_number: { type: Sequelize.STRING(80), unique: true },
      certificate_url: { type: Sequelize.TEXT, allowNull: false },
      issued_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("certificates", {
      fields: ["business_id"],
      type: "foreign key",
      references: { table: "business_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // BLOCKCHAIN HASHES
    await queryInterface.createTable("blockchain_hashes", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      certificate_id: { type: Sequelize.INTEGER, allowNull: false },
      hash_value: { type: Sequelize.STRING(256), allowNull: false },
      chain_name: { type: Sequelize.STRING(60), defaultValue: "Polygon" },
      tx_hash: { type: Sequelize.STRING(120) },
      recorded_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("blockchain_hashes", {
      fields: ["certificate_id"],
      type: "foreign key",
      references: { table: "certificates", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("blockchain_hashes", {
      fields: ["certificate_id", "chain_name"],
      type: "unique",
      name: "uniq_cert_chain",
    });

    // BOOKINGS
    await queryInterface.createTable("bookings", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: { type: Sequelize.INTEGER, allowNull: false },
      auditor_id: { type: Sequelize.INTEGER, allowNull: false },
      status: {
        type: Sequelize.ENUM("pending", "confirmed", "rejected", "completed", "cancelled"),
        defaultValue: "pending",
      },
      purpose: { type: Sequelize.STRING(200) },
      scheduled_at: { type: Sequelize.DATE },
      duration_minutes: { type: Sequelize.INTEGER, defaultValue: 60 },
      price: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0.0 },
      currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
      notes: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addConstraint("bookings", {
      fields: ["business_id"],
      type: "foreign key",
      references: { table: "business_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("bookings", {
      fields: ["auditor_id"],
      type: "foreign key",
      references: { table: "auditor_profiles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // BOOKING MESSAGES
    await queryInterface.createTable("booking_messages", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      booking_id: { type: Sequelize.INTEGER, allowNull: false },
      sender_user_id: { type: Sequelize.INTEGER, allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      sent_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("booking_messages", {
      fields: ["booking_id"],
      type: "foreign key",
      references: { table: "bookings", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("booking_messages", {
      fields: ["sender_user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // PAYMENTS
    await queryInterface.createTable("payments", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      booking_id: { type: Sequelize.INTEGER, allowNull: false },
      amount: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
      currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
      method: {
        type: Sequelize.ENUM("transfer", "va", "ewallet", "card", "other"),
        defaultValue: "transfer",
      },
      status: {
        type: Sequelize.ENUM("pending", "paid", "failed", "refunded"),
        defaultValue: "pending",
      },
      provider: { type: Sequelize.STRING(60) },
      transaction_ref: { type: Sequelize.STRING(120) },
      paid_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("payments", {
      fields: ["booking_id"],
      type: "foreign key",
      references: { table: "bookings", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("payments", {
      fields: ["booking_id"],
      type: "unique",
      name: "uniq_booking_payment",
    });

    // COMMUNITY POSTS
    await queryInterface.createTable("community_posts", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      author_user_id: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING(200), allowNull: false },
      content: { type: Sequelize.TEXT("medium"), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("community_posts", {
      fields: ["author_user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // COMMUNITY COMMENTS
    await queryInterface.createTable("community_comments", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      post_id: { type: Sequelize.INTEGER, allowNull: false },
      author_user_id: { type: Sequelize.INTEGER, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("community_comments", {
      fields: ["post_id"],
      type: "foreign key",
      references: { table: "community_posts", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("community_comments", {
      fields: ["author_user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // CHAT LOGS
    await queryInterface.createTable("chat_logs", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      question: { type: Sequelize.TEXT, allowNull: false },
      response: { type: Sequelize.TEXT("medium") },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    });
    await queryInterface.addConstraint("chat_logs", {
      fields: ["user_id"],
      type: "foreign key",
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("chat_logs");
    await queryInterface.dropTable("community_comments");
    await queryInterface.dropTable("community_posts");
    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("booking_messages");
    await queryInterface.dropTable("bookings");
    await queryInterface.dropTable("blockchain_hashes");
    await queryInterface.dropTable("certificates");
    await queryInterface.dropTable("esg_scores");
    await queryInterface.dropTable("validation_results");
    await queryInterface.dropTable("supporting_documents");
    await queryInterface.dropTable("gri_submissions");
    await queryInterface.dropTable("auditor_portfolios");
    await queryInterface.dropTable("auditor_profiles");
    await queryInterface.dropTable("business_profiles");
    await queryInterface.dropTable("users");
  },
};
