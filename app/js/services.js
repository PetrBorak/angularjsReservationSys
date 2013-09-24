var services = angular.module("services",["ngResource"]);
services.factory('Customer',function($resource){
 return $resource("http://www.borakpetr.cz/livebooking/customers/:firstName/:id",{firstName:'@firstName'});
});

services.factory('CustomerUpdate',function($resource){
 return $resource("http://www.borakpetr.cz/livebooking/customers/update/:id",{id:'@id'});
});

services.factory("getAllCustomers", function($q, Customer){
   return function(){
   
    var deffered = $q.defer();
    var customers = Customer.query(function(){
   
      deffered.resolve(customers);
    });

    return(deffered.promise);
   }
});
