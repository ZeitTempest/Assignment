-- set up db 
CREATE DATABASE IF NOT EXISTS `TMSDatabase` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS `accounts`; -- remove this line after development, dangerous to mess with db

CREATE TABLE IF NOT EXISTS `accounts` (
 `username` varchar(20) NOT NULL PRIMARY KEY UNIQUE,
 `password` varchar(64) NOT NULL,
 `email` varchar(255),
 `isActive` bool NOT NULL DEFAULT true,
 `groups` varchar(255)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`username`, `password`, `email`, `groups`) VALUES 
('admin', '$2a$10$B6loTC0ZV1WElgNuvMHboO2snALcz673lUHl8b8z.I19OfIlyuuEW', 'admin@company.com', 'admin'),
('dev1', '$2a$10$1ttoaikVjTiyvXgTb5NAN.WMhM/BVGykBAYGi/PAhCMtbbJSDqV72', 'dev1@company.com', 'developer');

SELECT * FROM `accounts`;

DROP TABLE IF EXISTS `groups`; -- remove this line after development, dangerous to mess with db

CREATE TABLE IF NOT EXISTS `groups` (
`groupname` varchar(255) PRIMARY KEY 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `groups` (groupname) VALUES 
('admin'),
('developer'),
('project-lead'),
('project-manager');

DROP TABLE IF EXISTS `application`; -- remove this line after development

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

INSERT INTO `application` (`App_Acronym`, `App_Description`, `App_Rnumber`, `App_startDate`, `App_endDate`, `App_permit_Create`, `App_permit_Open`, `App_permit_toDoList`, `App_permit_Doing`, `App_permit_Done`) VALUES 
("MyApp1", "Hi, this is test application 1.", "0", "2024-06-02", "2024-06-17", "project-lead", "project-manager", "developer", "developer", "project-lead"),
("MyApp2", "Hi, this is test application 2.", "1", "2024-09-02", "2024-12-02", "project-lead", "project-manager", "developer", "developer", "project-lead");
-- ();

DROP TABLE IF EXISTS `plan`; -- remove this line after development

CREATE TABLE IF NOT EXISTS `plan` (
`Plan_MVP_Name` varchar(20) NOT NULL,
`Plan_startDate` date,
`Plan_endDate` date,
`Plan_app_Acronym` varchar(20) NOT NULL,
CONSTRAINT ck_plan
PRIMARY KEY (`Plan_MVP_name`, `Plan_app_Acronym`)
);

INSERT INTO `plan` (`Plan_MVP_name`, `Plan_startDate`, `Plan_endDate`, `Plan_app_Acronym`) VALUES 
("My Plan 1", "2024-06-02", "2024-12-17", "MyApp1"),
("My Plan 2", "2024-01-19", "2025-06-05", "MyApp2"),
("My Plan 3", "2024-12-18", "2025-06-01", "MyApp1"),
("My Plan 4", "2025-06-06", "2026-12-20", "MyApp2");

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
`Task_plan` varchar(20)
);