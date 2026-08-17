-- Run this once against a local MySQL instance to seed the sample data:
--   mysql -u root -p < 300_registration-data.sql
-- 300_MySQL_DDT.spec.ts reads DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME
-- from env vars (defaults: localhost / 3306 / root / "" / playwright_ddt).

CREATE DATABASE IF NOT EXISTS playwright_ddt;
USE playwright_ddt;

CREATE TABLE IF NOT EXISTS registration_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100),
    name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    confirm_password VARCHAR(100),
    should_pass BOOLEAN,
    expected_error VARCHAR(150)
);

TRUNCATE TABLE registration_data;

INSERT INTO registration_data
    (description, name, username, password, confirm_password, should_pass, expected_error)
VALUES
    ('valid registration', 'Dev Sharma', 'dev@test.com', 'Strong@123', NULL, TRUE, 'Email already exists'),
    ('password mismatch', 'Alice', 'alice@test.com', 'Strong@123', 'Different@456', FALSE, 'Passwords do not match'),
    ('weak password', 'Bob', 'bob@test.com', '123', '123', FALSE, 'Password must be at least 8 characters'),
    ('duplicate email', 'Existing User', 'existing@test.com', 'Strong@123', 'Strong@123', FALSE, 'Email already exists'),
    ('invalid email format', 'Charlie', 'not-an-email', 'Strong@123', 'Strong@123', FALSE, 'Please enter a valid email');
