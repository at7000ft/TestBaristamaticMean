//
// Define a controller called BaristamaticCtrl in the AngularRails application module
// referenced in app.js route. Define 4 functions which call the BaristamaticService which make rest/json requests to the Rails server
// to buy,restock, and update inventory and drink status on page.
// Your controller must be responsible for binding model data to views using $scope.
//
angular.module('Baristamatic')
   .controller('BaristamaticCtrl', function ($log, $scope, BaristamaticService) {
      $log.info('barista-app>>controllers/baristamaticCtrl.js: BaristamaticCtrl running');
      //
      // BaristamaticService.inventory() and drinks() returns a promise, not the data, call .then on the promise
      // and pass a function to execute when the rest call in BaristamaticService completes
      //
      // var promise = BaristamaticService.inventory();
      // The response object has four properties: config, data, headers and status

      // Function called when controller created and whenever a 'buy' or 'reStockInventory' is performed
      var inventory = function () {
         BaristamaticService.inventory().then(function (resp) {
               $scope.inventory = resp.data;

            },
            function (errorPayload) {
               $log.error('failure loading inventoy', errorPayload);
               $scope.inventory = "Load Error";
            });
      }

      //promise = BaristamaticService.drinks();
      // The response object has four properties: config, data, headers and status

      // Function called when controller created and whenever a 'buy' or 'reStockInventory' is performed
      var drinks = function () {
         BaristamaticService.drinks().then(function (resp) {
               $scope.drinks = resp.data;

            },
            function (errorPayload) {
               $log.error('failure loading drinks', errorPayload);
               $scope.drinks = "Load Error";
            });
      }

      // Function called by view
      $scope.buy = function (number) {
         BaristamaticService.buy(number).then(function (resp) {
               $log.info("BaristamaticCtrl>>buy: called with " + number + " resp status - " + resp.status)
            },
            function (errorPayload) {
               $log.error('failure  buying drink', errorPayload);
            });
         drinks();
         inventory();
      }

      // Function called by view
      $scope.reStockInventory = function ($scope) {
         BaristamaticService.reStockInventory().then(function (resp) {
               $log.info("BaristamaticCtrl>>reStockInventory: called")
            },
            function (errorPayload) {
               $log.error('failure  reStockInventory', errorPayload);
            });
         drinks();
         inventory();
      }

      drinks();
      inventory();

   });