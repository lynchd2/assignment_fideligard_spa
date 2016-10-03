app.factory('transactionService', ["portfolioService", function(portfolioService) { 


  var _transactions = [];

  var makeTransaction = function(formData) {
    formData.transactionNumber = _transactions.length;
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