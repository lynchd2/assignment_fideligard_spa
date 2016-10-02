app.controller("stocksCtrl",
  ['$scope', 'dateService','stockService', 'stocks',
  function($scope, dateService, stockService, stocks) {

  $scope.allStocks = stocks;

  $scope.submitDate = function() {
    if(dateService.getDateIndex() <= (251 - stockService.getDay())) {
      $scope.day = stockService.getDay()
      $scope.getDayAnalytics();
      dateService.storeDateIndex($scope.day);
    }
    else {
      alert("You cannot travel back in time! Go back to " + stockService.getDate(dateService.getDateIndex()) + " to start trading again.");
    }
    
  }

  $scope.getDayAnalytics = function(){
    $scope.stockPrices = stockService.getDayAnalytics();
  }

}]);
