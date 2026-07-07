CREATE DATABASE interview_crud;

USE interview_crud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user'
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(255),
    user_id INT,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);