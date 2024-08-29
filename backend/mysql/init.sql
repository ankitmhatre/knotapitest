-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS knotdb;
-- Create the user if it doesn't exist
USE knotdb;

CREATE USER IF NOT EXISTS 'mainuser'@'%' IDENTIFIED BY 'mainpassword';
-- Grant privileges
GRANT ALL PRIVILEGES ON knotdb.* TO 'mainuser'@'%';
-- Flush privileges
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
);



CREATE TABLE IF NOT EXISTS contact_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    attribute_changed VARCHAR(255) NOT NULL,
    attribute_previous_value VARCHAR(255) NOT NULL,
    attribute_update_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id)
);

