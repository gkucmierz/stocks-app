'use strict';

angular.module('stocksApp')
.directive('stockChart', function($rootScope) {

    var parseData = function(data) {
        return _.map(data, function(single) {
            return [
                moment(single['Date']) + 0,
                parseFloat(single.Open),
                parseFloat(single.High),
                parseFloat(single.Low) ,
                parseFloat(single.Close)
            ];
        });
    };

    var sort = function(parsedData) {
        // this CSV data was not even sorted by date (WTF!)
        return parsedData.sort(function(itemA, itemB) {
            return itemA[0] - itemB[0];
        });
    };

    return {
        restrict: 'A',
        scope: {
            selectedStocks: '='
        },
        controller: function() {
        },
        link: function($scope, element) {

            var updateCharts = function(selectedStocks) {
                var series = _.map(selectedStocks, function(selectedStock) {
                    return {
                        name: selectedStock.info.Symbol,
                        data: sort(parseData(selectedStock.data)),
                        tooltip: {
                            valueDecimals: 2
                        },
                        type: 'candlestick'
                    };
                });

                console.log(series);

                element.highcharts('StockChart', {
                    rangeSelector : {
                        selected : 1,
                        inputEnabled: element.width() > 480
                    },
                   
                    plotOptions: {
                        series: {
                            turboThreshold: 0
                        }
                    },

                    series : series
                });
            };

            $rootScope.$on('selectedStocksUpdate', function(a, selectedStocks) {
                updateCharts(selectedStocks);
            });            
        }
    };
});

