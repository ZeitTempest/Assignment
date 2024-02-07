-- set up db 
CREATE DATABASE IF NOT EXISTS `TMSDatabase` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS accounts; -- remove this line after development, dangerous to mess with db

CREATE TABLE IF NOT EXISTS `groups` (
`groupname` varchar(20) PRIMARY KEY 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS accounts (
 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE, -- DOUBLE CHECK MIRO BOARD FOR REQUIREMENTS
 `username` varchar(20) NOT NULL UNIQUE,
 `password` varchar(10) NOT NULL,
 `email` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO accounts (username, password, email) VALUES 
('user', 'password', 'user@test.com'),
('user2', 'password', 'user2@test.com'),
('user3', 'password', 'user3@test.com'),
('user4', 'password', 'user4@test.com');

DELETE FROM accounts WHERE id = ''; -- delete specific id
DELETE FROM accounts WHERE id IS NOT NULL; -- delete all entries

ALTER TABLE accounts AUTO_INCREMENT = 1; -- reset auto increment value
SET @i=0;
UPDATE accounts SET `id`=(@i:=@i+1); -- regenerate id column for all entries starting with '1' (USE WITH CAUTION!)

SELECT * FROM accounts;