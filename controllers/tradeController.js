app.controller("tradeCtrl", ["$scope", 'dateService', "stockService", "portfolioService", "tradeService", "$stateParams", function($scope, dateService, stockService, portfolioService, tradeService, $stateParams) {

  //Acquire params
  $scope.opening = $stateParams["opening"];
  $scope.symbol = $stateParams["symbol"];

  //Set date, current cash and formData attributes
  $scope.date = stockService.getDate(251 - stockService.getDay());
  $scope.cash = portfolioService.getPortfolio()['cashOnHand'];
  $scope.formData = {"transactionType": "buy"};

  //Making a transaction
  $scope.makeTransaction = function(formData) {
    //Prep the formData for making transaction
    $scope.formData.opening = $scope.opening;
    $scope.formData.symbol = $scope.symbol;
    $scope.formData.dateIndex = stockService.getDay();
    $scope.formData.date = $scope.date;
    //Determine buy or sell
    if(formData.transactionType === "buy") {
      $scope.makeBuyTransaction($scope.formData)
      $scope.formData = {"transactionType": "buy"}
    }
    else if (formData.transactionType === 'sell') {
      //Make sell transaction
      $scope.makeSellTransaction($scope.formData)
      $scope.formData = {"transactionType": "sell"}
    }
    
  }

  $scope.makeSellTransaction = function(formData) {
    if(formData.quantity  === undefined) {
      $scope.status = "Invalid"
    }
    else {
      if (confirm("Do you want to make that transaction?")) {
      //Make a service method that checks the total owned for a particular stock
        tradeService.sellStock(formData);
        $scope.cash = portfolioService.getPortfolio()['cashOnHand'];
        $scope.status = "Valid"
      }
    }
  }

  $scope.makeBuyTransaction = function(formData) {
    if (formData.quantity  === undefined) {
      $scope.status = "Invalid";
    }
    else if (formData.quantity * $scope.opening > $scope.cash) {
      $scope.status = "Invalid";
    }
    else {
      $scope.status = "Valid";
      //Confirms if person wants to make a transaction
      if(confirm("Do you want to make that transaction?")) {
        //Send formData to the trade service to make the trade, whether it is buy or sell
        tradeService.makeTransaction(formData);
        $scope.cash = portfolioService.getPortfolio()['cashOnHand'];
        console.log("Transaction Processed!");
      }  
    }
  }
}]);