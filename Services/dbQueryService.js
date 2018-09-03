(function() {
    'use strict';
    angular.module('weatherApp').factory('dbQueryService',dbQueryService);

    dbQueryService.$inject = ['$http'];


    function dbQueryService($http){

        var getComments = function(type) {
            return $http({
              method: 'GET',
              url: '/home'
            })
          };

      return {
        getComments : getComments
      }
    }
})();