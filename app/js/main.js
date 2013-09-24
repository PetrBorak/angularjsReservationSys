requirejs.config({
 "baseUrl": "app",
 "paths": {
   "jquery": "http://code.jquery.com/jquery-1.9.1",
   "angular": "http://code.angularjs.org/1.1.5/angular",
   "angularResource": "js/resource",
   "ctrl":"js/controllers",
   "services":"js/services",
   "directives":"js/directives",
//   "mockup":"js/mockupCustomers",                         
   "bootstrap": "bootstrap/js/bootstrap",
   "router": "js/router",
   "jqueryui": "http://code.jquery.com/ui/1.10.3/jquery-ui",
   "bootstrap": "bootstrap/js/bootstrap"
 },
 "shim":{
  "ctrl":["angular","jquery","jqueryui","angularResource"],
  "directives": ["angular","jquery","jqueryui","angularResource"],
  "services":["angular","jquery","jqueryui","angularResource"],
  "directives":["angular","jquery","jqueryui","angularResource"],
  "bootstrap":["jquery","jquery","jqueryui"],
  "router":["angular","jquery","jqueryui","angularResource"],
  "jqueryui":["jquery"],
  "angularResource":["angular"]
 }                                                                    
})

requirejs(['app/js/mainapp.js']);