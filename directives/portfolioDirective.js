app.directive("portfolioRow", ['portfolioService', function(portfolioService){

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
      }

      scope.quantity = function() {
        var quantity = []
        for(var keys in scope.symbolObject) {
          quantity.push(scope.symbolObject[keys].quantity);
        }
        quantity = quantity.filter(function(val) { return val !== undefined })
        var total = 0;
        for(var i = 0; i < quantity.length; i++) {
          console.log(quantity[i])
          total += quantity[i];
        }
        return total
      }

      scope.costBasis = function() {
        var quantity = []
        for(var keys in scope.symbolObject) {
          quantity.push(scope.symbolObject[keys].quantity * scope.symbolObject[keys].opening);
        }
        quantity = quantity.filter(function(val) { return val !== undefined })
        var total = 0;
        for(var i = 0; i < quantity.length; i++) {
          if(quantity[i]) {
            console.log(quantity[i])
            total += quantity[i];
          }
        }
        return total
      }

      scope.currentValue = function() {
        
      }
    }
  }
}]);
