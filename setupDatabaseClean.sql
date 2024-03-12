-- set up db 
CREATE DATABASE IF NOT EXISTS `TMSDatabase` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS `accounts`; 
DROP TABLE IF EXISTS `groups`;
DROP TABLE IF EXISTS `application`;
DROP TABLE IF EXISTS `plan`;
DROP TABLE IF EXISTS `task`;

CREATE TABLE IF NOT EXISTS `accounts` (
 `username` varchar(20) NOT NULL PRIMARY KEY UNIQUE,
 `password` varchar(64) NOT NULL,
 `email` varchar(255),
 `isActive` bool NOT NULL DEFAULT true,
 `groups` varchar(255)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`username`, `password`, `email`, `groups`) VALUES 
('admin', '$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi', 'admin@company.com', 'admin'),
('pl1', '$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi', 'pl1@company.com', 'project-lead'),
('pm1', '$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi', 'pm1@company.com', 'project-manager'),
('dev1', '$2a$10$WKJh0SPHRY3ez4MwOnbzx.1tclSySUumzvYgehO4Lgq5Ln1JKCfvi', 'dev1@company.com', 'developer');

CREATE TABLE IF NOT EXISTS `groups` (
`groupname` varchar(20) PRIMARY KEY 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `groups` (groupname) VALUES 
('admin'),
('developer'),
('project-lead'),
('project-manager');

CREATE TABLE IF NOT EXISTS `application` (
`App_Acronym` varchar(20) PRIMARY KEY,
`App_Description` longtext,
`App_Rnumber` int DEFAULT 0 NOT NULL, -- number of tasks
`App_startDate` date,
`App_endDate` date,
`App_permit_Create` varchar(20),
`App_permit_Open` varchar(20),
`App_permit_toDoList` varchar(20),
`App_permit_Doing` varchar(20),
`App_permit_Done` varchar(20)
) AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `plan` (
`Plan_MVP_name` varchar(255) NOT NULL,
`Plan_startDate` date,
`Plan_endDate` date,
`Plan_app_Acronym` varchar(20) NOT NULL,
CONSTRAINT ck_plan
PRIMARY KEY (`Plan_MVP_name`, `Plan_app_Acronym`)
);

CREATE TABLE IF NOT EXISTS `task` (
`Task_name` varchar(20) NOT NULL,
`Task_description` longtext,
`Task_notes` longtext,
`Task_app_Acronym` varchar(20) NOT NULL,
`Task_creator` varchar(20) NOT NULL,
`Task_owner` varchar(20) NOT NULL,
`Task_createDate` date NOT NULL,
`Task_state` ENUM ('open', 'todo', 'doing', 'done', 'closed') NOT NULL DEFAULT 'open',
`Task_id` varchar(30) NOT NULL UNIQUE, -- created using App_Acronym + App_Rnumber
`Task_plan` varchar(255)
);
