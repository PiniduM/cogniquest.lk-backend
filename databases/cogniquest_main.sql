-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: cogniquest_main
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `candidate_id` int NOT NULL,
  `competition_id` mediumint NOT NULL,
  `applied_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `additional_data` json DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  UNIQUE KEY `no_duplicates` (`competition_id`,`candidate_id`),
  KEY `fk-candidate_id_idx` (`candidate_id`),
  CONSTRAINT `fk-applications-candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `candiadtes` (`candidate_id`),
  CONSTRAINT `fk-applications-competition_id` FOREIGN KEY (`competition_id`) REFERENCES `competitions` (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candiadtes`
--

DROP TABLE IF EXISTS `candiadtes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candiadtes` (
  `candidate_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `birthdate` date NOT NULL,
  `occupation` varchar(50) NOT NULL,
  PRIMARY KEY (`candidate_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk-candidates-user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candiadtes`
--

LOCK TABLES `candiadtes` WRITE;
/*!40000 ALTER TABLE `candiadtes` DISABLE KEYS */;
/*!40000 ALTER TABLE `candiadtes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition_timelines`
--

DROP TABLE IF EXISTS `competition_timelines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competition_timelines` (
  `competition_id` mediumint NOT NULL,
  `hosting_requested` varchar(10) DEFAULT NULL,
  `admin_approved` varchar(10) DEFAULT NULL,
  `system_approved` varchar(10) DEFAULT NULL,
  `applying_start` varchar(10) DEFAULT NULL,
  `applying_end` varchar(10) DEFAULT NULL,
  `submission_start` varchar(10) DEFAULT NULL,
  `submission_end` varchar(10) DEFAULT NULL,
  `results_uploaded` varchar(10) DEFAULT NULL,
  `truncated` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition_timelines`
--

LOCK TABLES `competition_timelines` WRITE;
/*!40000 ALTER TABLE `competition_timelines` DISABLE KEYS */;
/*!40000 ALTER TABLE `competition_timelines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitions` (
  `competition_id` mediumint NOT NULL AUTO_INCREMENT,
  `organization_id` smallint NOT NULL,
  `competition_title` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `accessibility` varchar(25) NOT NULL DEFAULT 'public' COMMENT 'public/link/passcode_protected/selected_participents',
  `passcode` varchar(50) DEFAULT NULL,
  `competition_link` varchar(200) DEFAULT NULL,
  `allowed_candidates` json DEFAULT NULL COMMENT 'JSON Array containing candidate_ids',
  `assest_type` varchar(50) NOT NULL DEFAULT '.rar,.zip' COMMENT 'image/zip/rar',
  `status` varchar(20) NOT NULL COMMENT 'pending/applying/live/examining/end/truncated',
  `admin_approved` char(1) NOT NULL DEFAULT 'N',
  `system_approved` char(1) NOT NULL DEFAULT 'N',
  `application_form_link` varchar(100) NOT NULL,
  PRIMARY KEY (`competition_id`),
  UNIQUE KEY `competition_title_UNIQUE` (`competition_title`),
  KEY `fk-competitions-organization_id_idx` (`organization_id`),
  CONSTRAINT `fk-competitions-organization_id` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management`
--

DROP TABLE IF EXISTS `management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management` (
  `management_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management`
--

LOCK TABLES `management` WRITE;
/*!40000 ALTER TABLE `management` DISABLE KEYS */;
INSERT INTO `management` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_memberships`
--

DROP TABLE IF EXISTS `organization_memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_memberships` (
  `member_id` mediumint NOT NULL AUTO_INCREMENT,
  `organization_id` smallint NOT NULL,
  `user_id` int NOT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'non-executive' COMMENT 'admin\nexecutive\nnon-executive\nexaminer\ncoordinator/collaberator\n\n"two compatible roles may stored by seperating with '',''s. split into an array when processing data"',
  `admin_approved` char(1) NOT NULL DEFAULT 'N',
  `system_verified` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `unique_member` (`organization_id`,`user_id`),
  KEY `fk-staf_memebers-user_id_idx` (`user_id`) /*!80000 INVISIBLE */,
  KEY `fk-organizations-organization_id_idx` (`organization_id`),
  CONSTRAINT `fk-organizations-organization_id` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`organization_id`),
  CONSTRAINT `fk-staf_memebers-user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_memberships`
--

LOCK TABLES `organization_memberships` WRITE;
/*!40000 ALTER TABLE `organization_memberships` DISABLE KEYS */;
INSERT INTO `organization_memberships` VALUES (2,1,57,'admin','Y','Y'),(10,26,28,'admin','Y','Y'),(11,27,57,'executive','N','N'),(12,27,58,'non-executive','Y','N');
/*!40000 ALTER TABLE `organization_memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `organization_id` smallint NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(100) NOT NULL,
  `reference_code` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `for_profit` char(1) NOT NULL DEFAULT 'Y' COMMENT '"profit","non profit"',
  PRIMARY KEY (`organization_id`),
  UNIQUE KEY `reference_code_UNIQUE` (`reference_code`),
  UNIQUE KEY `organization_name_UNIQUE` (`organization_name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'XYZ Foundation','ABFG1610','contact@xyzfoundation.org','0719080920','789 Elm Avenue, Nonprofitville, State','N'),(26,'Company A','CODE001','companya@example.com','123-456-7890','123 Main St, City A','Y'),(27,'Nonprofit B','CODE002','nonprofitb@example.com','987-654-3210','456 Elm St, City B','N'),(28,'Business C','CODE003','businessc@example.com','555-123-4567','789 Oak St, City C','Y');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_submissions`
--

DROP TABLE IF EXISTS `project_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_submissions` (
  `submission_id` int NOT NULL AUTO_INCREMENT,
  `candidate_id` int NOT NULL,
  `competition_id` mediumint NOT NULL,
  `submission_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `asset_path` varchar(200) NOT NULL,
  `project_submissionscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`submission_id`),
  UNIQUE KEY `no_duplicates` (`candidate_id`,`competition_id`),
  KEY `fk-candidate_id_idx` (`candidate_id`),
  KEY `fk-submission-host_id` (`competition_id`),
  CONSTRAINT `fk-submission-candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `candiadtes` (`candidate_id`),
  CONSTRAINT `fk-submission-host_id` FOREIGN KEY (`competition_id`) REFERENCES `competitions` (`competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_submissions`
--

LOCK TABLES `project_submissions` WRITE;
/*!40000 ALTER TABLE `project_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `username` varchar(12) NOT NULL,
  `contact_number` varchar(13) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `email_verified` char(1) NOT NULL DEFAULT 'N',
  `account_type` varchar(45) DEFAULT NULL COMMENT 'NULL - not selected\n''c'' - candidate\n''s'' - staff\n''cs'' - candidate and staff',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `contact_number_UNIQUE` (`contact_number`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (28,'pmjuniorcomtec@gmail.com','$2b$04$l3aSwsxx.exFZhKP3QOJZ.Y2YtrgLUava5NWhKWu1k6jSPk1oZ93m','pinidu1234','0718092045','dasdas asd','Sri Lanka','N',NULL),(57,'pinidutechstud@gmail.com','$2b$04$l3aSwsxx.exFZhKP3QOJZ.Y2YtrgLUava5NWhKWu1k6jSPk1oZ93m','pinidu123','0718092046','pinidu maneesha','Sri Lanka','Y','host'),(58,'pmjundummy@gmail.com','$2b$04$RitMP5X8UF7jU5cfVv4KvOMAPAS04gyhpJko4yhxP2vFi.Xj5m3kG','maneesha123','1234567895','pinidu maneesha','Sri Lanka','N',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verifying_emails`
--

DROP TABLE IF EXISTS `verifying_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifying_emails` (
  `email` varchar(100) NOT NULL,
  `verification_code` char(6) NOT NULL,
  `expiry_date` timestamp NOT NULL DEFAULT ((now() + interval 10 minute)),
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifying_emails`
--

LOCK TABLES `verifying_emails` WRITE;
/*!40000 ALTER TABLE `verifying_emails` DISABLE KEYS */;
/*!40000 ALTER TABLE `verifying_emails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-15 22:06:23
