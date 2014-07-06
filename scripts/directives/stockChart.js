'use strict';

angular.module('stocksApp')
.directive('stockChart', function() {
    return {
        restrict: 'A',
        scope: {
            action: '='
        },
        // templateUrl: PathGeneratorService.getThemePath('views/portfolio/fields/action-checkbox.html'),
        controller: function($rootScope, $scope) {
        },
        link: function($scope, element) {
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

