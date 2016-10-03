app.factory('portfolioService', [function() {

  
  var _portfolio = 
  {"cashOnHand" : 1000,
  "purchased": {}
  }

  var _cashOnHand = _portfolio.cashOnHand;

  var getCash = function() {
    return _cashOnHand;
  }

  var deductCash = function(cash) {
    return _portfolio.cashOnHand -= cash;
  }

  var addCash = function(cash) {
    return _portfolio.cashOnHand += cash;
  }

  var getPortfolio = function() {
    return _portfolio;
  }

  var setPortfolio = function(newPortfolio) {
    _portfolio = newPortfolio;
  }

  var getStockObjects = function() {
    var stockObjectArray = []
    for(var symbol in this.getPortfolio()["purchased"] ) { 
      var ob = {}
      stockObjectArray.push(this.getPortfolio()["purchased"][symbol])
    }
    return stockObjectArray;
  }

  return {
    getCash: getCash,
    deductCash: deductCash,
    addCash: addCash,
    getPortfolio: getPortfolio,
    setPortfolio: setPortfolio,
    getStockObjects: getStockObjects
  }
}]);