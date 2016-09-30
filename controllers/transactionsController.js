app.controller("transactionsCtrl", ["$scope", "portfolioService", "tradeService", "transactionService", "$stateParams", function($scope, portfolioService, tradeService, transactionService, $stateParams) {

  $scope.test = "Hello, world!";

  $scope.transactions = transactionService.getTransactions();
}]);