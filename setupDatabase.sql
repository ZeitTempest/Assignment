-- set up db 
CREATE DATABASE IF NOT EXISTS `TMSDatabase` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS `accounts`; -- remove this line after development, dangerous to mess with db

CREATE TABLE IF NOT EXISTS `accounts` (
 `username` varchar(20) NOT NULL PRIMARY KEY UNIQUE,
 `password` varchar(64) NOT NULL,
 `email` varchar(255) NOT NULL,
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
