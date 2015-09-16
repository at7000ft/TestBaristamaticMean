/**
 * server.js
 *    Created by rholl00 on 8/6/15.
 *
 *    Main node.js starting point, creates an Express web server, inits drink/inventory data in mongo, sets up all url route links to controller methods, etc.
 *    Access at: localhost:3000
 */

/*
 * Module dependencies
 */
//Express Web Server - 'require' is a node.js keyword that imports functions and loads them into a variable (serving as a namespace)
var express = require('express')
//CSS preprocessor
var stylus = require('stylus')
//Logger
var logger = require('morgan');
//ODM package
var mongoose = require('mongoose');
//http request body parsing utils
var bodyparser = require('body-parser')
//DB init function
var populatedb = require('./app/services/populatedb.js');
// Import the methods in controllers/api.js. Set up the RESTful API, handler methods are defined in controllers/api.js
var baristamaticController = require('./app/controllers/baristamaticController.js');

//Start an express web server
var app = express();

//Set where views are located
app.set('views', __dirname + '/app/views')

//Tell express to use jade template engine
app.set('view engine', 'jade')

//The app.use() calls pass 'middleware' functions for Express to use. Middleware are simply functions that have the signature fn(req, res, next).
//Express executes them in the order in which they are passed

//Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyparser.urlencoded({extended: false}))

//This will simply log incoming requests to the console. Express logger in 'dev' mode.
app.use(logger('dev'));

//Stylus middleware is applied, which will compile our public/stylesheets/style.styl file to public/stylesheets/style.css.
app.use(stylus.middleware({
   src: __dirname + '/public/css/',
   dest: __dirname + '/public/css/',
   debug: true,
   force: true,
}));

//Look for static content in public dir
app.use(express.static(__dirname + '/public'));

//Load the dbUrl property with the value from db.js
var dbProps = require('./config/db');

//Setup pending connection to mongodb running on localhost, baristamatic collection.
mongoose.connect('mongodb://localhost/baristamatic', function(err) {
//mongoose.connect(dbProps.url, function(err) {
   if (err) {
      console.log("Mongodb connection error (is it running?): " + err);
      process.exit();
   }
   console.log("Mongoose is connected to Mongo at default port 27017")
});

//Init mongo collection
populatedb.initDB(mongoose.connection);

//
// Routing - associate URLs with controller methods which interact with Mongo
//

//GET current inventory - http://localhost:3000/api/v1/inventory
app.get('/api/v1/inventory', baristamaticController.inventory);

//GET current inventory - http://localhost:3000/api/v1/inventory
app.get('/api/v1/drinks', baristamaticController.drinks);

app.get('/api/v1/reStockInventory', baristamaticController.reStockInventory);

app.get('/api/v1/buy', baristamaticController.buy);

//Respond to get requests at / or /baristamatic with index.jade page (which pulls in layout.jade first) passing it the value for the 'title' key.
app.get('/', function (req, res) {
   res.render('index',
      {title: 'TestBaristamaticMean'}
   )
});

app.get('/baristamatic', function (req, res) {
   res.render('index',
      {title: 'TestBaristamaticMean'}
   )
});

//
//Setup service to listen for http connections on port 3000
//
app.listen(3000)

console.log("Listening on 3000")