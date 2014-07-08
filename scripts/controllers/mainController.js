'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];
    $scope.selectedStocks = [];

    var invokeCollectionWatchers = function(obj) {
        obj.push('');
        obj.pop();
    };

    var loadStockData = function(selectedStock) {
        StocksApiService.getHistoricalData(selectedStock.info.Symbol, '1970-01-01').then(function(data) {
            selectedStock.data = data;
            invokeCollectionWatchers($scope.selectedStocks);
        });
    };

    $scope.selectStock = function(stock) {
        var selectedStock;
        stock.selected = !stock.selected;

        if (stock.selected) {
            selectedStock = {
                info: stock,
                data: {}
            };
            $scope.selectedStocks.push(selectedStock);
            loadStockData(selectedStock);
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
