//
// Init the mongo baristamatic collection to a known state
//
var mongoose = require('mongoose');
var Inventory = require('../models/inventory.js');
var Drink = require('../models/drink.js');

var invs = [];
var invCostMap = {};

function initDrinks(mongooseConnection) {
   mongooseConnection.collections['drinks'].drop(function (err) {
      console.log('Drinks dropped');

      var drinks = [];

      //Add drinks
      drinks.push(new Drink({
         number: 1,
         name: 'coffee',
         displayName: 'Coffee',
         recipe: [{ingredient: 'coffee', count: 3}, {ingredient: 'sugar', count: 1}, {ingredient: 'cream', count: 1}]
      }));
      drinks.push(new Drink({
         number: 2,
         name: 'decafCoffee',
         displayName: 'Decaf Coffee',
         recipe: [{ingredient: 'decafCoffee', count: 3}, {ingredient: 'sugar', count: 1}, {
            ingredient: 'cream',
            count: 1
         }]
      }));
      drinks.push(new Drink({
         number: 3,
         name: 'caffeLatte',
         displayName: 'Caffe Latte',
         recipe: [{ingredient: 'espresso', count: 2}, {ingredient: 'steamedMilk', count: 1}]
      }));
      drinks.push(new Drink({
         number: 4,
         name: 'caffeAmericano',
         displayName: 'Caffe Americano',
         recipe: [{ingredient: 'espresso', count: 3}]
      }));
      drinks.push(new Drink({
         number: 5,
         name: 'caffeMocha',
         displayName: 'Caffe Mocha',
         recipe: [{ingredient: 'espresso', count: 1}, {ingredient: 'cocoa', count: 1}, {
            ingredient: 'steamedMilk',
            count: 1
         }, {ingredient: 'whippedCream', count: 1}]
      }));
      drinks.push(new Drink({
         number: 6,
         name: 'cappuccino',
         displayName: 'Cappuccino',
         recipe: [{ingredient: 'espresso', count: 2}, {ingredient: 'steamedMilk', count: 1}, {
            ingredient: 'foamedMilk',
            count: 1
         }]
      }));

      drinks.forEach(function (drink) {
         setDrinkCost(drink);
         drink.save();
      });

      console.log('Drinks added to mongo');
   });
}

function setDrinkCost(drink) {
   var totalCost = 0;
   var recipe = drink.recipe;
   recipe.forEach(function (item) {
      var ingredient = item.ingredient;
      var count = item.count;
      var unitCost = invCostMap[ingredient];
      totalCost += unitCost * count;
   });
   drink.cost = totalCost.toFixed(2);
}

function initInventory(mongooseConnection) {
   mongooseConnection.collections['inventories'].drop(function (err) {
      console.log('Inventories dropped');

      //Add inventory
      invs.push(new Inventory({displayName: 'Cocoa', name: 'cocoa', cost: 0.90, count: 10}));
      invs.push(new Inventory({displayName: 'Coffee', name: 'coffee', cost: 0.75, count: 10}));
      invs.push(new Inventory({displayName: 'Decaf Coffee', name: 'decafCoffee', cost: 0.75, count: 10}));
      invs.push(new Inventory({displayName: 'Sugar', name: 'sugar', cost: 0.25, count: 10}));
      invs.push(new Inventory({displayName: 'Cream', name: 'cream', cost: 0.25, count: 10}));
      invs.push(new Inventory({displayName: 'Steamed Milk', name: 'steamedMilk', cost: 0.35, count: 10}))
      invs.push(new Inventory({displayName: 'Foamed Milk', name: 'foamedMilk', cost: 0.35, count: 10}));
      invs.push(new Inventory({displayName: 'Espresso', name: 'espresso', cost: 1.10, count: 10}));
      invs.push(new Inventory({displayName: 'Whipped Cream', name: 'whippedCream', cost: 1.00, count: 10}));

      //Save each to mongo
      for (i = 0; i < invs.length; i++) {
         invs[i].save();
      }

      //Load global invCostMap
      invs.forEach(function (inv) {
         invCostMap[inv.name] = inv.cost;
      });

      console.log("Inventory added to mongo");
   });

}

exports.initDB = function (mongooseConnection) {
   initInventory(mongooseConnection);
   initDrinks(mongooseConnection);
}

exports.reInitInventory = function () {
   initInventory(mongoose.connection)
}