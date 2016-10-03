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
      portfolio["purchased"][symbol][dateIndex].symbol = symbol;
      portfolio.cashOnHand = portfolioService.deductCash((Math.round((quantity * opening) * 100) / 100))
      //Overwrite old portfolio with new one.
      portfolioService.setPortfolio(portfolio);
    }
  }

  var sellStock = function(formData) {
    console.log("test")  
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
      //Send sell transaction to transaction service to show on transaction page.
      transactionService.makeTransaction(formData)
      //Until you sell all you have asked for
      for(var key in portfolio["purchased"][formData.symbol]) {
        while(totalAsked > 0) { 
          //If the day for this purchased stock is greater or equal to what you asked for, sell it off.
          if(portfolio["purchased"][formData.symbol][key].quantity >= totalAsked) {
            console.log("More quantity")
            //Store quantity in temp since it changes
            var temp = portfolio["purchased"][formData.symbol][key].quantity;
            portfolio["purchased"][formData.symbol][key].quantity -= totalAsked;
            totalAsked -= temp;
          }
          //No more stock left
          else if(portfolio["purchased"][formData.symbol][key].quantity === 0) {
            break;
          }
          //If the quantity is less than what you asked
          else {
            var temp = portfolio["purchased"][formData.symbol][key].quantity;
            portfolio["purchased"][formData.symbol][key].quantity -= temp;
            totalAsked -= temp; 
          }
        }
      }
    }
    console.log(portfolio)
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
