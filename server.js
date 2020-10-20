var mysql = require("mysql")
var inquirer = require("inquirer")
var consoleTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
    start()
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees by Role", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"]
        }
    ]).then(function (res) {
        switch (res.action) {
            case "View All Employees":
                viewAll();
                break;

            case "View All Employees By Department":
                viewDept();
                break;

            case "View All Employees by Role":
                viewRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Department":
                addDept();
                break;

            case "Update Employee Role":
                updateEmployee();
                break;

            case "Exit":
                return;
        };
    });
};