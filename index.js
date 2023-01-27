const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require(".");
//require("console.table");

require("dotenv").config();
//db.query = utils.promisify(db.query);

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
});

function viewAllDepartments() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM department", function (err, result) { resolve(result) });
    });
};

function viewAllRoles() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM role", function (err, result) { resolve(result) });
    });
};

function viewAllEmployees() {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM employee", function (err, result) { resolve(result) });
    });
};

async function questions() {
    const dept = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "directory",
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a new Department",
                "Add a new Role",
                "Add a new Employee",
                "Update an employee's Role",
            ],
        },
    ]);
    console.log(dept);
    if (dept.directory === "Add a new Department") {
        const deptPrompt = await inquirer.prompt([
            {
                type: "input",
                message: "What Department would you like to add?",
                name: "department_name",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
        ]);
        console.log(deptPrompt);
        function addDept() {
            db.query(
                "INSERT INTO department (department_name) VALUES (?)",
                deptPrompt.department_name,
                function (error) {
                    if (error) throw error;
                    console.log("Department added successfully");
                }
            );
        };
        addDept();
    } else if (dept.directory === "View all Departments") {
        const showDepartments = await viewAllDepartments();
        console.table(showDepartments);
    } else if (dept.directory === "Add a new Role") {
        const deptView = await viewAllDepartments();
        const newRole = await inquirer.prompt([
            {
                type: "list",
                message: "In what Department does the new Role belong?",
                name: "department",
                choices: deptView.map(function (element) {
                    return { name: element.department_name, value: element.id };
                }),
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
            {
                type: "input",
                message: "What is the name of the new Role?",
                name: "title",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
            {
                type: "input",
                message: "What is the salary of the new Role:",
                name: "salary",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
        ]);
        function addRole() {
            db.query(
                "INSERT INTO role (department_id,title,salary) VALUES (?,?,?)",
                [newRole.department, newRole.title, newRole.salary],
                function (error) {
                    if (error) throw error;
                    console.log("New Role added Successfully");
                }
            );
        };
        addRole();
    } else if (dept.directory === "View all Roles") {
        const roles = await viewAllRoles();
        console.table(roles);
    } else if (dept.directory === "Add a new Employee") {
        const viewRoles = await viewAllRoles();
        const newEmployee = await inquirer.prompt([
            {
                type: "list",
                message: "Which Role is the new employee assigned?",
                name: "role",
                choices: viewRoles.map(function (element) {
                    return { name: element.title, value: element.id };
                }),
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
            {
                type: "input",
                message: "What is the new Employee's FIRST name?",
                name: "first_name",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
            {
                type: "input",
                message: "What is the new Employee's LAST name?",
                name: "last_name",
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
        ]);
        function addEmployee() {
            db.query(
                "INSERT INTO employee (role_id,first_name,last_name) VALUES (?,?,?)",
                [newEmployee.role, newEmployee.first_name, newEmployee.last_name],
                function (error) {
                    if (error) throw error;
                    console.log("Employee added Successfully");
                }
            );
        };
        addEmployee();
    } else if (dept.directory === "View all Employees") {
        const employees = await viewAllEmployees();
        console.table(employees);
    } else if (dept.directory === "Update an employee's Role") {
        const viewRoles = await viewAllRoles();
        const viewEmployees = await viewAllEmployees();
        const updatePrompt = await inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "employees",
                choices: viewEmployees.map(function (element) {
                    return { name: element.last_name, value: element.id };
                }),
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
            {
                type: "list",
                message: "Which new Role do you want to assign this employee?",
                name: "roles",
                choices: viewRoles.map(function (element) {
                    return { name: element.title, value: element.id };
                }),
                validate: (value) => {
                    if (value) {
                        return true;
                    } else {
                        return "Please Type Something";
                    }
                },
            },
        ]);
        function updateEmployee() {
            db.query(
                "UPDATE employee SET role_id =(?) WHERE id = (?)",
                [updatePrompt.roles, updatePrompt.employees],
                function (error) {
                    if (error) throw error;
                    console.log("Employee updated Successfully");
                }
            );
        };
        updateEmployee();
    };
    questions();
};

questions().catch((error) => {
    console.error(error).then(console.log("something")
    )
});