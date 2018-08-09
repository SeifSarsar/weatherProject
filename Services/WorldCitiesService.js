(function() {
    'use strict';
    angular.module('weatherApp').factory('worldCitiesService',worldCitiesService);

    worldCitiesService.$inject = ['$resource'];


    function worldCitiesService($resource){

        var factory={};

        factory.getInstance=function(){
            var baseUrl = "https://";
            return $resource(baseUrl,{},{
                fetchAllCities : {method:'GET', headers:{'Accept' :'application/json'}, params:{}, url: baseUrl+'raw.githubusercontent.com/mahemoff/geodata/master/cities_with_countries.txt', isArray: true},
            });

        }
        return factory;

    }
})();