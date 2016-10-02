app.factory('dateService', [function() {

  var _lastDate = -1

  var storeDateIndex = function(date) {
    _lastDate = 251 - date;
  }

  var getDateIndex = function() {
    return _lastDate;
  }

  return {
    storeDateIndex: storeDateIndex,
    getDateIndex: getDateIndex
  }


}]);