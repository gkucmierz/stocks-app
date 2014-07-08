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

    return {
        restrict: 'A',
        scope: {
            data: '='
        },
        controller: function() {
        },
        link: function($scope, element) {

            $scope.$watch('data', function(data) {
                if (typeof data === 'undefined') return;

                var parsedData = parseData(data);
                // console.log(parsedData);

                element.highcharts('StockChart', {
                    rangeSelector : {
                        selected : 1,
                        inputEnabled: element.width() > 480
                    },

                    // title : {
                    //     text : 'AAPL Stock Price'
                    // },
                    
                    series : [{
                        // name : 'AAPL',
                        data: parsedData,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }, {
                        // name : 'AAPL',
                        data: parsedData,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            });
            
        }
    };
});

