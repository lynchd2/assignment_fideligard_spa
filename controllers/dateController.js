app.controller("dateCtrl", ["$scope", 'dateService', "stockService", function($scope, dateService, stockService) {

  $scope.datePicked = 126;
  $scope.newDate
  $scope.$watch("datePicked", function() {
    $scope.sendDate = $scope.datePicked;
    stockService.setDay($scope.sendDate);
    $scope.newDate = stockService.getDate($scope.datePicked);
  });

}])
