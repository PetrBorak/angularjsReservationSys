var directives = angular.module('directives',[]);
directives.directive('datepickerdir', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
                $(element).datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            
        }
    }
});


directives.directive('integer', function() {
  var INTEGER_REGEXP = /^\d*$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
});

directives.directive('phonenum', function() {
  var PHONENUMREGEXP = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (PHONENUMREGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('phonenumber', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('phonenumber', false);
          return undefined;
        }
      });
    }
  };
});