app.directive("stockRow", ['stockService', function(stockService){

  return {
    templateUrl: "/directives/stockDirective.html",
    restrict: "A",
    scope: {
      stockObject: "=",
      tradeDay: "="
    },
    link: function(scope){

      scope.stocks =  function() {
        return stockService.getCurrentStocks();
      }
      console.log(scope.stockPrices)
    }
  };
}]);
