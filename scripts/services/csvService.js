'use strict';

angular.module('stocksApp')
.service('csvService', function() {
    var parseRow = function(row, opts) {
        var rowArr = _.filter(row.split(/,/), function(cell) {
            return cell !== '';
        });
        if (opts.everyCell && opts.everyCell.call) {
            return _.map(rowArr, function(cell) {
                return opts.everyCell.call(cell);
            });
        }
        return rowArr;
    };

    return {
        parse: function(csvStr, opts) {
            opts = opts || {};
            var arr = _.filter(csvStr.split(/\n/), function(row) {
                return row !== '';
            });
            var header = arr.shift();
            var propertyNames = parseRow(header, opts);
            var l = propertyNames.length;
            
            return _.map(arr, function(row) {
                var rowArr = parseRow(row, opts);
                var jsonObj = {};
                for (var i = 0; i < l; ++i) {
                    jsonObj[propertyNames[i]] = rowArr[i];
                }
                return jsonObj;
            });
        }
    };
});
