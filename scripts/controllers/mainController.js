'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];

    StocksApiService.getStocksList().then(function(data) {
        $scope.stockList = data;
    });

});
