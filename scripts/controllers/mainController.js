'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];

    $scope.selectedStocks = [];

    var loadStockData = function(stock) {
        StocksApiService.getHistoricalData(stock.Symbol, '1970-01-01').then(function(data) {
            $scope.stockData = data;
        });
    };

    $scope.selectStock = function(stock) {
        stock.selected = !stock.selected;

        if (stock.selected) {
            loadStockData(stock);
            $scope.selectedStocks.push({
                info: stock,
                data: {}
            });
        } else {
            $scope.selectedStocks = _.filter($scope.selectedStocks, function(obj) {
                return obj.info !== stock;
            });
        }
    };

    // init
    StocksApiService.getStocksList().then(function(data) {
        $scope.stockList = data;
        // console.log(data);
    });

});
