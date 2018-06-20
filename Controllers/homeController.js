
angular.module('weatherApp').controller('homeController',['$scope','cityService',function($scope,cityService){  //On apelle la function quand on est dans la page qui correspond dans stateProvider. On doit mettre a jour city
   
    $scope.city=cityService.city;
    $scope.$watch('city',function(){  //si city dans le scope change, executer la fonction
        cityService.city=$scope.city;
    })
    
}]);