--liquibase formatted sql
--changeset damien:1
CREATE TABLE IF NOT EXISTS characters (
  character_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age TINYINT NOT NULL,
  mental TINYINT NOT NULL,
  physical TINYINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--rollback DROP TABLE characters;
--changeset damien:2
CREATE TABLE IF NOT EXISTS activities (
  activity_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  character_id INT,
  FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE CASCADE
);
--rollback DROP TABLE activities;
--changeset damien:3
CREATE TABLE IF NOT EXISTS sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  duration INT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  note TEXT,
  improvement TEXT,
  proud TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  activity_id INT,
  character_id INT,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE CASCADE
);
--rollback DROP TABLE sessions;