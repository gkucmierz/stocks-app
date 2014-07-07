'use strict';

angular.module('stocksApp')
.directive('stockChart', function() {

    var parseData = function(data) {
        return _.map(data, function(single) {
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

                // return;

                $('#container').highcharts('StockChart', {
                    // rangeSelector : {
                    //     selected : 1,
                    //     inputEnabled: $('#container').width() > 480
                    // },

                    // title : {
                    //     text : 'AAPL Stock Price'
                    // },
                    
                    // series : [{
                        // name : 'AAPL',
                        // data: parsedData,
                        // tooltip: {
                            // valueDecimals: 2
                        // }
                    // }]
                });
            });
            
        }
    };
});

