'use strict';

angular.module('stocksApp', [
    'pascalprecht.translate',
    'ngStorage'
]);

angular.module('stocksApp')
.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
