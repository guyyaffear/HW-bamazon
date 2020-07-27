var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "123456",
    database: "bamazon"
});
// console.log(connection);
function viewProductsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        run();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        console.table(results);
        run();
    });
}

function addToInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "productId",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "Please select an item"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "Please enter the quantity to add",
                }
            ]).then(function (answer) {
                itemId = parseInt(answer.productId);
                qty = parseInt(answer.qty);
                connection.query("SELECT * FROM products where item_id= ?",
                    [
                        itemId
                    ], function (err, res) {
                        if (err) throw err;
                        else {
                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    { stock_quantity: res[0].stock_quantity + qty },
                                    { item_id: itemId }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("Quantity updated successfully");
                                    run();
                                });
                        }
                    });
            });
    });
}

function createNew() {
    setTimeout( ()=>{ 

    inquirer.prompt([
        {
            type: 'input',
            name: 'itemName',
            message: 'What item would you like to add?',
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department does your item belong to?',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What should be the price for the item?',
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many are being added to the inventory?'
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            [{
                product_name: answer.itemName,
                department_name: answer.department,
                price: parseInt(answer.price),
                stock_quantity: parseInt(answer.quantity)
            }],
            function (err, res) {
                if (err) {
                    console.log("bad code");
                    return;
                }
                else {
                    console.log(`\nWe have successfully added ${answer.itemName} to the inventory. We have ${answer.quantity} in stock.\n`)
                    run();
                }
            }
        );
    })}, 1000);
}

// connection.connect(function (err) {
//     if (err) throw err;});
function run() {
    // query the database for all products available for purchase
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the products, prompt the user for which they'd like to purchase
        inquirer.prompt([
            {
                name: "select",
                type: "list",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                message: "What would you like to do?"
            }
        ]).then(function (answer) {

            switch (answer.select) {
                case "View Products for Sale":
                    viewProductsForSale();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    createNew();
                    break;
            }
        });
    });
};
run();