'use strict';

angular.module('stocksApp')
.service('StocksApiService', function($http, $q, yqlService) {

    var proxy = function(url) {
        var corsProxy = 'http://www.corsproxy.com/';
        return corsProxy + url;
    };

    var yql = 'select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "2012-09-13" and endDate = "2012-09-13"';
    // yqlService.query(yql);

    return {
        getStocksList: function() {
            var deferred = $q.defer();
            // var stocksListUrl = proxy('www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download');
            var stocksListUrl = 'cache/stock-list.csv';

            $http({method: 'GET', url: stocksListUrl})
            .success(function(data) {
                var lines = data.split(/\n/).splice(1);
                var parsed = _.map(lines, function(row) {
                    return {
                        code: row.split(/,/)[0].replace(/\"/g, '')
                    };
                });
                deferred.resolve(parsed);
            })
            .error(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
});
