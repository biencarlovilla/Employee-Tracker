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

function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", function (err, res) {
        if (err) throw err

        console.table(res)
        start()
    });
};

function viewRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err

        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Which role's employees would you like to see?",
                choices: function () {
                    var choiceArray = []
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].title)
                    }
                    return choiceArray
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
                var roleArr = []
                for (var i = 0; i < res.length; i++) {
                    if (answer.role === res[i].title) {
                        roleArr.push(res[i])
                    }
                }
                console.table(roleArr);
                start();
            });
        });
    });
};

function viewDept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err

        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department's employees would you like to see?",
                choices: function () {
                    var choiceArray = []
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].department)
                    }
                    return choiceArray
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (err, res) {
                var deptArr = []
                for (var i = 0; i < res.length; i++) {
                    if (answer.department === res[i].department) {
                        deptArr.push(res[i])
                    }
                }
                console.table(deptArr)
                start()
            });
        });
    });
};

var roleArr = []
function readRoles() {
    
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        };
    });
    return roleArr
};

var managerArr = []
function readManager() {
   
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name + " " + res[i].last_name)
        };
    });
    return managerArr
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: readRoles()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: readManager()
        }
    ]).then(function (answers) {
        var roleId = readRoles().indexOf(answers.role) + 1
        var managerId = readManager().indexOf(answers.manager) + 1
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            manager_id: managerId,
            role_id: roleId
        }, function(err){
            if (err) throw err
            console.log("Added Employee!")
            start()
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role SET?", {
            title: res.role
        })
        console.log("Added Role")
        start();
    });
};

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ?", {
            department: res.department
        })
        console.log("Added Department")
        start();
    });
};

function updateEmployee() {
    connection.query("SELECT employee.first_name, role.title FROM employee INNER JOIN role on role.id = employee.role_id ", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                
                choices: function () {
                    var employeeArr = []
                    for (var i = 0; i < res.length; i++) {
                        employeeArr.push(res[i].first_name)
                    }
                    return employeeArr
                }
            },
            {
                type: "list",
                name: "role",
                message: "Which role do you want to assign the selected employee?",
               
                choices: function () {
                    var roleArr = []
                    for (var i = 0; i < res.length; i++) {
                        roleArr.push(res[i].title)
                    }
                    return roleArr
                }
            }
        ]).then(function(answer){
            var roleId = readRoles().indexOf(answer.role) + 1
            connection.query("UPDATE employee SET ? WHERE ? ", 
            [
                {
                    role_id: roleId
                },
                {
                    first_name: answer.employee
                }
            ], 
            function(err, res){
                if(err) throw err
                console.log("Updated Role!")
                start();
            });
        });
    });
};