'use strict';

angular.module('stocksApp')
.service('yqlService', function($http, $q) {
    var yqlUrl = 'http://query.yahooapis.com/v1/public/yql';

    return {
        query: function(query) {
            var deferred = $q.defer();
            var data = encodeURIComponent(query);
            var format = '&format=json&diagnostics=true&env=http://datatables.org/alltables.env'
            var url = [yqlUrl, '?q=', data, format].join('');

            $http({method: 'GET', url: url})
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };
});
