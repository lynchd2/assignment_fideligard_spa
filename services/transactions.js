app.factory('transactionService', ["portfolioService", function(portfolioService) { 


  var _transactions = [];

  var makeTransaction = function(formData) {
    _transactions.push(formData);
  }

  var getTransactions = function() {
    return _transactions;
  }

  return {
    makeTransaction: makeTransaction,
    getTransactions: getTransactions
  }

}]);