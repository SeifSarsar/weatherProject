(function() {
    'use strict';
    angular.module('weatherApp').factory('timeQueryService',timeQueryService);

    timeQueryService.$inject = ['$resource'];


    function timeQueryService($resource){

        var factory={};

        factory.getInstance=function(){

            var baseUrl='https://maps.googleapis.com/maps/api/timezone/json?location=';

            return $resource(baseUrl,{key:'AIzaSyABBc8t4qfZ5QD-7O-LY2g6PYarq8PJbvw'},{

                fetchTimeOffset : {method:'GET', headers:{'Accept' :'application/json'}, params:{'lat':'@lat','lon':'@lon','timeStamp':'@timeStamp'},url:baseUrl+':lat,:lon&timestamp=:timeStamp&key=:key',isArray:false}
            });

        }
        return factory;

    }
})();