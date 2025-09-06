-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2025 at 11:31 AM
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
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `file_url` text DEFAULT NULL,
  `link_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auditor_profiles`
--

CREATE TABLE `auditor_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `years_experience` int(11) DEFAULT NULL,
  `expertise_area` varchar(255) DEFAULT NULL,
  `hourly_rate` decimal(15,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `cv_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blockchain_hashes`
--

CREATE TABLE `blockchain_hashes` (
  `id` int(11) NOT NULL,
  `certificate_id` int(11) NOT NULL,
  `hash_value` varchar(255) DEFAULT NULL,
  `chain_name` varchar(50) DEFAULT NULL,
  `tx_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `auditor_id` int(11) NOT NULL,
  `status` enum('pending','confirmed','rejected') DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_messages`
--

CREATE TABLE `booking_messages` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `sender_user_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_certifications`
--

CREATE TABLE `business_certifications` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `certification_name` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_certifications`
--

INSERT INTO `business_certifications` (`id`, `business_id`, `certification_name`) VALUES
(1, 'TES123YA', 'ISO 9001'),
(2, 'TES123YA', 'ISO 14001'),
(3, 'TES123YA', 'ISO 45001');

-- --------------------------------------------------------

--
-- Table structure for table `business_departments`
--

CREATE TABLE `business_departments` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `employee_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_departments`
--

INSERT INTO `business_departments` (`id`, `business_id`, `department_name`, `employee_count`) VALUES
(1, 'TES123YA', 'HR', 2),
(2, 'TES123YA', 'Marketing', 3),
(3, 'TES123YA', 'IT', 4),
(4, 'TES123YA', 'Finance', 3);

-- --------------------------------------------------------

--
-- Table structure for table `business_profiles`
--

CREATE TABLE `business_profiles` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `business_name` varchar(180) NOT NULL,
  `established_year` year(4) DEFAULT NULL,
  `legal_form` varchar(120) DEFAULT NULL,
  `industry_type` enum('Manufaktur','Jasa','Perdagangan','Pertanian/Perikanan','Teknologi','Lainnya') DEFAULT NULL,
  `headquarters` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `products_offered` text DEFAULT NULL,
  `ownership_percentage` decimal(5,2) DEFAULT NULL,
  `market_scope` varchar(255) DEFAULT NULL,
  `target_market` varchar(255) DEFAULT NULL,
  `target_market_other` varchar(255) DEFAULT NULL,
  `total_employees_fulltime` int(11) DEFAULT NULL,
  `total_employees_parttime` int(11) DEFAULT NULL,
  `male_percentage` decimal(5,2) DEFAULT NULL,
  `female_percentage` decimal(5,2) DEFAULT NULL,
  `core_values` text DEFAULT NULL,
  `ethics_principles` text DEFAULT NULL,
  `pic_name` varchar(120) DEFAULT NULL,
  `pic_position` varchar(120) DEFAULT NULL,
  `pic_phone` varchar(50) DEFAULT NULL,
  `pic_email` varchar(120) DEFAULT NULL,
  `supporting_documents` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_profiles`
--

INSERT INTO `business_profiles` (`id`, `user_id`, `business_name`, `established_year`, `legal_form`, `industry_type`, `headquarters`, `city`, `province`, `products_offered`, `ownership_percentage`, `market_scope`, `target_market`, `target_market_other`, `total_employees_fulltime`, `total_employees_parttime`, `male_percentage`, `female_percentage`, `core_values`, `ethics_principles`, `pic_name`, `pic_position`, `pic_phone`, `pic_email`, `supporting_documents`, `created_at`) VALUES
('TES123YA', 1, 'Universitas Andalas', '2025', 'CV', 'Teknologi', 'jauh', 'padang', 'Sumatera Barat', 'Banyakk', 99.99, 'nasional, global', 'b2b, b2c', NULL, 12, 3, 40.00, 57.00, 'tetap jadi orang baik', 'mahall king', 'agif', 'ceo', '081298076037', 'malghifari2096@gmail.com', 'Gemini_Generated_Image_sefxt0sefxt0sefx.png', '2025-09-05 11:49:08');

-- --------------------------------------------------------

--
-- Table structure for table `business_shareholders`
--

CREATE TABLE `business_shareholders` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `shareholder_name` varchar(180) NOT NULL,
  `ownership_percentage` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_shareholders`
--

INSERT INTO `business_shareholders` (`id`, `business_id`, `shareholder_name`, `ownership_percentage`) VALUES
(19, 'TES123YA', 'alghifari', 60.00),
(20, 'TES123YA', 'jokowi', 30.00),
(21, 'TES123YA', 'badang', 9.99);

-- --------------------------------------------------------

--
-- Table structure for table `business_stakeholders`
--

CREATE TABLE `business_stakeholders` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `stakeholder_type` enum('Pelanggan','Karyawan','Pemasok','Pemerintah/Regulator','Investor/Shareholder','Masyarakat Lokal','LSM/Komunitas','Lainnya') DEFAULT NULL,
  `stakeholder_other` varchar(255) DEFAULT NULL,
  `relationship` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_stakeholders`
--

INSERT INTO `business_stakeholders` (`id`, `business_id`, `stakeholder_type`, `stakeholder_other`, `relationship`) VALUES
(57, 'TES123YA', 'Pelanggan', NULL, 'pembelinya'),
(58, 'TES123YA', 'Karyawan', NULL, 'staff nya'),
(59, 'TES123YA', 'Pemasok', NULL, NULL),
(60, 'TES123YA', 'Investor/Shareholder', NULL, 'tuan');

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `certificate_number` varchar(255) DEFAULT NULL,
  `certificate_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_logs`
--

CREATE TABLE `chat_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_comments`
--

CREATE TABLE `community_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `author_user_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_posts`
--

CREATE TABLE `community_posts` (
  `id` int(11) NOT NULL,
  `author_user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `esg_scores`
--

CREATE TABLE `esg_scores` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `score_environment` decimal(5,2) DEFAULT NULL,
  `score_social` decimal(5,2) DEFAULT NULL,
  `score_economic` decimal(5,2) DEFAULT NULL,
  `score_governance` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gri_economics`
--

CREATE TABLE `gri_economics` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `unit_name` varchar(150) NOT NULL,
  `reporting_period` varchar(100) NOT NULL,
  `responsible_person` varchar(150) NOT NULL,
  `revenue` decimal(15,2) DEFAULT 0.00,
  `general_admin_expenses` decimal(15,2) DEFAULT 0.00,
  `general_admin_notes` text DEFAULT NULL,
  `salary_expenses` decimal(15,2) DEFAULT 0.00,
  `salary_employee_notes` text DEFAULT NULL,
  `transport_expenses` decimal(15,2) DEFAULT 0.00,
  `transport_notes` text DEFAULT NULL,
  `fuel_expenses` decimal(15,2) DEFAULT 0.00,
  `electricity_expenses` decimal(15,2) DEFAULT 0.00,
  `internet_expenses` decimal(15,2) DEFAULT 0.00,
  `telephone_expenses` decimal(15,2) DEFAULT 0.00,
  `water_expenses` decimal(15,2) DEFAULT 0.00,
  `other_operating_expenses` decimal(15,2) DEFAULT 0.00,
  `other_operating_notes` text DEFAULT NULL,
  `non_operating_expenses` decimal(15,2) DEFAULT 0.00,
  `non_operating_notes` text DEFAULT NULL,
  `unusual_expenses_flag` tinyint(1) DEFAULT 0,
  `unusual_expenses_notes` text DEFAULT NULL,
  `accounting_adjustment_flag` tinyint(1) DEFAULT 0,
  `accounting_adjustment_notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gri_submissions`
--

CREATE TABLE `gri_submissions` (
  `id` int(11) NOT NULL,
  `business_id` varchar(255) NOT NULL,
  `section` enum('general','economic','environmental','social') DEFAULT NULL,
  `input_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`input_data`)),
  `period_start` date DEFAULT NULL,
  `period_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `method` varchar(50) DEFAULT NULL,
  `status` enum('pending','paid','failed') DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `transaction_ref` varchar(255) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supporting_documents`
--

CREATE TABLE `supporting_documents` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `file_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('umkm','admin') DEFAULT 'umkm',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Muhammad Raihan Alghifari', 'umkmn@example.com', '$2b$10$so2CKvgyls5PAc6VJn2rfu84u/IBEoGDPD4GkKemWNckQpBEhhCKS', 'umkm', '2025-09-03 15:54:37');

-- --------------------------------------------------------

--
-- Table structure for table `validation_results`
--

CREATE TABLE `validation_results` (
  `id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `validator_type` enum('ai','auditor') DEFAULT NULL,
  `validation_summary` text DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  `ai_feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `auditor_id` (`auditor_id`);

--
-- Indexes for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `certificate_id` (`certificate_id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`),
  ADD KEY `auditor_id` (`auditor_id`);

--
-- Indexes for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `sender_user_id` (`sender_user_id`);

--
-- Indexes for table `business_certifications`
--
ALTER TABLE `business_certifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `business_departments`
--
ALTER TABLE `business_departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `business_profiles`
--
ALTER TABLE `business_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_business_profiles_users` (`user_id`);

--
-- Indexes for table `business_shareholders`
--
ALTER TABLE `business_shareholders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `business_stakeholders`
--
ALTER TABLE `business_stakeholders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
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
  ADD KEY `post_id` (`post_id`),
  ADD KEY `author_user_id` (`author_user_id`);

--
-- Indexes for table `community_posts`
--
ALTER TABLE `community_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_user_id` (`author_user_id`);

--
-- Indexes for table `esg_scores`
--
ALTER TABLE `esg_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `gri_economics`
--
ALTER TABLE `gri_economics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gri_economics_business` (`business_id`);

--
-- Indexes for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

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
  ADD KEY `submission_id` (`submission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_messages`
--
ALTER TABLE `booking_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_certifications`
--
ALTER TABLE `business_certifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `business_departments`
--
ALTER TABLE `business_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `business_shareholders`
--
ALTER TABLE `business_shareholders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `business_stakeholders`
--
ALTER TABLE `business_stakeholders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_logs`
--
ALTER TABLE `chat_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `community_comments`
--
ALTER TABLE `community_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `community_posts`
--
ALTER TABLE `community_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `esg_scores`
--
ALTER TABLE `esg_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gri_economics`
--
ALTER TABLE `gri_economics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supporting_documents`
--
ALTER TABLE `supporting_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `validation_results`
--
ALTER TABLE `validation_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auditor_portfolios`
--
ALTER TABLE `auditor_portfolios`
  ADD CONSTRAINT `auditor_portfolios_ibfk_1` FOREIGN KEY (`auditor_id`) REFERENCES `auditor_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `auditor_profiles`
--
ALTER TABLE `auditor_profiles`
  ADD CONSTRAINT `auditor_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blockchain_hashes`
--
ALTER TABLE `blockchain_hashes`
  ADD CONSTRAINT `blockchain_hashes_ibfk_1` FOREIGN KEY (`certificate_id`) REFERENCES `certificates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`auditor_id`) REFERENCES `auditor_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_messages`
--
ALTER TABLE `booking_messages`
  ADD CONSTRAINT `booking_messages_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_messages_ibfk_2` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_certifications`
--
ALTER TABLE `business_certifications`
  ADD CONSTRAINT `business_certifications_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_departments`
--
ALTER TABLE `business_departments`
  ADD CONSTRAINT `business_departments_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_profiles`
--
ALTER TABLE `business_profiles`
  ADD CONSTRAINT `fk_business_profiles_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `business_shareholders`
--
ALTER TABLE `business_shareholders`
  ADD CONSTRAINT `business_shareholders_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_stakeholders`
--
ALTER TABLE `business_stakeholders`
  ADD CONSTRAINT `business_stakeholders_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chat_logs`
--
ALTER TABLE `chat_logs`
  ADD CONSTRAINT `chat_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `community_comments`
--
ALTER TABLE `community_comments`
  ADD CONSTRAINT `community_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `community_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `community_comments_ibfk_2` FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `community_posts`
--
ALTER TABLE `community_posts`
  ADD CONSTRAINT `community_posts_ibfk_1` FOREIGN KEY (`author_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `esg_scores`
--
ALTER TABLE `esg_scores`
  ADD CONSTRAINT `esg_scores_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gri_economics`
--
ALTER TABLE `gri_economics`
  ADD CONSTRAINT `fk_gri_economics_business` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gri_submissions`
--
ALTER TABLE `gri_submissions`
  ADD CONSTRAINT `gri_submissions_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `business_profiles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supporting_documents`
--
ALTER TABLE `supporting_documents`
  ADD CONSTRAINT `supporting_documents_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `gri_submissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `validation_results`
--
ALTER TABLE `validation_results`
  ADD CONSTRAINT `validation_results_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `gri_submissions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
