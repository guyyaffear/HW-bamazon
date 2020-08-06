var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'Guy6720784',
    database: 'bamazon'
});

function displayDeptDetails() {
    connection.query("SELECT departments.*, SUM(products.product_sales) as product_sales FROM departments inner join products on departments.department_name = products.department_name group by products.department_name", function (err, results) {
        if (err) throw err;
        console.table(results);
        SuperVisor();
        });
}


function addNewDepartment() {
    setTimeout( ()=>{ 

    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Please enter your new department name: ',
        },
        {
            type: 'input',
            name: 'deptCost',
            message: 'Please enter your department over head costs: ',
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            [{
                department_name: answer.deptName,
                over_head_costs: answer.deptCost
            }],
            function (err, res) {
                if (err) {
                    console.log("bad code");
                    return;
                }
                else {
                    console.log(`\nWe have successfully added the department ${answer.deptName}\n`);
                }
            }
        );
    })}, 1000);
}


function SuperVisor() {
    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'query',
            message: 'What would you like to do?',
            choices: ['View Sales by Department', 'Create New Department']

        }
    ).then(function (answer) {
        response = answer.query;
        switch (response) {
            case 'View Sales by Department':
                displayDeptDetails();
                break;
            case 'Create New Department':
                addNewDepartment();
                break;
            default:
                console.log("Not a valid choice.")
        }
    });
}






SuperVisor();