-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: users
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chatlog`
--

DROP TABLE IF EXISTS `chatlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `query` varchar(255) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chatlog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatlog`
--

LOCK TABLES `chatlog` WRITE;
/*!40000 ALTER TABLE `chatlog` DISABLE KEYS */;
INSERT INTO `chatlog` VALUES (1,1,'I\'m feeling hopeless','This is a mocked AI response for: I\'m feeling hopeless','2024-11-14 18:11:26'),(2,2,'I\'m feeling hopeless','This is a mocked AI response for: I\'m feeling hopeless','2024-11-14 18:32:51'),(3,2,'I can\'t stop crying','Crying can be a way to release emotions. It\'s okay to express how you feel. Remember, you are not alone in this.','2024-11-14 20:30:53');
/*!40000 ALTER TABLE `chatlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'sonu','borkar','sonu_borkar','sonuborkar2001@gmail.com','$2a$10$Rxzwp/wZm7se.VvPY/a/0e0JTWkwO6Pf3AN.WWVbSC5ZRvm9f0HFS',NULL,'2024-10-28 23:07:45',NULL,NULL),(2,'golu','borkar','golu_borkar','golu2001@gmail.com','$2a$10$.YpnMRlmtoW1DALQuje8I.pLP4Ca4Fud9bIntFb9IQDuO9VcLMefO',NULL,'2024-10-30 17:03:45',NULL,NULL),(3,'Kamesh','Borkar','KameshBorkar','Kamesh@gmail.com','$2a$10$Up83DzCVJoiu7xSB07F./OERwUsPlUwJFGgW4uBIA.rqgax6zF2mG',NULL,'2024-11-08 23:22:32',NULL,NULL),(4,'User1','usd','User1usd','User@gmail.com','$2a$10$itPl1robLwm7yD82gu9hq.f90iL0qB9vBWqK2XGVigQPhbOVPbIc.',NULL,'2024-11-13 13:10:04',NULL,NULL);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `due_date` date DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_task_user_id` (`user_id`),
  CONSTRAINT `fk_task_user_id` FOREIGN KEY (`user_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wellbeingtest`
--

DROP TABLE IF EXISTS `wellbeingtest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wellbeingtest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `taken_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `score` int DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_wellbeingtest_user_id` (`user_id`),
  CONSTRAINT `fk_wellbeingtest_user_id` FOREIGN KEY (`user_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wellbeingtest`
--

LOCK TABLES `wellbeingtest` WRITE;
/*!40000 ALTER TABLE `wellbeingtest` DISABLE KEYS */;
INSERT INTO `wellbeingtest` VALUES (1,1,'2024-11-06 17:33:50',35,NULL),(2,1,'2024-11-06 18:02:09',15,'Needs Improvement'),(3,2,'2024-11-06 18:07:45',25,'Needs Improvement'),(6,1,'2024-11-07 16:49:09',0,'Needs Improvement'),(8,1,'2024-11-07 17:39:29',0,'Healthy - Keep Up the Good Work!'),(9,1,'2024-11-07 17:40:01',0,'Healthy - Keep Up the Good Work!'),(12,2,'2024-11-07 17:58:41',70,'Moderately Depressed - Counseling Recommended'),(13,3,'2024-11-13 15:04:06',44,'Mild Symptoms - Consider Lifestyle Changes'),(14,3,'2024-11-13 15:22:31',79,'Moderately Depressed - Counseling Recommended'),(15,3,'2024-11-13 15:30:08',55,'Moderately Depressed - Counseling Recommended'),(16,3,'2024-11-13 16:10:57',59,'Moderately Depressed - Counseling Recommended'),(17,3,'2024-11-13 16:16:24',71,'Moderately Depressed - Counseling Recommended'),(18,3,'2024-11-13 17:04:29',59,'Moderately Depressed - Counseling Recommended'),(19,3,'2024-11-13 18:11:00',100,'Severely Depressed - Immediate Help Needed'),(20,3,'2024-11-13 19:49:25',82,'Severely Depressed - Immediate Help Needed');
/*!40000 ALTER TABLE `wellbeingtest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14 20:38:32
