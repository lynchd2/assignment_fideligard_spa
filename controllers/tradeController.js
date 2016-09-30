app.controller("tradeCtrl", ["$scope", 'dateService', "stockService", "$stateParams", function($scope, dateService, stockService, $stateParams) {


  $scope.opening = $stateParams["opening"];
  $scope.symbol = $stateParams["symbol"]

  $scope.date = stockService.getDate(251 - stockService.getDay());

}]);