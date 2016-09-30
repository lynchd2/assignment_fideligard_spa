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
    var dateIndex = formData.dateIndex;
    var quantity = formData.quantity;
    var date = formData.date;
    var symbol = formData.symbol;
    var opening = formData.opening
    var portfolio = portfolioService.getPortfolio();
    if(portfolio["purchased"][symbol] && portfolio["purchased"][symbol][dateIndex]) {
      portfolio["purchased"][symbol][dateIndex]["quantity"] += quantity;
      portfolio.cashOnHand = portfolio.cashOnHand - (Math.round((quantity * opening) * 100) / 100)
      portfolioService.setPortfolio(portfolio);
    }
    else {
      portfolio["purchased"][symbol] = {};
      portfolio["purchased"][symbol][dateIndex] = {};
      portfolio["purchased"][symbol][dateIndex].quantity = quantity;
      portfolio["purchased"][symbol][dateIndex].date = date;
      portfolio["purchased"][symbol][dateIndex].opening = opening;
      portfolio.cashOnHand = portfolio.cashOnHand - (Math.round((quantity * opening) * 100) / 100)
      portfolioService.setPortfolio(portfolio);
    }
  }

  var sellStock = function(formData) {

  }

  var checkForBought = function(formData) {

  }

  return {
    makeTransaction: makeTransaction
  }
}]);


// portfolio = {
//   cashOnHand : 1000,
//   purchased: {
//     "AAPL":
//       1: {
//         "2016-01-10"
//         quantity: 1
//         price: 85.55
//       }

//   }

//   sell: {
//     "GOOGL" : 

//   }
// }