'use strict';

angular.module('stocksApp')
.directive('stockChart', function() {
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

                element.highcharts('StockChart', {
                    rangeSelector : {
                        selected : 1,
                        inputEnabled: true//element.width() > 480
                    },

                    title : {
                        text : 'AAPL Stock Price'
                    },
                    
                    series : [{
                        name : 'AAPL',
                        data : data,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });
            });
            
        }
    };
});

