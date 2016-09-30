app.directive("transactionRow", ['transactionService', function(transactionService){

  return {
    templateUrl: "/directives/transactionDirective.html",
    restrict: "A",
    scope: {
      transactionObject: "=",
    },
    link: function(scope){
      console.log(scope.transactionObject)
      scope.date = scope.transactionObject.date;
      scope.price = scope.transactionObject.opening;
      scope.quantity = scope.transactionObject.quantity;
      scope.symbol = scope.transactionObject.symbol;
      scope.transactionType = scope.transactionObject.transactionType;
    }
  };
}]);
