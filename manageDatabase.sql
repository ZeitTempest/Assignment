-- manage db 
USE `TMSDatabase`;

INSERT INTO accounts (username, password, email) VALUES 
('user2', 'password', 'user2@test.com'),
('user3', 'password', 'user3@test.com');

DELETE FROM accounts WHERE id = ''; -- delete specific id
DELETE FROM accounts WHERE id IS NOT NULL; -- delete all entries

ALTER TABLE accounts
ADD `columnName` VARCHAR(20); -- add new column

ALTER TABLE accounts AUTO_INCREMENT = 1; -- reset auto increment value
SET @i=0;
UPDATE accounts SET `id`=(@i:=@i+1); -- regenerate id column for all entries starting with '1' (USE WITH CAUTION!)

SELECT username, email, isActive, `groups` FROM accounts;

SELECT * FROM `accounts`;
SELECT * FROM `groups`;
SELECT * FROM `application`;
SELECT * FROM `plan`;
SELECT * FROM `task`;