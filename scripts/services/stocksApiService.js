'use strict';

angular.module('stocksApp')
.service('StocksApiService', function($http, $q, yqlService) {

    var proxy = function(url) {
        var corsProxy = 'http://www.corsproxy.com/';
        return corsProxy + url;
    };

    // var yql = 'select * from yahoo.finance.historicaldata where symbol in ("GOOG") and startDate = "2012-09-13" and endDate = "2012-09-13"';
    // var yql = 'select * from yahoo.finance.industry';
    var yql = 'select * from yahoo.finance.quotes where symbol in ("BHP.AX") and startDate = "2014-01-01" and endDate = "2014-06-16"';
    yqlService.query(yql).then(function(data) {
        console.log(data.query);
        console.log('count: ' + data.query.count);
    });

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
                var filtered = _.filter(parsed, function(row) {
                    return row.code !== '';
                });
                deferred.resolve(filtered);
            })
            .error(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        },
        getHistoricalData: function(stockCode, fromDate, toDate) {
            // http://ichart.finance.yahoo.com/table.csv?s=YHOO&d=0&e=28&f=2010&g=d&a=3&b=12&c=1996&ignore=.csv
            // sn = TICKER
            // a = fromMonth-1
            // b = fromDay (two digits)
            // c = fromYear
            // d = toMonth-1
            // e = toDay (two digits)
            // f = toYear
            // g = d for day, m for month, y for yearly
        }
    };
});
