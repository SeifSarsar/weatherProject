(function() {
    'use strict';
    angular.module('weatherApp').factory('worldCitiesService',worldCitiesService);

    worldCitiesService.$inject = ['$resource'];


    function worldCitiesService($resource){

        var factory={};

        factory.getInstance=function(){
            var baseUrl='https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';
            return $resource(baseUrl,{},{

                fetchAllCities : {method:'GET', headers:{'Accept' :'application/json'}, params:{}, url: baseUrl, isArray: true},
            });

        }
        return factory;

    }
})();