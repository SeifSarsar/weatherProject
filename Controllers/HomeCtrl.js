
angular.module('weatherApp').controller('HomeCtrl',HomeCtrl);
                                                    
HomeCtrl.$inject=['$scope','CityService'];
                                        
function HomeCtrl($scope,CityService){  
   
    $scope.city=CityService.city;
    $scope.$watch('city',function(){  //si city dans le scope change, executer la fonction
        CityService.city=$scope.city;
    });
    
    
}