'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];

    $scope.selectStock = function(stock) {
        stock.selected = !stock.selected;
    };

    StocksApiService.getHistoricalData('GOOG', '2009-12-14').then(function(data) {
        console.log(data);
    });

    // init
    StocksApiService.getStocksList().then(function(data) {
        $scope.stockList = data;
    });

});
