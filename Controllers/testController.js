
angular.module('weatherApp').controller('testController',['$scope','cityService',function($scope,cityService){  //On apelle la function quand on est dans la page qui correspond dans stateProvider. On doit mettre a jour city
            $scope.display=false;
         $scope.ajouterClasse=function(){
             
                
                document.querySelector(".slide").classList.toggle("active");
                
                
         }   
    
}]);