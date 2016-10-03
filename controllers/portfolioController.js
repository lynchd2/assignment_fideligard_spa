app.controller("portfolioCtrl", ["$scope", "portfolioService", function($scope, portfolioService) {


  $scope.symbolObjetsInArray = portfolioService.getStockObjects();

  $scope.cash = portfolioService.getPortfolio()["cashOnHand"];
}]);