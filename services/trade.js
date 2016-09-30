app.factory('tradeService', ["portfolioService", function(portfolioService) { 

  var makeTransaction = function(formData) {
    if (formData.transactionType === "buy") {
      buyStock(formData)
    }
    else {
      sellStock(formData)
    }
  }

  var buyStock = function(formData) {
    if(checkForBought)
  }

  var sellStock = function(formData) {

  }

  var checkForBought = function(formData) {
    
  }

  return {
    makeTransaction: makeTransaction
  }
}]);


portfolio = {
  cashOnHand : 1000,
  purchased: {
    "AAPL":
      1: {
        "2016-01-10"
        quantity: 1
        price: 85.55
      }

  }

  sell: {
    "GOOGL" : 

  }
}