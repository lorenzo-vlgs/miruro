CREATE DATABASE animedb;
USE animedb;

-- DROP DATABASE animedb;

CREATE TABLE `animes` (
  `id` int PRIMARY KEY auto_increment,
  `image` text,
  `name` text,
  `description` text,
  `episodes` int,
  `rilascio` datetime
);

CREATE TABLE `genres` (
  `genre_id` int PRIMARY KEY auto_increment,
  `genre_name` text
);

CREATE TABLE `studios` (
  `id` int PRIMARY KEY auto_increment,
  `image` text,
  `name` text,
  `description` text,
  `dob` int
);

CREATE TABLE `characters` (
  `id` int PRIMARY KEY auto_increment,
  `image` text,
  `name` text,
  `role` text,
  `anime_id` int,
  
  FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) on delete cascade
);

CREATE TABLE `anime_genre` (
  `anime_id` int,
  `genre_id` int,
  
  FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) on delete cascade,
  FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) on delete cascade
);

CREATE TABLE `anime_studio` (
  `anime_id` int,
  `studio_id` int,
  
  FOREIGN KEY (`studio_id`) REFERENCES `studios` (`id`) on delete cascade,
  FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) on delete cascade
);

CREATE TABLE users (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `dob` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  enabled BOOLEAN NOT NULL
);

CREATE TABLE roles (
  `username` VARCHAR(50) NOT NULL,
  `ruolo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (username, ruolo),
  FOREIGN KEY (`username`) REFERENCES users(`username`)
);

CREATE TABLE anime_user (
  `anime_id` int,
  `user_id` int,
  
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on delete cascade,
  FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) on delete cascade
);

CREATE TRIGGER assign_user_role
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO roles (username, ruolo) VALUES (NEW.username, 'USER');
END;

