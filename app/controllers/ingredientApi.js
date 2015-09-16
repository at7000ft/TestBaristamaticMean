/**
 * ingredientApi.js
 *    Created by rholl00 on 8/6/15.
 */

/* Not used
The API controller
 Exports 5 methods:
 *  post - Creates a new ingredient
 *  list - Returns a list of ingredients
 *  show - Displays an ingredient
 *  delete - delete an ingredient
 *  update - update an ingredient
 *
 *  Methods are imported by server.js
 *
 */


var Ingredient = require('../models/ingredient.js');

//Export a postIngredient method to save a new Ingredient
exports.postIngredient = function(req, res) {
   //Check if already exists first. Call mongoose built in findOne method passing query json and a function to process result.
   Ingredient.findOne({name: req.body.name}, function(error, ingredient) {
      if (error) {
         console.error("findOne error: " + error);
         res.send("findOne error: " + error);
      } else if (ingredient == null) {
         //Save a new Ingredient document to mongo using built in mongoose save method.
         new Ingredient({name: req.body.name, unitCost: req.body.unitCost}).save();
         res.send("Added " +req.body.name );
      } else {
         console.log("Ingredient already exists: " + req.body.name);
         res.send("findOne error: already exists");
      }
   });
}

//Export method to return all Ingredient documents
exports.listIngredient = function(req, res) {
   Ingredient.find(function(err, ingredients) {
      res.send(ingredients);
   });
}

//Export method to find an Ingredient by name.
exports.showIngredient = (function(req, res) {
   Ingredient.findOne({name: req.params.name}, function(error, ingredient) {
      if (error || ingredient == null) {
         console.error("findOne error: " + error);
         res.send("findOne error: " + error);
      } else {
         res.send(ingredient);
      }
   });
});

// Remove an Ingredient by name.
exports.deleteIngredient = function(req, res) {
   Ingredient.findOneAndRemove({name: req.params.name}, function(err) {
      if (err) {
         console.log("Error removing " +req.params.name);
         res.send("Error removing " +req.params.name);
      } else {
         console.log("Removed ingredient " +req.params.name);
         res.send("Removed ingredient " +req.params.name);
      }
   });
}

// Update an Ingredient by name.
exports.updateIngredient = function(req, res) {
   Ingredient.findOneAndUpdate({name: req.params.name}, {name: req.body.name, unitCost: req.body.unitCost}, {upsert:true}, function(err, doc) {
      if (err) {
         console.log("Error updating " +req.params.name);
         res.send("Error updating " +req.params.name);
      } else {
         console.log("Updated ingredient " + doc);
         res.send("Updated ingredient " +req.params.name);
      }
   });
}
