
angular.module('weatherApp').controller('HomeCtrl',HomeCtrl);
                                                    
HomeCtrl.$inject=['$scope','CityService','$interval','worldCitiesService'];
                                        
function HomeCtrl($scope,CityService,$interval,worldCitiesService){  
    var vm = this;
    vm.matchingCities = [];
    var position;
    var cities = worldCitiesService.getInstance().fetchAllCities();
    vm.city = CityService.city;
    var isRemovable = null;
    
    $scope.$watch('home.city',function(){  //si city dans le scope change, executer la fonction
        position = -1;
        isRemovable = false;
        vm.matchingCities = [];
        CityService.city = vm.city;
        for (var i = 0 ; i < cities.length ; i++){
            if ((vm.city.toUpperCase() === (cities[i].city.substr(0,vm.city.length)).toUpperCase()) &&  vm.matchingCities.length < 15 ){

                if (vm.city != ""){
                    vm.matchingCities.push(cities[i].city);
                }
            }
        }
        if (vm.matchingCities.length === 0) {
            for (var i = 0 ; i < cities.length ; i++){
                if (vm.city.toUpperCase() === (cities[i].country.toUpperCase()) &&  vm.matchingCities.length < 15 ){

                    if (vm.city != ""){
                        vm.matchingCities.push(cities[i].city);
                    }
                }
            }
        }      
    });
    
    vm.choseCity = function (city){
        vm.city = city;
        document.getElementById("homeInput").focus();
    }
    
   
    vm.keyPress = function (event){
        if (vm.city != ""){
            switch (event.keyCode){
                    
                case 38:
                    //keyup
                    if (position >= 1){
                        if (isRemovable)
                            document.getElementsByClassName(vm.matchingCities[position])[0].removeAttribute("id");
                        position = position -1;
                    }
                    document.getElementsByClassName(vm.matchingCities[position])[0].setAttribute("id","activeSuggestion");
                    isRemovable = true;
                    break;

                case 40:
                    //keydown
                    if (position < vm.matchingCities.length - 1){
                        if (isRemovable)
                            document.getElementsByClassName(vm.matchingCities[position])[0].removeAttribute("id");
                        position = position +1;
                    }
                    document.getElementsByClassName(vm.matchingCities[position])[0].setAttribute("id","activeSuggestion");
                    isRemovable = true;
                    break;

                case 39: 
                    if (position >= 0){
                        vm.city = vm.matchingCities[position];
                        vm.matchingCities = [];
                    }
                    break;

            }
        }
    }
}   