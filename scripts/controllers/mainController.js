'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];


    var loadStockData = function(stock) {
        StocksApiService.getHistoricalData(stock.Symbol, '1970-01-01').then(function(data) {
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
        // console.log(data);
    });

});
