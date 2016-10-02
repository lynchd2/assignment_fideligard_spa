var app = angular.module('Fildegard', ["ui.router"]);

app.factory('_', ['$window', function($window) {
  return $window._;
}]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('normal' , {
      url: '/',
      views: {
        "date-widget@": {
          templateUrl: "templates/normal/dateWidget.html",
          controller: "dateCtrl"
        },
        "stocks-widget@": {
          templateUrl: "templates/normal/stocksWidget.html",
          controller: "stocksCtrl"
        },

        "trade-widget": {
          template: "",
          controller: "tradeCtrl"
        }
      },
      resolve: {
        stocks: ['stockService', function(stockService) {
            return stockService.getStocks();
          }
        ]
      }
    })

    .state('normal.trade', {
      url: "/:symbol?opening",
      views: {
        "trade-widget@": {
          templateUrl: "templates/normal/tradeWidget.html",
          controller: "tradeCtrl"
        }
      }
    })

    .state("normal.transactions", {
      url:"transactions",
      views: {
        "trade-widget@" :{
          templateUrl: "templates/normal/transactionsWidget.html",
          controller: "transactionsCtrl"
        }
      }
    })
  });

app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
