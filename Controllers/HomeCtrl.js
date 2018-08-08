
angular.module('weatherApp').controller('HomeCtrl',HomeCtrl);
                                                    
HomeCtrl.$inject=['$scope','CityService','$interval','worldCitiesService'];
                                        
function HomeCtrl($scope,CityService,$interval,worldCitiesService){  
    var vm = this;
    vm.matchingCities = [];
    var cities = worldCitiesService.getInstance().fetchAllCities();
    vm.city = CityService.city;
    $scope.$watch('home.city',function(){  //si city dans le scope change, executer la fonction
        vm.matchingCities = [];
        CityService.city = vm.city;
        
            for (var i=0 ; i < cities.length ; i++){
                if ((vm.city.toUpperCase() === (cities[i].name.substr(0,vm.city.length)).toUpperCase()) &&  vm.matchingCities.length < 12 ){

                    if (vm.city != ""){
                        vm.matchingCities.push(cities[i].name);
                        vm.matchingCities.sort();
                    }
                }
            }        
    });
    
    vm.choseCity = function (city){
        vm.city = city;
        document.getElementById("homeInput").focus();
    }
}   