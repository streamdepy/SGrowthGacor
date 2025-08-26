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
      avatar_url: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // BUSINESS
    await queryInterface.createTable("business_profiles", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      business_name: { type: Sequelize.STRING(180), allowNull: false },
      business_scale: {
        type: Sequelize.ENUM("small", "medium"),
        allowNull: false,
      },
      industry_category: Sequelize.STRING(120),
      location: Sequelize.STRING(180),
      logo_url: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // AUDITOR PROFILES
    await queryInterface.createTable("auditor_profiles", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      headline: Sequelize.STRING(200),
      bio: Sequelize.TEXT,
      years_experience: { type: Sequelize.INTEGER, defaultValue: 0 },
      expertise_area: Sequelize.STRING(160),
      hourly_rate: Sequelize.DECIMAL(12, 2),
      currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
      cv_url: Sequelize.TEXT,
      linkedin_url: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // AUDITOR PORTFOLIOS
    await queryInterface.createTable("auditor_portfolios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      auditor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "auditor_profiles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: { type: Sequelize.STRING(200), allowNull: false },
      description: Sequelize.TEXT,
      file_url: Sequelize.TEXT,
      link_url: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // GRI SUBMISSIONS
    await queryInterface.createTable(
      "gri_submissions",
      {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        business_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "business_profiles", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        gri_code: { type: Sequelize.STRING(50), allowNull: false },
        section: {
          type: Sequelize.ENUM("general", "economic", "environmental", "social"),
          allowNull: false,
        },
        input_data: Sequelize.JSON,
        period_start: Sequelize.DATE,
        period_end: Sequelize.DATE,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        uniqueKeys: {
          uniq_submission: {
            fields: ["business_id", "gri_code", "period_start", "period_end"],
          },
        },
      }
    );

    // SUPPORTING DOCUMENTS
    await queryInterface.createTable("supporting_documents", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      submission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "gri_submissions", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      document_name: { type: Sequelize.STRING(160), allowNull: false },
      file_url: { type: Sequelize.TEXT, allowNull: false },
      uploaded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // VALIDATION RESULTS
    await queryInterface.createTable("validation_results", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      submission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "gri_submissions", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      validator_type: {
        type: Sequelize.ENUM("ai", "auditor"),
        allowNull: false,
        defaultValue: "ai",
      },
      validator_user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      validation_summary: Sequelize.TEXT,
      is_valid: Sequelize.BOOLEAN,
      ai_feedback: Sequelize.TEXT,
      validated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ESG SCORES
    await queryInterface.createTable("esg_scores", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "business_profiles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      score_environment: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      score_social: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      score_economic: { type: Sequelize.DECIMAL(4, 2), defaultValue: 0.0 },
      scored_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // CHAT LOGS
    await queryInterface.createTable("chat_logs", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      question: { type: Sequelize.TEXT, allowNull: false },
      response: Sequelize.TEXT("medium"),
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // CERTIFICATES
    await queryInterface.createTable("certificates", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "business_profiles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      certificate_number: { type: Sequelize.STRING(80), unique: true },
      certificate_url: { type: Sequelize.TEXT, allowNull: false },
      issued_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // BLOCKCHAIN HASHES
    await queryInterface.createTable("blockchain_hashes", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        certificate_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "certificates", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        hash_value: { type: Sequelize.STRING(256), allowNull: false },
        chain_name: { type: Sequelize.STRING(60), defaultValue: "Polygon" },
        tx_hash: Sequelize.STRING(120),
        recorded_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }, {
        uniqueKeys: {
          uniq_cert_chain: {
            fields: ["certificate_id", "chain_name"],
          }
        }
      });
      

    // BOOKINGS
    await queryInterface.createTable("bookings", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "business_profiles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      auditor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "auditor_profiles", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("pending", "confirmed", "rejected", "completed", "cancelled"),
        defaultValue: "pending",
      },
      purpose: Sequelize.STRING(200),
      scheduled_at: Sequelize.DATE,
      duration_minutes: { type: Sequelize.INTEGER, defaultValue: 60 },
      price: { type: Sequelize.DECIMAL(12, 2), defaultValue: 0.0 },
      currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
      notes: Sequelize.TEXT,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // BOOKING MESSAGES
    await queryInterface.createTable("booking_messages", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "bookings", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      sender_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      message: { type: Sequelize.TEXT, allowNull: false },
      sent_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // PAYMENTS
    await queryInterface.createTable("payments", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        booking_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "bookings", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        amount: { type: Sequelize.DECIMAL(12,2), allowNull: false },
        currency: { type: Sequelize.STRING(10), defaultValue: "IDR" },
        method: { 
          type: Sequelize.ENUM("transfer","va","ewallet","card","other"),
          defaultValue: "transfer"
        },
        status: { 
          type: Sequelize.ENUM("pending","paid","failed","refunded"),
          defaultValue: "pending"
        },
        provider: Sequelize.STRING(60),
        transaction_ref: Sequelize.STRING(120),
        paid_at: Sequelize.DATE,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      }, {
        uniqueKeys: {
          uniq_booking_payment: {
            fields: ["booking_id"],
          }
        }
      });
      

    // COMMUNITY POSTS
    await queryInterface.createTable("community_posts", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      author_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: { type: Sequelize.STRING(200), allowNull: false },
      content: { type: Sequelize.TEXT("medium"), allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // COMMUNITY COMMENTS
    await queryInterface.createTable("community_comments", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "community_posts", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      author_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      content: { type: Sequelize.TEXT, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("community_comments");
    await queryInterface.dropTable("community_posts");
    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("booking_messages");
    await queryInterface.dropTable("bookings");
    await queryInterface.dropTable("blockchain_hashes");
    await queryInterface.dropTable("certificates");
    await queryInterface.dropTable("chat_logs");
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
