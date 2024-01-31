-- set up db 
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE
utf8_general_ci;
USE `TMSDatabase`;

DROP TABLE IF EXISTS `accounts` -- remove this line after development, dangerous to mess with db
CREATE TABLE IF NOT EXISTS `accounts` (
 `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, -- DOUBLE CHECK MIRO BOARD FOR REQUIREMENTS
 `username` varchar(50) NOT NULL,
 `password` varchar(255) NOT NULL,
 `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test',
'test', 'test@test.com');


ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL