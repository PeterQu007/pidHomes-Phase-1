-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: local
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `pid_city_population`
--

DROP TABLE IF EXISTS `pid_city_population`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pid_city_population` (
  `Population_ID` int(11) NOT NULL AUTO_INCREMENT,
  `City_Code` varchar(6) NOT NULL,
  `GEO_UID` varchar(45) NOT NULL,
  `TEXT_ID` varchar(25) NOT NULL,
  `HIER_ID` varchar(25) NOT NULL,
  `INDENT_ID` varchar(25) NOT NULL,
  `Year` int(11) NOT NULL,
  `Population` int(11) NOT NULL,
  `Population_Male` int(11) DEFAULT NULL,
  `Population_Female` int(11) DEFAULT NULL,
  `Population_Change` float NOT NULL,
  `Population_Density_per_square_kilometre` float NOT NULL,
  `Land_Area_in_Square_Kilometres` float NOT NULL,
  `Median_Age` float NOT NULL,
  `Average_Age` float NOT NULL,
  `Total_Private_Dwellings` int(11) NOT NULL,
  `Single-Detached_House` int(11) NOT NULL,
  `Apartment_5_Or_More_Storeys` int(11) NOT NULL,
  `Other_Attached_Dwelling` int(11) NOT NULL,
  `Movable_Dwelling` int(11) NOT NULL,
  `Median_total_income` decimal(10,2) DEFAULT NULL,
  `Median_after_tax_income` decimal(10,2) DEFAULT NULL,
  `Average_total_income` decimal(10,2) DEFAULT NULL,
  `Average_after_tax_income` decimal(10,2) DEFAULT NULL,
  `Education_Total` int(11) DEFAULT NULL,
  `Education_No_Certificate` int(11) DEFAULT NULL,
  `Education_High_school` int(11) DEFAULT NULL,
  `Education_Postsecondary` int(11) DEFAULT NULL,
  PRIMARY KEY (`Population_ID`),
  UNIQUE KEY `City_Population_ID_UNIQUE` (`Population_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27 12:27:09
