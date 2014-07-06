'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];


    var loadStockData = function(stock) {
        StocksApiService.getHistoricalData(stock.code, '1996-12-14').then(function(data) {
            console.log(data);
            $scope.stockData = data.split(/\n/);
        });
    };

    $scope.selectStock = function(stock) {
        stock.selected = !stock.selected;

        if (stock.selected) {
            loadStockData(stock);
        }
    };

    // init
    StocksApiService.getStocksList().then(function(data) {
        $scope.stockList = data;
    });

});
