-- Active: 1675282677433@@127.0.0.1@3306@employee_cataloger
INSERT INTO department (department_name)
VALUES ("Superhero"), ("Anti-Hero"), ("Villain"), ("Henchman");

INSERT INTO role (title, salary, department_id)
VALUE ("Leader", 250000.00, 1), ("Sidekick", 80000.00, 2), ("Mastermind", 1000000.00, 3), ("Grunt", 20000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Steve", "Rogers", 1, null), ("Bucky", "Barnes", 2, null), ("Victor", "VonDoom", 3, 2), ("Random", "badguy", 4, 3);