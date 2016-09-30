app.controller("stocksCtrl",
  ['$scope', 'dateService','stockService', 'stocks',
  function($scope, dateService, stockService, stocks) {

  $scope.allStocks = stocks;

  $scope.submitDate = function() {
    $scope.day = stockService.getDay();
    $scope.getDayAnalytics();
  }

  $scope.getDayAnalytics = function(){
    $scope.stockPrices = stockService.getDayAnalytics();
  }

}]);
