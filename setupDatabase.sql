-- set up db 
CREATE DATABASE IF NOT EXISTS `TMSDatabase` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS `accounts`; -- remove this line after development, dangerous to mess with db

CREATE TABLE IF NOT EXISTS `accounts` (
 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE, -- DOUBLE CHECK MIRO BOARD FOR REQUIREMENTS
 `username` varchar(20) NOT NULL UNIQUE,
 `password` varchar(64) NOT NULL,
 `email` varchar(255) NOT NULL,
 `isActive` bool NOT NULL DEFAULT true,
 `groups` varchar(255)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`username`, `password`, `email`, `groups`) VALUES 
('admin', 'password', 'admin@company.com', 'admin'),
('dev1', 'password', 'dev1@company.com', 'developer');

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
