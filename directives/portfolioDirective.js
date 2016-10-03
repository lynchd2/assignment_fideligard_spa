app.directive("portfolioRow", ['portfolioService', "stockService", function(portfolioService, stockService){

  return {
    templateUrl: "/directives/portfolioDirective.html",
    restrict: "A",
    scope: {
      symbolObject: "=",
      cash: "="
    },

    link: function(scope){

      scope.symbol = function() {
        var symbols = []
        for(var keys in scope.symbolObject) {
          symbols.push(scope.symbolObject[keys].symbol);
        }
        return symbols[0];
      };

      scope.quantity = (function() {
        var quantity = []
        for(var keys in scope.symbolObject) {
          quantity.push(scope.symbolObject[keys].quantity);
        }
        quantity = quantity.filter(function(val) { return val !== undefined })
        var total = 0;
        for(var i = 0; i < quantity.length; i++) {
          total += quantity[i];
        }
        return total
      })();

      scope.costBasis = (function() {
        var quantity = []
        for(var keys in scope.symbolObject) {
          quantity.push(scope.symbolObject[keys].quantity * scope.symbolObject[keys].opening);
        }
        quantity = quantity.filter(function(val) { return val !== undefined })
        var total = 0;
        for(var i = 0; i < quantity.length; i++) {
          if(quantity[i]) {
            total += quantity[i];
          }
        }
        return total
      })();

      scope.currentValue = (function() {
        return stockService.getCurrentValue(scope.symbol(), 251 - stockService.getDay()) * scope.quantity;
      })()

      scope.profitLoss = (function() {
        return scope.currentValue - scope.costBasis;
      })()

      scope.pastAndPresentPrices = (function() {
        scope.currentPrice = stockService.getCurrentValue(scope.symbol(), 251 - stockService.getDay());
        var pastPrices = stockService.getThisDayAnalytics(scope.symbol())[0];
        scope.oneDay = pastPrices[0];
        scope.sevenDays = pastPrices[1];
        scope.thirtyDays = pastPrices[2]
      })()
    }

  }
}]);
