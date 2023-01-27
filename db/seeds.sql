INSERT INTO department (name)
VALUES ("Superhero"), ("Anti-Hero"), ("Villain"), ("Henchman");

INSERT INTO role (title, salary, department_id)
VALUE ("Leader", 250000.00, 19999), ("Sidekick", 80000.00, 616), ("Mastermind", 1000000.00, 666), ("Grunt", 20000.00, 001);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Steve", "Rogers", 19999, 12345), ("Bucky", "Barnes", 616, 1234), ("Victor", "VonDoom", 666, 06660), ("Random", "badguy", 001, 0000);