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