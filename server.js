const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./config/connection');
function employeeSection() {
    inquirer
    .prompt({
        name: "selected",
        type: "list",
        message: "Please indicate task",
        choices: [
            "Add Department", 
            "Add Role", 
            "Add Employee",
            "View Departments", 
            "View Roles", 
            "View Employees",
            "Update Employee Role",
            "Delete Employee",
            "Leave"
        ]
    })
    .then(checkCase);
}

function checkCase(input) {
    switch (input.selected) {
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "View Employees":
            viewEmployees();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Leave":
            connection.end();
            break;
    }
}