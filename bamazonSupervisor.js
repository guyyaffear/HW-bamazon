var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

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
                arryFunc();
                break;
            case 'Create New Department':
                showLow();
                break;
            default:
                console.log("Not a valid choice.")
        }
    });
}

var departmentArray = [];





function arryFunc() {
    connection.query(
        "SELECT * FROM departments",
        function (error, response) {
            if (error) {
                console.log("There was error.")
                return;
            }
            console.table(response);
            // if (!error) {
            //     for (var i = 0; i < response.length; i++) {
            //         departmentArray.push(response[i].department_name);
            //     }
            //     console.log(departmentArray);
            //     for (var i = 0; i < departmentArray.length; i++){
            //         connection.query(`SELECT * FROM departments WHERE department_name = '${departmentArray[i]}'`, function (error, response) {
            //             // console.log('error', error);
            //             // console.log('response', response);
            //             if (error) {
            //                 console.log("Odd syntax error.", error);
            //                 return;
            //             } else {
            //                 console.log(response)
            //                 for (var i =0; i< response.length; i++){
            //                     var newTotal = 0
            //                     var updatedTotal = newTotal + response[i].product_sales
            //                     console.table(updatedTotal);
            //                 }
            //             }
            //         })
            //     }
            // }
        }
    )
}

function showLow() {
    connection.query("SELECT products.stock_quantity,departments.over_head_costs FROM products LEFT JOIN departments ON  products.department_name = departments.department_name ", function (err, results) {
        if (err) throw err;
        console.table(results);
        SuperVisor();
        });
}
SuperVisor();