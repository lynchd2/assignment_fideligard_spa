app.controller("stocksCtrl",
  ['$scope', 'dateService','stockService', 'stocks',
  function($scope, dateService, stockService, stocks) {

  $scope.allStocks = stocks;

  $scope.testDay = function() {
    $scope.day = stockService.getDay();
    $scope.getDayAnalytics();
  }

  $scope.getDayAnalytics = function(){
    var numDays = [1, 7, 30]
    var symbols = stockService.getSymbols();
    var finalArray = []
    for(var j = 0; j < symbols.length; j ++) {
      var array = []
      var hash = {}
      for(var i = 0; i < numDays.length; i++) {
        var initialDay = stockService.getCurrentStocks()[symbols[j]][2014].dayListings[$scope.day].Close
        var finalDay = stockService.getCurrentStocks()[symbols[j]][2014].dayListings[$scope.day - numDays[i]].Close
        array.push(finalDay - initialDay)
      }
      array.push(symbols[j])
      array.push(stockService.getCurrentStocks()[symbols[j]][2014].dayListings[$scope.day].Close)
      hash[symbols[j]] = array
      finalArray.push(hash[symbols[j]])
    }
    $scope.stockPrices = finalArray;
  }

}]);
