'use strict';

angular.module('stocksApp')
.service('yqlService', function($http, $q) {
    var yqlUrl = 'https://query.yahooapis.com/v1/public/yql';

    return {
        query: function(query) {
            var deferred = $q.defer();
            var data = encodeURIComponent(query);

            var additionalParams = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
            var url = [yqlUrl, '?q=', data, additionalParams].join('');

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
