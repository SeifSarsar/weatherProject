(function() {
    'use strict';
    angular.module('weatherApp').factory('GoogleQueryService',GoogleQueryService);

    GoogleQueryService.$inject = ['$resource'];


    function GoogleQueryService($resource){

        var factory={};

        factory.getInstance=function(){
            var baseUrl='https://maps.googleapis.com/maps/api/';
            
            
            return $resource(baseUrl,{},{

                fetchTimeOffset : {method:'GET', headers:{'Accept' :'application/json'}, params:{'lat':'@lat','lon':'@lon','timeStamp':'@timeStamp',key:'AIzaSyABBc8t4qfZ5QD-7O-LY2g6PYarq8PJbvw'},url: baseUrl + 'timezone/json?location='+':lat,:lon&timestamp=:timeStamp&key=:key',isArray:false},
                
               
                
               
            });

        }
        return factory;

    }
})();