(function() {
    'use strict';
    angular.module('weatherApp').factory('googleQueryService',googleQueryService);

    googleQueryService.$inject = ['$resource'];


    function googleQueryService($resource){

        var factory={};

        factory.getInstance=function(){
            var baseUrl='https://maps.googleapis.com/maps/api/';
            
            
            return $resource(baseUrl,{key:'AIzaSyABBc8t4qfZ5QD-7O-LY2g6PYarq8PJbvw',radius:'1000'},{

                fetchTimeOffset : {method:'GET', headers:{'Accept' :'application/json'}, params:{'lat':'@lat','lon':'@lon','timeStamp':'@timeStamp'},url:baseUrl+'timezone/json?location='+':lat,:lon&timestamp=:timeStamp&key=:key',isArray:false},
                fetchPlace : {method:'GET', headers:{'Accept' :'application/json'}, params:{'lat':'@lat','lon':'@lon','key':'AIzaSyAjbCSzuISz5eYJL7VilkMAnr51q-PxfTY'},url:baseUrl+'place/nearbysearch/json?location='+':lat,:lon&radius=:radius&key=:key',isArray:false}
            });

        }
        return factory;

    }
})();