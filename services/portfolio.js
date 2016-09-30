app.factory('portfolioService', [function() {

  var _cashOnHand = 1000;
  var _portfolio = 
  {"cashOnHand" :_cashOnHand,
  "purchased": {}
  }
  var getCash = function() {
    return _cashOnHand
  }

  var deductCash = function(cash) {
    return _cashOnHand - cash
  }

  var addCash = function(cash) {
    return _cashOnHand + cash
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