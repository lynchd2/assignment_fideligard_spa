app.controller("tradeCtrl", ["$scope", 'dateService', "stockService", "portfolioService", "tradeService", "$stateParams", function($scope, dateService, stockService, portfolioService, tradeService, $stateParams) {


  $scope.opening = $stateParams["opening"];
  $scope.symbol = $stateParams["symbol"]

  $scope.date = stockService.getDate(251 - stockService.getDay());
  $scope.cash = portfolioService.getCash();
  $scope.hideButton = false;
  $scope.formData = {"transactionType": "buy"};

  $scope.makeTransaction = function(formData) {
    if(formData.quantity * $scope.opening > $scope.cash) {
      $scope.status = "Invalid"
    }
    else {
      $scope.status = "Valid";
      if(confirm("Do you want to make that transaction?")) {
        $scope.formData.opening = $scope.opening;
        $scope.formData.symbol = $scope.symbol;
        $scope.formData.dateIndex = stockService.getDay();
        $scope.formData.date = $scope.date;
        tradeService.makeTransaction($scope.formData);
        console.log("Transaction Processed!");
      }  
    }
  }
}]);