
angular.module('weatherApp').controller('HomeCtrl',HomeCtrl);
                                                    
HomeCtrl.$inject=['$scope','CityService','$interval'];
                                        
function HomeCtrl($scope,CityService,$interval){  
    var vm = this;
    vm.city=CityService.city;
    $scope.$watch('home.city',function(){  //si city dans le scope change, executer la fonction
        CityService.city=vm.city;
        console.log(vm.city);
    });
    
    
    
    
}   