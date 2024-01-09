const inquirer = require('inquirer');
const connection = require('./config/connection.js');
function employeeSection() {
    inquirer
        .prompt({
            name: "selected",
            type: "list",
            message: "Please select an option:",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(checkCase);
}

function checkCase(input) {
    switch (input.selected) {
        case "View All Departments":
            viewDepartments();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "View All Employees":
            viewEmployees();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Exit":
            connection.end();
            console.log("Goodbye!");
            break;
    }
}
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Database connected.');
    employeeSection();
})

function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeSection();
    });
}
function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeSection();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeSection();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "departmentName",
            type: "input",
            message: "Enter the name of the new department:"
        })
        .then((answer) => {
            connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.departmentName], (err, res) => {
                if (err) throw err;
                console.log(`Department "${answer.departmentName}" added successfully!\n`);
                employeeSection();
            });
        });
}

function addRole() {
    connection.query('SELECT * FROM department', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return {
                name: department.department_name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'new_role',
                    message: 'Enter title of new role'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary of new role',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Enter department of new role',
                    choices: departments,
                },
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: answer.department_id,
                    },
                    function (err) {
                        if (err) throw err;
                    }
                );
                console.log('added new employee role!')
                viewRoles();
            });

    });

};



function addEmployee() {
    connection.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name of new employee...'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name of new employee...'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Enter new employee role...',
                    choices: roles,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'select a manager id (if no manager put 0)...',
                    choices: [0, 1, 2, 3, 4]
                }
            ])
            .then((answer) => {
                console.log(answer.role);
                const newManagerId = answer.manager_id === 0 ? null : answer.manager_id;
                connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        manager_id: newManagerId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('Updated Employee Roster;');
                        viewEmployees();

                    }
                );
            });

    });

};
