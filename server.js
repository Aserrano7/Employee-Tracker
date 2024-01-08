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
                "Update Employee Manager",
                "View Employees By Manager",
                "View Employees By Department",
                "Delete Department",
                "Delete Role",
                "Delete Employee",
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
        case "Update Employee Manager":
            updateEmployeeManager();
            break;
        case "View Employees By Manager":
            viewEmployeesByManager();
            break;
        case "View Employees By Department":
            viewEmployeesByDepartment();
            break;
        case "Delete Department":
            deleteDepartment();
            break;
        case "Delete Role":
            deleteRole();
            break;
        case "Delete Employee":
            deleteEmployee();
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
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the title of the new role:"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the salary for the new role:"
            },
            {
                name: "departmentId",
                type: "input",
                message: "Enter the department ID for the new role:"
            }
        ])
        .then((answer) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.departmentId], (err, res) => {
                if (err) throw err;
                console.log(`Role "${answer.title}" added successfully!\n`);
                employeeSection();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter the first name of the new employee:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter the last name of the new employee:"
            },
            {
                name: "roleId",
                type: "input",
                message: "Enter the role ID for the new employee:"
            },
            {
                name: "managerId",
                type: "input",
                message: "Enter the manager ID for the new employee (or leave blank if none):"
            }
        ])
        .then((answer) => {
            connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
                if (err) throw err;
                console.log(`Employee "${answer.firstName} ${answer.lastName}" added successfully!\n`);
                employeeSection();
            });
        });
}

function updateEmployeeRole() {
    getEmployees()
        .then((employees) => {
            inquirer
                .prompt([
                    {
                        name: "employeeName",
                        type: "list",
                        message: "Select the employee to update:",
                        choices: employees,
                    },
                    {
                        name: "newRoleId",
                        type: "input",
                        message: "Enter the new role ID for the employee:"
                    },
                ])
                .then((answers) => {
                    connection.query(
                        "UPDATE employees SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?",
                        [answers.newRoleId, answers.employeeName],
                        (err, res) => {
                            if (err) throw err;
                            console.log(`Employee role updated successfully!\n`);
                            employeeSection();
                        }
                    );
                });
        });
}

function updateEmployeeManager() {
    getEmployees()
        .then((employees) => {
            inquirer
                .prompt([
                    {
                        name: "employeeName",
                        type: "list",
                        message: "Select the employee to update:",
                        choices: employees,
                    },
                    {
                        name: "newManagerId",
                        type: "list",
                        message: "Select the new manager for the employee:",
                        choices: ["None", ...employees],
                    },
                ])
                .then((answers) => {
                    const newManagerId = answers.newManagerId === "None" ? null : answers.newManagerId;
                    connection.query(
                        "UPDATE employees SET manager_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?",
                        [newManagerId, answers.employeeName],
                        (err, res) => {
                            if (err) throw err;
                            console.log(`Employee manager updated successfully!\n`);
                            employeeSection();
                        }
                    );
                });
        });
}

function getEmployees() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT CONCAT(first_name, ' ', last_name) AS employee_name FROM employees", (err, res) => {
            if (err) reject(err);
            const employees = res.map((employee) => employee.employee_name);
            resolve(employees);
        });
    });
}