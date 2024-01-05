INSERT INTO
    department (name)
VALUES
    ('Legal'),
    ('Sales'),
    ('Engineering'),
    ('Finance');
    

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Lawyer', 400000, 1),
    ('Salesperson', 70000, 2),
    ('Software Engineer', 90000, 3),
    ('Accountant', 50000, 4);

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Tom', 'Hanks', 1, 4),
    ('Chris', 'Tucker', 2, 3),
    ('Gabriel', 'Iglesias', 3, 1),
    ('Ralph', 'Barbosa', 4, 5);