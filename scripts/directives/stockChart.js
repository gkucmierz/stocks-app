'use strict';

angular.module('stocksApp')
.directive('stockChart', function() {

    var parseData = function(data) {
        var last = 0;
        var curr = 0;
        return _.map(data, function(single) {
            curr = moment(single['Date']) + 0;
            console.log(curr-last);
            last = curr;
            return [
                moment(single['Date']) + 0,
                parseFloat(single['Adj Close'])
            ];
            return {
                x: moment(single['Date']) + 0,
                y: parseFloat(single['Adj Close'])
            };
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

            $scope.$watchCollection('selectedStocks', function(selectedStocks) {
                if (typeof selectedStocks === 'undefined') return;

                var data = [];
                for(var i =0; i < 1000; i++){
                    data.push([
                        i,
                        Math.sin(i/40)
                    ]);
                }

                var series = _.map(selectedStocks, function(selectedStock) {
                    return {
                        name: selectedStock.info.Symbol,
                        data: sort(parseData(selectedStock.data)),
                        // data: data,
                        tooltip: {
                            valueDecimals: 2
                        }
                    };
                });

                // var parsedData = parseData(data);
                // console.log(parsedData);

                element.highcharts('StockChart', {
                    rangeSelector : {
                        selected : 1,
                        inputEnabled: element.width() > 480
                    },
                    
                    series : series
                });
            });
            
        }
    };
});

