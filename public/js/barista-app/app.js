//
// Define the Baristamatic module, dependencies and specify client side routes to html templates in the templates dir
// $routeProvider and  $locationProvider are injected by Angular.
//
var app = angular.module('Baristamatic', [
    'ngRoute',
//    'templates',
    'ngResource'
]);


//Specify the template html file URL to access for each incoming request URL
app.config(function ( $routeProvider, $locationProvider) {
    console.log('barista-app>>app.js: config func running');
    $routeProvider
        .when('/baristamatic', {
            templateUrl: 'js/templates/baristamatic.html',
            controller: 'BaristamaticCtrl'
        })
       .when('js/templates/baristamatic/about', {
          templateUrl: 'js/templates/about.html'
       })
       .when('js/templates/baristamatic/blog', {
          templateUrl: 'js/templates/blog.html'
       })
       .when('js/templates/baristamatic/contact', {
          templateUrl: 'js/templates/contact.html'
       })
        .otherwise({
            redirectTo: '/baristamatic'
        });
    $locationProvider.html5Mode(true);
});

app.run(function () {
    //Write message to Inspect browser console
    console.log('barista-app>>app.js: angular app running');
});