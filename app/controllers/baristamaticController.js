/**
 * baristamaticController.js
 *    Created by rholl00 on 9/15/15.
 */


var Drink = require('../models/drink.js');
var Inventory = require('../models/inventory.js');
var Services = require('../services/populatedb.js')



//Export method to return inventory items
exports.inventory = function (req, res) {
   Inventory.find(function (err, items) {
      res.send(items);
   });
}

//Export method to return drinks
exports.drinks = function (req, res) {
   console.log("Returning all drinks")

   Inventory.find(function (err, invs) {
      var invMap = {};
      invs.forEach(function (inv) {
         invMap[inv.name] = inv.count;
      });
      Drink.find(function (err, drinks) {
         //Load the inStock var true if ingredients are still available
         drinks.forEach(function (drink) {
            drink.inStock = true;
            var recipe = drink.recipe;
            recipe.forEach(function (item) {
               var ingredient = item.ingredient;
               var requiredCount = item.count;
               if (invMap[ingredient] < requiredCount) {
                  drink.inStock = false;
                  console.log("Out of " + drink.name);
               }
            });
            //setDrinkCost(drink);
         })
         console.log("drinks: returning all drinks")

         res.send(drinks);
      });
   });
}

exports.reStockInventory = function (req, res) {
   console.log("Restocking inventory")
   Services.reInitInventory();
   res.send({});
}

exports.buy = function (req, res) {
   console.log("Buying drink " + req.query.number);
   //First get the drink so we can read the recipe
   Drink.findOne({number: req.query.number}, function (error, drink) {
      if (error || drink == null) {
         console.error("Drink not found  error: " + error);
         res.send("Drink not found  error: " + error);
      } else {
         var recipe = drink.recipe;
         //Now decrement the Inventory count for each item in the recipe
         recipe.forEach(function (item) {
            //console.log("Ingrdient - " + item.ingredient);
            var ingredient = item.ingredient;
            var count = item.count;
            var decrementBy = -1 * count;
            Inventory.findOneAndUpdate({name: ingredient}, {$inc: {count: decrementBy}}, {upsert: true}, function (err, doc) {
               if (err) {
                  console.log("Error updating " + ingredient);
                  res.send("Error updating " + ingredient);
               } else {
                  //console.log("Updated ingredient " + ingredient);
                  //res.send("Updated ingredient " + ingredient);
               }
            });
            //Set any < zero counts to zero
            Inventory.findOneAndUpdate({name: ingredient, count: {$lt: 0}}, {$set: {count: 0}}, function (err, doc) {
               if (err) {
                  console.log("Error updating " + ingredient);
                  res.send("Error updating " + ingredient);
               } else {
                  //console.log("Updated ingredient " + ingredient);
                  //res.send("Updated ingredient " + ingredient);
               }
            });
         });
         res.send({});
      }
   });
}

function setDrinkCost(drink) {

   Inventory.find(function (err, invs) {
      var invMap = {};
      if (err) {
         console.log("setDrinkCosts Error finding Inv " + " - " + err);
      } else {
         invs.forEach(function (inv) {
            invMap[inv.name] = inv.cost;
         });
      }

      var totalCost = 0;
      var recipe = drink.recipe;
      recipe.forEach(function (item) {
         var ingredient = item.ingredient;
         var count = item.count;
         var unitCost = invMap[ingredient];
         totalCost += unitCost * count;
      });
      drink.cost = totalCost;
      Drink.findOneAndUpdate({name: drink.name}, {cost: totalCost}, function (err, data) {
         if (err) {
            console.log("setDrinkCosts Error updating " + drink.name + " - " + err);
         }
      });
   });
}

