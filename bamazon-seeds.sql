DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2) NULL,
  stock_quantity INT (11),
  PRIMARY KEY (item_id)
);
INSERT INTO products ( product_name,  department_name, price, stock_quantity)
VALUES ("19V 6.32A 120W Laptop Adapter", "electronic", 37.99,11);

INSERT INTO products ( product_name,  department_name, price, stock_quantity)
VALUES ("AmazonBasics Heavy-Duty, Full Motion Articulating TV Wall Mount for 22-inch to 55-inch", "Electronics", 30.49 ,15);

INSERT INTO products ( product_name,  department_name, price, stock_quantity)
VALUES ("Amazon Smart Plug, works with Alexa – A Certified for Humans Device", "ALEXA SMART HOME", 24.99 ,40);
