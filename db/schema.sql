DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;
USE user_db;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
    
);

CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NULL,
    PRIMARY KEY (id)
);