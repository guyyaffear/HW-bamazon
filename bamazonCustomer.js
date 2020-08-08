var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "pass",
    database: "bamazon"
});
// console.log(connection);


connection.connect(function (err) {
    if (err) throw err;
    userPrompt();
});
function displayST() {
    connection.query("SELECT * FROM products"
        , function (err, data) {
            if (err) throw err;
            console.table(data);
            // connection.end();
        });
}

function userPrompt() {
    displayST();

   setTimeout( ()=>{ 
       inquirer.prompt([
        {
            type: "input",
            name: "ID",
            message: "what ID of the product  would you like to buy?"
        },

        {
            type: "input",
            name: "Quantity",
            message: "how many units of the product you would like to buy?"
        },


    ]).then(function (answers) {
        var quantityNeeded = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantityNeeded);
    })}, 1000);
}


function purchaseOrder(ID, Qneeded) {
    // console.log("i am insiane the Fuc Id is ", ID, Qneeded);
    connection.query("Select * FROM products WHERE item_id = ?",
        [ID],
        function (err, data) {
            if (err) console.log('-->', err)//throw err;
            // console.log("data i am here ", data);
            if (Qneeded <= data[0].stock_quantity) {
                var totalCost = data[0].price * Qneeded;
                console.log("Good news your order is in stock!");
                console.log("Your total cost for " + Qneeded + " " + data[0].product_name + " is " + totalCost + " Thank you!");

                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: data[0].stock_quantity - Qneeded
                    },
                    {
                        item_id: ID
                    }], function (err, res) {
                        if (err) throw err;
                        // console.log("Response", res);
                    });
            }
            else {
                console.log("Insufficient quantity, sorry we do not have enough " + data[0].product_name + "to complete your order.");
                // connection.end();
            };
            displayST();
            connection.end();
        });
};