CREATE DATABASE IF NOT EXISTS imbobeza_medical
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE imbobeza_medical;

CREATE TABLE IF NOT EXISTS certificates (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_name VARCHAR(150) NOT NULL,
  student_class VARCHAR(30) NOT NULL,
  illness VARCHAR(150) NOT NULL,
  certificate_name VARCHAR(255) NOT NULL,
  certificate_type VARCHAR(100) NOT NULL,
  certificate_data LONGTEXT NULL,
  status ENUM('pending', 'verified', 'urgent') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;
