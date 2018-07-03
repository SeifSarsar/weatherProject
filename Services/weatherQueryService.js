(function() {
    'use strict';
    angular.module('weatherApp').factory('WeatherQueryService',WeatherQueryService);

    WeatherQueryService.$inject = ['$resource'];


    function WeatherQueryService($resource){

        var factory={};

        factory.getInstance=function(){

            var baseUrl='http://api.openweathermap.org/data/2.5/weather?q=';

            return $resource(baseUrl,{key:'adb8501eb9a6f88ec2ea8ab9bd4754cb'},{

                fetchWeather : {method:'GET', headers:{'Accept' :'application/json'}, params:{'city':'@city'},url:baseUrl+':city&appid=:key',isArray:false}
            });

        }
        return factory;

    }
})();