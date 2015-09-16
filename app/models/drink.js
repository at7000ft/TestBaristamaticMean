/**
 * ingredient.js
 *    Created by rholl00 on 6/19/15.
 */

// The Drink model

//Pull in mongoose from node_modules/mongoose, declare the Schema mongoose class
//The mongoose Schema is what is used to define attributes for our documents.
var mongoose = require('mongoose'), Schema = mongoose.Schema;

//Define the Drink schema model. Valid types are:
//String
//Number
//Date
//Buffer
//Boolean
//Mixed
//ObjectId
//Array
var drinkSchema = new Schema({
   number: Number,
   name: String,
   displayName: String,
   recipe: [{ingredient: String, count: Number}],
   inStock: Boolean,
   cost: Number
});

//Create the mongoose Ingredient model
module.exports = mongoose.model('Drink', drinkSchema);
