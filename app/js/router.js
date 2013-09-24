var routermod = angular.module("routermod",[]);

routermod.config(function($routeProvider){
 $routeProvider.when("/", {templateUrl: "http://www.borakpetr.cz/livebookingcom/app/templates/customer.html"}).when("/concierge", {templateUrl: "http://www.borakpetr.cz/livebookingcom/app/templates/concierge.html"});
})    