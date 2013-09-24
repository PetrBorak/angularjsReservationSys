
 require(["bootstrap", "jquery", "angular","ctrl","directives","router","jqueryui","services","angularResource"], function(){
 angular.element(document).ready(function(){
    angular.module('myApp',['ctrl','routermod','directives','services']);                                
    angular.bootstrap(document, ['myApp']);                           
    });
  
 });                                
                                                                  