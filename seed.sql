DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(40)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(40),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (department)
VALUE ("Engineering");
INSERT INTO department (department)
VALUE ("Administrator");
INSERT INTO department (department)
VALUE ("Event Coordinator");
INSERT INTO department (department)
VALUE ("Finance");

INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("IT Technician", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Database Administrator", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Data Clerk", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Program Manager", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Quality Assurance", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 160000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tony", "Stark", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bruce", "Banner", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Steve","Rogers", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Natasha", "Romanoff", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Clinton", "Barton", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Thor", "OfAsgard", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Peter", "Parker", 4, 7);
