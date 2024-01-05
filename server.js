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
}