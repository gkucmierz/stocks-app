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
                // console.log(data);
            });
            // $('#container').highcharts('StockChart', {
                        

            //     rangeSelector : {
            //         selected : 1,
            //         inputEnabled: $('#container').width() > 480
            //     },

            //     title : {
            //         text : 'AAPL Stock Price'
            //     },
                
            //     series : [{
            //         name : 'AAPL',
            //         data : data,
            //         tooltip: {
            //             valueDecimals: 2
            //         }
            //     }]
            // });
        }
    };
});

