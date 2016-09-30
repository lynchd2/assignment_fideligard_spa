app.factory('portfolioService', [function() {

  var _cashOnHand = 1000;
  var _portfolio = 
  {"cashOnHand" :_cashOnHand,


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

  return {
    getCash: getCash,
    deductCash: deductCash,
    addCash: addCash,
    getPortfolio: getPortfolio
  }
}]);