app.controller("transactionsCtrl", ["$scope","transactionService", "$stateParams", function($scope, transactionService, $stateParams) {

  $scope.transactions = transactionService.getTransactions();
}]);