

var mongoose = require('mongoose');

//Setup pending connection to mongodb running on localhost, test collection.
mongoose.connect('mongodb://localhost/baristamatic', function(err) {
//mongoose.connect(dbProps.url, function(err) {
   if (err) {
      console.log("Mongodb connection error (is it running?): " + err);
      process.exit();
   }
   console.log("Mongoose is connected to Mongo at default port 27017")
});



var Inventory = require('../models/inventory.js');
var Drink = require('../models/drink.js');

//Drop collections
mongoose.connection.collections['inventories'].drop( function(err) {
   console.log('inventories dropped');
});
mongoose.connection.collections['drinks'].drop( function(err) {
   console.log('drinks dropped');
});

//Add inventory
new Inventory({displayName: 'Cocoa', name: 'cocoa', cost: 0.90, count: 10}).save();
new Inventory({displayName: 'Coffee', name: 'coffee', cost: 0.75, count: 10}).save();
new Inventory({displayName: 'Decaf Coffee', name: 'decafCoffee', cost: 0.75, count: 10}).save();
new Inventory({displayName: 'Sugar', name: 'sugar', cost: 0.25, count: 10}).save();
new Inventory({displayName: 'Cream', name: 'cream', cost: 0.25, count: 10}).save();
new Inventory({displayName: 'Steamed Milk', name: 'steamedMilk', cost: 0.35, count: 10}).save();
new Inventory({displayName: 'Foamed Milk', name: 'foamedMilk', cost: 0.35, count: 10}).save();
new Inventory({displayName: 'Espresso', name: 'espresso', cost: 1.10, count: 10}).save();
new Inventory({displayName: 'Whipped Cream', name: 'whippedCream', cost: 1.00, count: 10}).save();

console.log("Inventory added to mongo")

//Add drinks

new Drink({number: 1, name: 'coffee', displayName: 'Coffee', recipe: [ {ingredient: 'coffee', count: 3}, {ingredient: 'sugar', count: 1}, {ingredient: 'cream', count: 1}]}).save();
new Drink({number: 2, name: 'decafCoffee', displayName: 'Decaf Coffee', recipe: [ {ingredient: 'decafCoffee', count: 3}, {ingredient: 'sugar', count: 1}, {ingredient: 'cream', count: 1}]}).save();
new Drink({number: 3, name: 'caffeLatte', displayName: 'Caffe Latte', recipe: [ {ingredient: 'espresso', count: 2},  {ingredient: 'steamedMilk', count: 1}]}).save();
new Drink({number: 4, name: 'caffeAmericano', displayName: 'Caffe Americano', recipe: [ {ingredient: 'espresso', count: 3}]}).save();
new Drink({number: 5, name: 'caffeMocha', displayName: 'Caffe Mocha', recipe: [ {ingredient: 'espresso', count: 1}, {ingredient: 'cocoa', count: 1}, {ingredient: 'steamedMilk', count: 1}, {ingredient: 'whippedCream', count: 1}]}).save();
new Drink({number: 6, name: 'cappuccino', displayName: 'Cappuccino', recipe: [ {ingredient: 'espresso', count: 2}, {ingredient: 'steamedMilk', count: 1}, {ingredient: 'foamedMilk', count: 1}]}).save();

console.log('Drinks added to mongo');