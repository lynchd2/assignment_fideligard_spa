app.factory('tradeService', ["portfolioService", "transactionService", function(portfolioService, transactionService) { 

  var makeTransaction = function(formData) {
    if (formData.transactionType === "buy") {
      buyStock(formData)
    }
    else {
      sellStock(formData)
    }
  }

  //Look up Angular copy to condense
  var buyStock = function(formData) {
    var dateIndex = formData.dateIndex;
    var quantity = formData.quantity;
    var date = formData.date;
    var symbol = formData.symbol;
    var opening = formData.opening
    var portfolio = portfolioService.getPortfolio();
    //Send formData to transasction service to show on TRANSACTION page, not PORTFOLIO PAGE
    transactionService.makeTransaction(formData)
    if(portfolio["purchased"][symbol] && portfolio["purchased"][symbol][dateIndex]) {
      portfolio["purchased"][symbol][dateIndex]["quantity"] += quantity;
      portfolio.cashOnHand = portfolioService.deductCash((Math.round((quantity * opening) * 100) / 100))
      portfolioService.setPortfolio(portfolio);
    }
    else {
      portfolio["purchased"][symbol] = portfolio["purchased"][symbol] || {};
      portfolio["purchased"][symbol][dateIndex] = portfolio["purchased"][symbol][dateIndex] ||  {};
      portfolio["purchased"][symbol][dateIndex].quantity = quantity;
      portfolio["purchased"][symbol][dateIndex].date = date;
      portfolio["purchased"][symbol][dateIndex].opening = opening;
      portfolio.cashOnHand = portfolioService.deductCash((Math.round((quantity * opening) * 100) / 100))
      portfolioService.setPortfolio(portfolio);
    }
  }

  var sellStock = function(formData) {
    var portfolio = portfolioService.getPortfolio();
    console.log(portfolio)
    // for(var key in portfolio["purchased"][formData.symbol]) {
    //   console.log(portfolio["purchased"][formData.symbol])
    // }
  }

  var checkForBought = function(formData) {

  }

  return {
    makeTransaction: makeTransaction,
    sellStock: sellStock
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