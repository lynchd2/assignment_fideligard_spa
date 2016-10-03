app.factory('stockService', ['$http', '$q',function($http, $q) {

  var _stocks = {

  };

  var _day = 0;

  var _popularStocks = ["AAPL", "GOOGL", "MSFT", "TSLA", "AXP", "MMM", "BA", "DIS", "KO", "GS", "IBM", "HD", "INTC", "JNJ"];

  var stub = {};



  stub.getStock = function(symb, year) {
    var symb = symb || "AAPL";
    var url = "http://query.yahooapis.com/v1/public/yql?q=";
    var year = year || 2014;
    var append = "%20select%20*%20from%20yahoo.finance.historicaldata%20" +
    "where%20symbol%20=%20"+
    "%22"+ symb + "%22%20" +
    "and%20startDate%20=%20%22"+ (year - 1) + "-11-20%22%20" +
    "and%20endDate%20=%20%22" + year + "-12-31%22%20" +
    "&format=json%20" +
    "&diagnostics=true%20" +
    "&env=store://datatables.org/alltableswithkeys%20" +
    "&callback=";

    var finalUrl = url + append;

    return $http.get(finalUrl);
  };

  stub.getStocks = function(year){
    var requests = [];
    var year = year || 2014;
    for(var i = 0; i < _popularStocks.length; i++){
      requests.push(stub.getStock(_popularStocks[i], year));
    }
    return $q.all(requests).then(function(response){
      for (var i = 0; i < response.length; i++) {
         var stock_data = response[i].data.query;
         var symbol = stock_data.results.quote[0].Symbol;
         if (!_stocks[symbol]){
           _stocks[symbol] = {};
         }
         _stocks[symbol][year] = {
             dayListings: stock_data.results.quote,
             countWorkDays: stock_data.count
         };
       }
       return _stocks;
     });
  };

  stub.getSymbols = function() {
    return _popularStocks
  }

  stub.getCurrentStocks = function() {
    return _stocks;
  };

  stub.getDate = function(day) {
    return _stocks["AAPL"][2014]["dayListings"][251 - day]["Date"];
  };

  stub.getCurrentValue = function(symbol, day) {
    return _stocks[symbol][2014]["dayListings"][251 - day].Close;
  }

  stub.setDay = function(dayIndex){
    _day = 251 - dayIndex;
  };

  stub.getDay = function(){
    return _day
  }
  stub.getDayAnalytics = function() {
  //Need to figure out accurate calender day
  var numDays = [-1, -5, -23]
    var symbols = stub.getSymbols();
    var finalArray = []
    for(var j = 0; j < symbols.length; j ++) {
      var array = []
      var hash = {}
      for(var i = 0; i < numDays.length; i++) {
        var initialDay = stub.getCurrentStocks()[symbols[j]][2014].dayListings[stub.getDay()].Close
        var finalDay = stub.getCurrentStocks()[symbols[j]][2014].dayListings[stub.getDay() - numDays[i]].Close
        array.push((finalDay - initialDay).toFixed(2));
      }
      array.push(symbols[j])
      array.push(stub.getCurrentStocks()[symbols[j]][2014].dayListings[stub.getDay()].Close)
      hash[symbols[j]] = array
      finalArray.push(hash[symbols[j]])
    }
    return finalArray;
  }

  stub.getThisDayAnalytics = function(symbol) {
  //Need to figure out accurate calender day
  var numDays = [-1, -5, -23]
  var finalArray = []
  var array = []
  var hash = {}
    for(var i = 0; i < numDays.length; i++) {
      var initialDay = stub.getCurrentStocks()[symbol][2014].dayListings[stub.getDay()].Close
      var finalDay = stub.getCurrentStocks()[symbol][2014].dayListings[stub.getDay() - numDays[i]].Close
      array.push((finalDay - initialDay).toFixed(2));
    }
    array.push(symbol)
    array.push(stub.getCurrentStocks()[symbol][2014].dayListings[stub.getDay()].Close)
    hash[symbol] = array
    finalArray.push(hash[symbol])
    return finalArray;
  }

  return stub;
}]);
