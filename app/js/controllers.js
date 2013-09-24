var ctrl = angular.module('ctrl',[]);
ctrl.controller('main',[function main(){
}]);

ctrl.controller('form',["$scope", "Customer", function form($scope, Customer){
  $scope.formdata = {
  noc: "",
  email: "",
  fn: "",
  ln: "",
  date: "",
  noc: "",
  pn: ""
  };
  
  var pn = window.localStorage.getItem('pn');
  var email = window.localStorage.getItem('email');
  var fn = window.localStorage.getItem('fn');
  var ln = window.localStorage.getItem('ln');
  var date = window.localStorage.getItem('date');
  var noc = window.localStorage.getItem('noc');

  $scope.formdata.noc = (noc == undefined) ? "":noc;
  $scope.formdata.email = (email == undefined) ? "": email;
  $scope.formdata.ln = (ln == undefined) ? "": ln;
  $scope.formdata.fn = (fn == undefined) ? "": fn;
  $scope.formdata.date = (date == undefined) ? "": date;
  $scope.formdata.pn = (pn == undefined) ? "": pn;
  
  console.log('email');
  console.log(email);
  
  $scope.$watch('formdata',function(){
   var pn = $scope.formdata.pn == undefined ? "":$scope.formdata.pn;   
   window.localStorage.setItem('pn',pn);
   window.localStorage.setItem('email',$scope.formdata.email);
   window.localStorage.setItem('fn',$scope.formdata.fn);
   window.localStorage.setItem('ln',$scope.formdata.ln);
   window.localStorage.setItem('date',$scope.formdata.date);
   window.localStorage.setItem('noc',$scope.formdata.noc);
  },true);
  

 $scope.formsave = function(form){
 if(form.$valid){
  var customer = new Customer({firstName:$scope.formdata.fn});
  customer.firstName = $scope.formdata.fn;
  customer.lastName = $scope.formdata.ln;
  customer.date = $scope.formdata.date;
  customer.noc = $scope.formdata.noc;
  customer.phone = $scope.formdata.pn;
  customer.email = $scope.formdata.email;
  
  customer.$save(function(){
   $("#DataSaved").modal();
  }); 
 }

 }
}]);

ctrl.controller('concierge',["$scope", "Customer", "getAllCustomers","CustomerUpdate", function concierge($scope, Customer, getAllCustomers,CustomerUpdate){
  
  
  


 getAllCustomers().then(function(customers){
   $scope.customers = customers;
   
   $scope.updateCus = function(id,seated){
    var customer = new CustomerUpdate();
    customer.id = id;
    customer.seated = seated;
    customer.$save({id:id});
   }
 });
}])                      