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
      //Overwrite old portfolio with new one.
      portfolioService.setPortfolio(portfolio);
    }
    else {
      portfolio["purchased"][symbol] = portfolio["purchased"][symbol] || {};
      portfolio["purchased"][symbol][dateIndex] = portfolio["purchased"][symbol][dateIndex] ||  {};
      portfolio["purchased"][symbol][dateIndex].quantity = quantity;
      portfolio["purchased"][symbol][dateIndex].date = date;
      portfolio["purchased"][symbol][dateIndex].opening = opening;
      portfolio.cashOnHand = portfolioService.deductCash((Math.round((quantity * opening) * 100) / 100))
      //Overwrite old portfolio with new one.
      portfolioService.setPortfolio(portfolio);
    }
  }

  var sellStock = function(formData) {
    var totalAsked = formData.quantity;
    var totalOwned = 0
    var portfolio = portfolioService.getPortfolio();
    //Check to see if you have enough stock
    for(var key in portfolio["purchased"][formData.symbol]) {
      totalOwned += portfolio["purchased"][formData.symbol][key].quantity
    }
    //If you do not own enough stock quantity
    if(totalAsked > totalOwned) {
      alert("You do not have " + totalAsked + " shares in " + formData.symbol+ ". You only have " + totalOwned);
    }
    //When you do have enough stock
    else {
      portfolio.cashOnHand = portfolioService.addCash((Math.round((formData.quantity * formData.opening) * 100) / 100))
      portfolioService.setPortfolio(portfolio);
      //Send sell transaction to transaction service to show on transaction page.
      transactionService.makeTransaction(formData)
      //Until you sell all you have asked for
      while(totalAsked > 0) { 
        for(var key in portfolio["purchased"][formData.symbol]) {
          //If the day for this purchased stock is greater or equal to what you asked for, sell it off.
          if(portfolio["purchased"][formData.symbol][key].quantity >= totalAsked) {
            //Store quantity in temp since it changes
            var temp = portfolio["purchased"][formData.symbol][key].quantity;
            console.log(temp);
            portfolio["purchased"][formData.symbol][key].quantity -= totalAsked;
            totalAsked -= temp;
          }
        }
      }
    }
    portfolioService.setPortfolio(portfolio);
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