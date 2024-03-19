-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tmsdatabase
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `username` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `groups` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('admin','$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi','admin@company.com',1,'admin'),('dev1','$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi','dev1@company.com',1,'devops'),('dev2','$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi','dev2@company.com',1,'devops,project-lead,developer,project-manager'),('pl1','$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi','pl1@company.com',1,'project-lead'),('pm1','$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi','pm1@company.com',1,'project-manager');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `App_Acronym` varchar(20) NOT NULL,
  `App_Description` longtext,
  `App_Rnumber` int NOT NULL DEFAULT '0',
  `App_startDate` date DEFAULT NULL,
  `App_endDate` date DEFAULT NULL,
  `App_permit_Create` varchar(20) DEFAULT NULL,
  `App_permit_Open` varchar(20) DEFAULT NULL,
  `App_permit_toDoList` varchar(20) DEFAULT NULL,
  `App_permit_Doing` varchar(20) DEFAULT NULL,
  `App_permit_Done` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`App_Acronym`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('birdpark','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',0,'2024-04-10','2024-04-26',NULL,NULL,NULL,'',NULL),('MyApp1','This is an app description for myapp1',7,'2024-03-14','2024-03-28','project-lead','project-manager','devops','devops','project-lead'),('zoo','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',7,'2024-03-13','2024-03-26','project-lead','project-manager','devops','devops','project-lead');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `groupname` varchar(255) NOT NULL,
  PRIMARY KEY (`groupname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES ('admin'),('developer'),('devops'),('project-lead'),('project-manager');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `Plan_MVP_name` varchar(255) NOT NULL,
  `Plan_startDate` date DEFAULT NULL,
  `Plan_endDate` date DEFAULT NULL,
  `Plan_app_Acronym` varchar(20) NOT NULL,
  PRIMARY KEY (`Plan_MVP_name`,`Plan_app_Acronym`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES ('My Plan 1','2024-03-12','2024-03-26','MyApp1'),('My Plan 2','2024-03-16','2024-04-06','MyApp1'),('Sprint 1','2024-02-27','2024-03-27','birdpark'),('Sprint 1','2024-03-06','2024-03-28','zoo'),('Sprint 2','2024-02-28','2024-04-11','birdpark'),('Sprint 2','2024-03-08','2024-03-31','zoo'),('This will be the first thing I work on','2024-03-22','2024-04-14','zoo');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `Task_name` varchar(20) NOT NULL,
  `Task_description` longtext,
  `Task_notes` longtext,
  `Task_app_Acronym` varchar(20) NOT NULL,
  `Task_creator` varchar(20) NOT NULL,
  `Task_owner` varchar(20) NOT NULL,
  `Task_createDate` date NOT NULL,
  `Task_state` enum('open','todo','doing','done','closed') NOT NULL DEFAULT 'open',
  `Task_id` varchar(30) NOT NULL,
  `Task_plan` varchar(255) DEFAULT NULL,
  UNIQUE KEY `Task_id` (`Task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES ('SetupEn1','this is a description','dev1, doing, Mon Mar 18 2024 15:03:58 GMT+0800 (Singapore Standard Time): Test notes\rpl1, create, Mon Mar 18 2024 09:31:27 GMT+0800 (Singapore Standard Time): ','MyApp1','pl1','dev1','2024-03-18','done','MyApp1_1','My Plan 1'),('SetupEn2','this is a description','dev1, doing, Mon Mar 18 2024 11:51:20 GMT+0800 (Singapore Standard Time): this is my last resort\rpl1, create, Mon Mar 18 2024 09:31:47 GMT+0800 (Singapore Standard Time): ','MyApp1','pl1','dev1','2024-03-18','done','MyApp1_2','My Plan 2'),('SetupEn3','this is a description','dev1, doing, Mon Mar 18 2024 11:21:04 GMT+0800 (Singapore Standard Time): this is my last resort\rpl1, create, Mon Mar 18 2024 09:35:23 GMT+0800 (Singapore Standard Time): Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Maloru (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,','MyApp1','pl1','dev1','2024-03-18','done','MyApp1_3','My Plan 2'),('SetupEn45','this is a description','dev1, doing, Mon Mar 18 2024 16:46:46 GMT+0800 (Singapore Standard Time): Promoting task to done\rdev1, doing, Mon Mar 18 2024 16:00:37 GMT+0800 (Singapore Standard Time): Promoting task to done\rdev1, doing, Mon Mar 18 2024 15:59:12 GMT+0800 (Singapore Standard Time): Promoting task to done\rdev1, doing, Mon Mar 18 2024 15:57:42 GMT+0800 (Singapore Standard Time): Promoting task to done\rdev1, open, Mon Mar 18 2024 11:13:53 GMT+0800 (Singapore Standard Time): undefined\rpl1, create, Mon Mar 18 2024 10:27:28 GMT+0800 (Singapore Standard Time): Notes here','MyApp1','pl1','dev1','2024-03-18','done','MyApp1_4','My Plan 2'),('SetupEn456','this is a description','dev1, open, Mon Mar 18 2024 11:17:31 GMT+0800 (Singapore Standard Time): this is my last resort\rpl1, create, Mon Mar 18 2024 11:11:27 GMT+0800 (Singapore Standard Time): Notes here','MyApp1','pl1','dev1','2024-03-18','done','MyApp1_5','My Plan 2'),('AddCRendering','this is a description','pl1, create, Mon Mar 18 2024 14:16:34 GMT+0800 (Singapore Standard Time): Notes here','MyApp1','pl1','pl1','2024-03-18','open','MyApp1_6','My Plan 1'),('AddConRendering','this is a description','pl1, create, Mon Mar 18 2024 14:18:38 GMT+0800 (Singapore Standard Time): Notes here','MyApp1','pl1','pl1','2024-03-18','open','MyApp1_7','My Plan 1'),('Monkey','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','pl1, done, Tue Mar 12 2024 14:29:12 GMT+0800 (Singapore Standard Time): \rdev1, doing, Tue Mar 12 2024 14:27:33 GMT+0800 (Singapore Standard Time): \rdev1, todo, Tue Mar 12 2024 14:27:05 GMT+0800 (Singapore Standard Time): testing\rpm1, open, Mon Mar 11 2024 15:34:55 GMT+0800 (Singapore Standard Time): Promote task\rpm1, open, Mon Mar 11 2024 15:33:48 GMT+0800 (Singapore Standard Time): import sql from \"../config/query.js\"\n\nexport const getPlans = async (req, res, next) => {\n  //search for specific plan using appName\n  try {\n    const appName = req.body.appName\n\n    //console.log(appName)\n    const results = await sql.query(\"SELECT * FROM plan WHERE Plan_app_Acronym = ? \", [appName])\n    if (results.length > 0 && results[0].length > 0) {\n      res.status(200).json(results[0])\n    } else {\n      res.status(500).send(\"No plans found.\")\n    }\n  } catch (err) {\n    console.log(\"err\")\n    res.status(500).send(err)\n  }\n}\n\nexport const getPlanNames = async (req, res, next) => {\n  //search for specific plan name using appName\n  try {\n    const appName = req.body.appName\n\n    const results = await sql.query(\"SELECT Plan_MVP_Name FROM plan WHERE Plan_app_Acronym = ? \", appName)\n    if (results.length > 0 && results[0].length > 0) {\n      res.status(200).json(results[0])\n    } else {\n      res.status(200).send(\"No plans found.\")\n    }\n  } catch (err) {\n    res.status(500).send(err)\n  }\n}\n\nexport const createPlan = async (req, res) => {\n  try {\n    //be careful with naming\n    const { planName, startDate, endDate, appName } = req.body\n    if (!planName) {\n      return res.status(500).send(\"Plan name missing.\")\n    }\n    //check plan name valid\n    const regex = \"^[[a-zA-Z0-9_ ]+$\"\n    if (planName.length > 255) {\n      return res.status(500).send(\"Plan name must be 255 characters or less.\")\n    }\n    if (!planName.match(regex)) {\n      return res.status(500).send(\"Plan name has illegal characters.\")\n    }\n\n    //check dates valid (validateDates), else send error\n    const startArr = new Date(startDate)\n    const endArr = new Date(endDate)\n\n    if (!startDate) res.status(500).send(\"Start date missing.\")\n    if (!endDate) res.status(500).send(\"End date missing.\")\n\n    if (startDate && endDate && startArr > endArr) {\n      return res.status(500).send(\"Start date cannot be after end date.\")\n    }\n    //check plan alr exists (findplan), else send error\n\n    const findPlanQuery = \"SELECT * FROM plan WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? \"\n    const [foundPlans] = await sql.query(findPlanQuery, [planName, appName])\n\n    if (foundPlans.length > 1) {\n      return res.status(500).send(\"Error: More than one plan with this name exists. Please contact an administrator.\")\n    }\n\n    if (foundPlans.length === 1) {\n      return res.status(500).send(\"Plan name already exists.\")\n    } else {\n      sql.query(\"INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym) VALUES (?, ?, ?, ?)\", [planName, startDate, endDate, appName])\n      return res.status(200).send(\"Successfully created plan.\")\n    }\n  } catch (err) {\n    return res.status(500).send(err)\n  }\n}\n\nexport const editPlan = async (req, res) => {\n  //edit the named plan (planName) to modify startDate, endDate only\n  //be careful with naming\n  try {\n    const { appName, planName, startDate, endDate } = req.body\n\n    if (!appName) return res.status(500).send(\"App name missing.\")\n\n    if (!planName) return res.status(500).send(\"Plan name missing.\")\n\n    const startArr = new Date(startDate)\n    const endArr = new Date(endDate)\n\n    if (!startDate) return res.status(500).send(\"Start date missing.\")\n    if (!endDate) return res.status(500).send(\"End date missing.\")\n\n    if (startDate && endDate && startArr > endArr) {\n      return res.status(500).send(\"Start date cannot be after end date.\")\n    }\n\n    await sql.query(\"UPDATE plan SET Plan_startDate = ?, Plan_endDate = ? WHERE Plan_MVP_name = ? AND Plan_app_Acronym = ? \", [startDate, endDate, planName, appName])\n    res.status(200).send(\"Successfully edited plan.\")\n\n    //res.end()\n  } catch (err) {\n    return res.status(500).send(err)\n  }\n}\n\rpm1, open, Mon Mar 11 2024 15:32:51 GMT+0800 (Singapore Standard Time): Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\rpm1, open, Mon Mar 11 2024 15:32:36 GMT+0800 (Singapore Standard Time): This is the first task to work on.\rpl1, create, Mon Mar 11 2024 15:27:33 GMT+0800 (Singapore Standard Time): This is a monkey.','zoo','pl1','pl1','2024-03-11','closed','zoo_1','Sprint 1'),('Lion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','dev1, doing, Tue Mar 12 2024 14:27:41 GMT+0800 (Singapore Standard Time): \rdev1, todo, Tue Mar 12 2024 14:27:14 GMT+0800 (Singapore Standard Time): \rdev2, todo, Mon Mar 11 2024 17:03:01 GMT+0800 (Singapore Standard Time): \rpm1, open, Mon Mar 11 2024 15:45:30 GMT+0800 (Singapore Standard Time): pm1, open, Mon Mar 11 2024 15:44:12 GMT+0800 (Singapore Standard Time): pl1, create, Mon Mar 11 2024 15:29:41 GMT+0800 (Singapore Standard Time): This is a lion.\rpl1, create, Mon Mar 11 2024 15:29:41 GMT+0800 (Singapore Standard Time): This is a lion.\rpm1, open, Mon Mar 11 2024 15:44:12 GMT+0800 (Singapore Standard Time): pl1, create, Mon Mar 11 2024 15:29:41 GMT+0800 (Singapore Standard Time): This is a lion.\rpl1, create, Mon Mar 11 2024 15:29:41 GMT+0800 (Singapore Standard Time): This is a lion.','zoo','pl1','dev1','2024-03-11','todo','zoo_2','Sprint 2'),('Tiger','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','pl1, done, Tue Mar 12 2024 14:30:34 GMT+0800 (Singapore Standard Time): \rdev1, doing, Tue Mar 12 2024 14:30:02 GMT+0800 (Singapore Standard Time): \rdev2, todo, Mon Mar 11 2024 16:59:16 GMT+0800 (Singapore Standard Time): promote to doing\rpm1, open, Mon Mar 11 2024 15:50:00 GMT+0800 (Singapore Standard Time): pl1, create, Mon Mar 11 2024 15:29:57 GMT+0800 (Singapore Standard Time): This is a tiger.\rpl1, create, Mon Mar 11 2024 15:29:57 GMT+0800 (Singapore Standard Time): This is a tiger.','zoo','pl1','pl1','2024-03-11','doing','zoo_3','This will be the first thing I work on'),('Animal','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','pm1, open, Tue Mar 12 2024 13:31:45 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 13:31:28 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 09:13:17 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 09:08:31 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 09:05:33 GMT+0800 (Singapore Standard Time): \rpl1, create, Mon Mar 11 2024 15:52:58 GMT+0800 (Singapore Standard Time): Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','zoo','pl1','pm1','2024-03-11','open','zoo_4','This will be the first thing I work on'),('Snake','orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu','dev1, doing, Tue Mar 12 2024 14:30:04 GMT+0800 (Singapore Standard Time): \rpl1, done, Tue Mar 12 2024 14:29:37 GMT+0800 (Singapore Standard Time): \rdev1, doing, Tue Mar 12 2024 14:27:36 GMT+0800 (Singapore Standard Time): \rdev1, todo, Tue Mar 12 2024 14:27:16 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 14:26:08 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 09:13:28 GMT+0800 (Singapore Standard Time): \rpm1, open, Tue Mar 12 2024 09:13:24 GMT+0800 (Singapore Standard Time): \rpl1, create, Tue Mar 12 2024 09:01:00 GMT+0800 (Singapore Standard Time): This is the second task we will be working on.','zoo','pl1','dev1','2024-03-12','done','zoo_5','This will be the first thing I work on'),('Task123',NULL,'pl1, create, Tue Mar 12 2024 14:25:40 GMT+0800 (Singapore Standard Time): This is the last task I am going to work on','zoo','pl1','pl1','2024-03-12','open','zoo_7','This will be the first thing I work on');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19  8:27:33
