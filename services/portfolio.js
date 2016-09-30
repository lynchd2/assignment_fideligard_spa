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

  return {
    getCash: getCash,
    deductCash: deductCash,
    addCash: addCash,
    getPortfolio: getPortfolio,
    setPortfolio: setPortfolio
  }
}]);