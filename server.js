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