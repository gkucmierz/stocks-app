'use strict';

angular.module('stocksApp')
.service('StocksApiService', function($http, $q, csvService) {

    var proxy = function(url) {
        var corsProxy = 'http://www.corsproxy.com/';
        return corsProxy + url;
    };

    var data2url = function(data, firstChar) {
        firstChar = firstChar || '?';
        var res = [];
        _.each(data, function(value, key) {
            res.push(key + '=' + value);
        });
        return firstChar + res.join('&amp;');
    };

    return {
        getStocksList: function() {
            var deferred = $q.defer();
            // var stocksListUrl = proxy('www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download');
            var stocksListUrl = 'cache/stock-list.csv';
            proxy('');

            $http({method: 'GET', url: stocksListUrl})
            .success(function(data) {
                var jsonData = csvService.parse(data, {
                    everyCell: function() {
                        return (this+'').replace(/\"/g, '');
                    }
                });
                deferred.resolve(jsonData);
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
            fromDate = moment(fromDate);
            toDate = moment(toDate);
            var getUrl = 'ichart.finance.yahoo.com/table.csv';
            var data = {
                s: stockCode,
                a: parseInt(fromDate.format('MM')) - 1,
                b: fromDate.format('DD'),
                c: fromDate.format('YYYY'),
                d: parseInt(toDate.format('MM')) - 1,
                e: toDate.format('DD'),
                f: toDate.format('YYYY'),
                g: 'd',
                ignore: '.csv'
            };
            
            var deferred = $q.defer();

            $http({method: 'GET', url: proxy(getUrl + data2url(data)) })
            .success(function(data) {
                var jsonData = csvService.parse(data);
                
                deferred.resolve(jsonData);
            })
            .error(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
});
