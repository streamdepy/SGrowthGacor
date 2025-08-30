-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2025 at 10:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sgrowth1`
--

-- --------------------------------------------------------

--
-- Table structure for table `auditor_portfolios`
--

CREATE TABLE `auditor_portfolios` (
  `id` int(11) NOT NULL,
  `auditor_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `file_url` text DEFAULT NULL,
  `link_url` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auditor_portfolios`
--

INSERT INTO `auditor_portfolios` (`id`, `auditor_id`, `title`, `description`, `file_url`, `link_url`, `created_at`) VALUES
(1, 1, 'ESG Certification Project', 'Audited 50 SMEs for ESG compliance', NULL, 'http://portfolio-link.com', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `auditor_profiles`
--

CREATE TABLE `auditor_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `headline` varchar(200) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `years_experience` int(11) DEFAULT 0,
  `expertise_area` varchar(160) DEFAULT NULL,
  `hourly_rate` decimal(12,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'IDR',
  `cv_url` text DEFAULT NULL,
  `linkedin_url` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auditor_profiles`
--

INSERT INTO `auditor_profiles` (`id`, `user_id`, `headline`, `bio`, `years_experience`, `expertise_area`, `hourly_rate`, `currency`, `cv_url`, `linkedin_url`, `created_at`) VALUES
(1, 2, 'Sustainability Consultant', '10+ years in ESG auditing', 10, 'Environmental, Social, Governance', 500000.00, 'IDR', 'http://example.com/cv.pdf', NULL, '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `blockchain_hashes`
--

CREATE TABLE `blockchain_hashes` (
  `id` int(11) NOT NULL,
  `certificate_id` int(11) NOT NULL,
  `hash_value` varchar(256) NOT NULL,
  `chain_name` varchar(60) DEFAULT 'Polygon',
  `tx_hash` varchar(120) DEFAULT NULL,
  `recorded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blockchain_hashes`
--

INSERT INTO `blockchain_hashes` (`id`, `certificate_id`, `hash_value`, `chain_name`, `tx_hash`, `recorded_at`) VALUES
(1, 1, '0xABC123HASHVALUE', 'Polygon', '0xTRANSACTION123', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `auditor_id` int(11) NOT NULL,
  `status` enum('pending','confirmed','rejected','completed','cancelled') DEFAULT 'pending',
  `purpose` varchar(200) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT 60,
  `price` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'IDR',
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `business_id`, `auditor_id`, `status`, `purpose`, `scheduled_at`, `duration_minutes`, `price`, `currency`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'confirmed', 'ESG Audit', '2025-09-01 10:00:00', 120, 1000000.00, 'IDR', NULL, '2025-08-26 12:37:11', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `booking_messages`
--

CREATE TABLE `booking_messages` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `sender_user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sent_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_messages`
--

INSERT INTO `booking_messages` (`id`, `booking_id`, `sender_user_id`, `message`, `sent_at`) VALUES
(1, 1, 1, 'Hello, can we confirm the audit details?', '2025-08-26 12:37:11'),
(2, 1, 2, 'Yes, the schedule is confirmed.', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `business_profiles`
--

CREATE TABLE `business_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `business_name` varchar(180) NOT NULL,
  `business_scale` enum('small','medium') NOT NULL,
  `industry_category` varchar(120) DEFAULT NULL,
  `location` varchar(180) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `logo_url` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_profiles`
--

INSERT INTO `business_profiles` (`id`, `user_id`, `business_name`, `business_scale`, `industry_category`, `location`, `latitude`, `longitude`, `logo_url`, `created_at`) VALUES
(1, 1, 'Green Coffee Co.', 'small', 'Food & Beverage', 'Padang', -0.94710000, 100.41720000, NULL, '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `certificate_number` varchar(80) DEFAULT NULL,
  `certificate_url` text NOT NULL,
  `issued_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `business_id`, `certificate_number`, `certificate_url`, `issued_at`) VALUES
(1, 1, 'CERT-2025-001', 'http://example.com/cert.pdf', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `chat_logs`
--

CREATE TABLE `chat_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `response` mediumtext DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_logs`
--

INSERT INTO `chat_logs` (`id`, `user_id`, `question`, `response`, `created_at`) VALUES
(1, 1, 'What is GRI?', 'GRI stands for Global Reporting Initiative, a framework for sustainability reporting.', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `community_comments`
--

CREATE TABLE `community_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `author_user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_comments`
--

INSERT INTO `community_comments` (`id`, `post_id`, `author_user_id`, `content`, `created_at`) VALUES
(1, 1, 2, 'You should start with General Information section first.', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `community_posts`
--

CREATE TABLE `community_posts` (
  `id` int(11) NOT NULL,
  `author_user_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` mediumtext NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_posts`
--

INSERT INTO `community_posts` (`id`, `author_user_id`, `title`, `content`, `created_at`) VALUES
(1, 1, 'How to start ESG reporting?', 'Can someone share their experience with ESG indicators?', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `esg_scores`
--

CREATE TABLE `esg_scores` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `score_environment` decimal(4,2) DEFAULT 0.00,
  `score_social` decimal(4,2) DEFAULT 0.00,
  `score_economic` decimal(4,2) DEFAULT 0.00,
  `score_governance` decimal(4,2) DEFAULT 0.00,
  `total_score` decimal(5,2) GENERATED ALWAYS AS (round(`score_environment` + `score_social` + `score_economic` + `score_governance`,2)) VIRTUAL,
  `scored_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esg_scores`
--

INSERT INTO `esg_scores` (`id`, `business_id`, `score_environment`, `score_social`, `score_economic`, `score_governance`, `scored_at`) VALUES
(1, 1, 80.50, 75.00, 85.00, 70.00, '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `gri_submissions`
--

CREATE TABLE `gri_submissions` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `section` enum('general','economic','environmental','social','governance') NOT NULL,
  `input_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`input_data`)),
  `period_start` date DEFAULT NULL,
  `period_end` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gri_submissions`
--

INSERT INTO `gri_submissions` (`id`, `business_id`, `section`, `input_data`, `period_start`, `period_end`, `created_at`) VALUES
(1, 1, 'general', '{\"company_size\":\"50 employees\",\"sector\":\"F&B\"}', '2025-01-01', '2025-06-30', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'IDR',
  `method` enum('transfer','va','ewallet','card','other') DEFAULT 'transfer',
  `status` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  `provider` varchar(60) DEFAULT NULL,
  `transaction_ref` varchar(120) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `amount`, `currency`, `method`, `status`, `provider`, `transaction_ref`, `paid_at`, `created_at`) VALUES
(1, 1, 1000000.00, 'IDR', 'transfer', 'paid', 'BCA', 'TRX123456', '2025-08-20 12:00:00', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supporting_documents`
--

CREATE TABLE `supporting_documents` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `document_name` varchar(160) NOT NULL,
  `file_url` text NOT NULL,
  `uploaded_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supporting_documents`
--

INSERT INTO `supporting_documents` (`id`, `submission_id`, `document_name`, `file_url`, `uploaded_at`) VALUES
(1, 1, 'Business License', 'http://example.com/license.pdf', '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(160) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('umkm','auditor','admin') NOT NULL DEFAULT 'umkm',
  `avatar_url` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar_url`, `created_at`) VALUES
(1, 'UMKM Owner', 'umkm@example.com', 'inipass', 'umkm', NULL, '2025-08-26 12:37:11'),
(2, 'Auditor One', 'auditor@example.com', 'hashedpassword2', 'auditor', NULL, '2025-08-26 12:37:11'),
(3, 'Admin', 'admin@example.com', 'hashedpassword3', 'admin', NULL, '2025-08-26 12:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `validation_results`
--

CREATE TABLE `validation_results` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `validator_type` enum('ai','auditor') NOT NULL DEFAULT 'ai',
  `validator_user_id` int(11) DEFAULT NULL,
  `validation_summary` text DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  `ai_feedback` text DEFAULT NULL,
  `validated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `validation_results`
--

INSERT INTO `validation_results` (`id`, `submission_id`, `validator_type`, `validator_user_id`, `validation_summary`, `is_valid`, `ai_feedback`, `validated_at`) VALUES
(1, 1, 'ai', NULL, 'Submission looks valid', 1, 'Good compliance with ESG standards', '2025-08-26 12:37:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `auditor_portfolios_auditor_id_auditor_profiles_fk` (`auditor_id`);

--
-- Indexes for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `auditor_profiles_user_id_users_fk` (`user_id`);

--
-- Indexes for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_cert_chain` (`certificate_id`,`chain_name`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_booking_auditor` (`auditor_id`,`scheduled_at`),
  ADD KEY `idx_booking_business` (`business_id`,`created_at`);

--
-- Indexes for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_user_id` (`sender_user_id`),
  ADD KEY `idx_booking_msg` (`booking_id`,`sent_at`);

--
-- Indexes for table `business_profiles`
--
ALTER TABLE `business_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_profiles_user_id_users_fk` (`user_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `certificate_number` (`certificate_number`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `chat_logs`
--
ALTER TABLE `chat_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `community_comments`
--
ALTER TABLE `community_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_user_id` (`author_user_id`),
  ADD KEY `idx_comments_post` (`post_id`,`created_at`);

--
-- Indexes for table `community_posts`
--
ALTER TABLE `community_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_posts_author` (`author_user_id`,`created_at`);

--
-- Indexes for table `esg_scores`
--
ALTER TABLE `esg_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_esg_business` (`business_id`,`scored_at`);

--
-- Indexes for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_submission` (`business_id`,`section`,`period_start`,`period_end`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_booking_payment` (`booking_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `supporting_documents`
--
ALTER TABLE `supporting_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `validation_results`
--
ALTER TABLE `validation_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_id` (`submission_id`),
  ADD KEY `validator_user_id` (`validator_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_messages`
--
ALTER TABLE `booking_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `business_profiles`
--
ALTER TABLE `business_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chat_logs`
--
ALTER TABLE `chat_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `community_comments`
--
ALTER TABLE `community_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `community_posts`
--
ALTER TABLE `community_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `esg_scores`
--
ALTER TABLE `esg_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supporting_documents`
--
ALTER TABLE `supporting_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `validation_results`
--
ALTER TABLE `validation_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  ADD CONSTRAINT `auditor_portfolios_auditor_id_auditor_profiles_fk` FOREIGN KEY (`auditor_id`) REFERENCES `auditor_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `auditor_portfolios_ibfk_1` FOREIGN KEY (`auditor_id`) REFERENCES `auditor_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  ADD CONSTRAINT `auditor_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `auditor_profiles_user_id_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  ADD CONSTRAINT `blockchain_hashes_ibfk_1` FOREIGN KEY (`certificate_id`) REFERENCES `certificates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`auditor_id`) REFERENCES `auditor_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD CONSTRAINT `booking_messages_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_messages_ibfk_2` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `business_profiles`
--
ALTER TABLE `business_profiles`
  ADD CONSTRAINT `business_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `business_profiles_user_id_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chat_logs`
--
ALTER TABLE `chat_logs`
  ADD CONSTRAINT `chat_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `community_comments`
--
ALTER TABLE `community_comments`
  ADD CONSTRAINT `community_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `community_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `community_comments_ibfk_2` FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `community_posts`
--
ALTER TABLE `community_posts`
  ADD CONSTRAINT `community_posts_ibfk_1` FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `esg_scores`
--
ALTER TABLE `esg_scores`
  ADD CONSTRAINT `esg_scores_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  ADD CONSTRAINT `gri_submissions_business_id_business_profiles_fk` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gri_submissions_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supporting_documents`
--
ALTER TABLE `supporting_documents`
  ADD CONSTRAINT `supporting_documents_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `gri_submissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `validation_results`
--
ALTER TABLE `validation_results`
  ADD CONSTRAINT `validation_results_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `gri_submissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `validation_results_ibfk_2` FOREIGN KEY (`validator_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
