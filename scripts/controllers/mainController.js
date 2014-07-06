'use strict';

angular.module('stocksApp')
.controller('MainController', function($scope, StocksApiService) {

    $scope.stockList = [];

    $scope.selectStock = function(stock) {
        stock.selected = !stock.selected;
    };


    // init
    StocksApiService.getStocksList().then(function(data) {
        $scope.stockList = data;
    });

});
