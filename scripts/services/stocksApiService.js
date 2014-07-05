'use strict';

angular.module('stocksApp')
.service('StocksApiService', function($http, $q) {

    var proxy = function(url) {
        var corsProxy = 'http://www.corsproxy.com/';
        return corsProxy + url;
    };

    return {
        getStocksList: function() {
            var deferred = $q.defer();
            var stocksListUrl = proxy('www.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download');
            
            $http({method: 'GET', url: stocksListUrl})
            .success(function(data) {
                var lines = data.split(/\n/).splice(1);
                var parsed = _.map(lines, function(row) {
                    return row.split(/,/)[0];
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
