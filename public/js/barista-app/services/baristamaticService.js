//
// Define inventory and drinks functions that use the $http service to make rest calls to
// the Rails baristamatic_controller. Return a Promise to the caller which they can pass
// a callback to run when the request completes.
//
angular.module('Baristamatic').factory('BaristamaticService', function ($http) {
    return {
        inventory: function () {
            console.log("BaristamaticService: inventory");
            // Return a promise that the controller will wait on
            return $http.get('/api/v1/inventory');
        },
        drinks: function () {
            console.log("BaristamaticService: drinks");
            // Return a promise that the controller will wait on
            return $http.get('/api/v1/drinks');
        },
        reStockInventory: function () {
            console.log("BaristamaticService: reStockInventory");
            // Return a promise that the controller will wait on
            return $http.get('/api/v1/reStockInventory');
        },
        buy: function (number) {
            console.log("BaristamaticService: buy called with " + number);
            // Return a promise that the controller will wait on
            return $http({
                url: '/api/v1/buy',
                method: "GET",
                params: {number: number}
            });
        }
    }
});
