app.directive("stockRow", ['stockService', function(stockService){

  return {
    templateUrl: "/directives/stockDirective.html",
    restrict: "A",
    scope: {
      stockObject: "=",
    },
    link: function(scope){
      scope.symbol = scope.stockObject[3]
      scope.opening = scope.stockObject[4]
      scope.firstDay = scope.stockObject[0]
      scope.sevenDay = scope.stockObject[1]
      scope.thirtyDay = scope.stockObject[2]
    }
  };
}]);
