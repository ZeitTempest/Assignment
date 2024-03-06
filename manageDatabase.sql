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

SELECT App_Rnumber FROM application WHERE App_Acronym = "MyApp1";

SELECT * FROM task WHERE Task_id = "MyApp1_NaN";

BEGIN; 
INSERT INTO task (Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_creator, Task_owner, Task_createDate) VALUES ('MytaskA','asdasd asd','admin, create, Wed Mar 06 2024 09:56:59 GMT+0800 (Singapore Standard 
Time): aqwqeq axcz xz','MyApp1_1','plan123','MyApp1','admin','admin','2024-04-04');
UPDATE application SET App_Rnumber = "abcd" WHERE App_Acronym = 'MyApp1_1';
COMMIT;

UPDATE `accounts` SET `password`='$2a$10$B6loTC0ZV1WElgNuvMHboO2snALcz673lUHl8b8z.I19OfIlyuuEW', `email`='dev1@company.com', `isActive`='1', `groups`=NULL WHERE `username`='dev1';

SELECT * FROM `accounts`;
SELECT * FROM `groups`;
SELECT * FROM `application`;
SELECT * FROM `plan`;
SELECT * FROM `task`;