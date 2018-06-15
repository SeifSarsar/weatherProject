var weatherApp = angular.module('weatherApp', ['ui.router', 'ngResource']); 


weatherApp.config(function($stateProvider){
    $stateProvider

    .state('home',{
        url:'/home',
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    .state('forecast',{
        url:'/forecast',
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
});
//serives
weatherApp.service('cityService',function(){
    
    this.city="";
})
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){  //On apelle la function quand on est dans la page qui correspond dans stateProvider. On doit mettre a jour city
   
    $scope.city=cityService.city;
    $scope.$watch('city',function(){  //si city dans le scope change, executer la fonction
        cityService.city=$scope.city;
    })
    
}]);


weatherApp.controller('forecastController',['$scope','cityService','weatherQueryService','timeQueryService',function($scope,cityService,weatherQueryService,timeQueryService){  
    $scope.city=cityService.city;
    $scope.key="adb8501eb9a6f88ec2ea8ab9bd4754cb";
    $scope.displayInfo=false;
    $scope.weatherObject={};
    var weatherFactory=weatherQueryService.getInstance();
    var timeOffsetFactory=timeQueryService.getInstance();
    
    $scope.weatherObject=weatherFactory.fetchWeather({city:$scope.city},handleWeatherSuccess,handleWeatherError); //Query Data from JSON
   
    console.log($scope.weatherObject);
    
    function handleWeatherSuccess(data){
        $scope.display=true;
        $scope.tempInCelcius=kelvinToCelcius($scope.weatherObject.main.temp);
        definirCouleur($scope.tempInCelcius);
        
        $scope.weatherDescription=$scope.weatherObject.weather[0].description;
        
        $scope.country=$scope.weatherObject.sys.country;
        
        
         
       
    }
    function handleWeatherError(){
         console.log("Error");
         $scope.display=false;
         
    }
    
     
    function giveTime(){
       $scope.displayInfo=true; $scope.timeOffsetObject=timeOffsetFactory.fetchTimeOffset({lat:$scope.weatherObject.coord.lat,lon:$scope.weatherObject.coord.lon,timeStamp:$scope.weatherObject.dt},handleTimeOffsetSuccess,handleTimeOffsetError);
    }
    
    $scope.timeFunction=giveTime;
    
   function handleTimeOffsetSuccess(){
        
            
   }
   function handleTimeOffsetError(){
       
       console.log("Error Time Offset Query")
   }
   
    function kelvinToCelcius(temperatureInKelvin){
        
        return Math.round(temperatureInKelvin-273.15);
    }
  
    
    function definirCouleur(temperatureCelcius){
        var card= document.getElementById('cardMeteo');
        var button=document.getElementById('buttonForecast');
         var info=document.getElementById('information');
        if (temperatureCelcius<=20){
            
            card.style.backgroundColor='#007bff';
            button.style.backgroundColor='#007bff';
            info.style.backgroundColor='#007bff';
            
        }
        else if (temperatureCelcius>20 && temperatureCelcius<=30){
            card.style.backgroundColor='#ffc107';
            button.style.backgroundColor='#ffc107';
            info.style.backgroundColor='#ffc107';
        }
        else {
            card.style.backgroundColor='#dc3545';
            button.style.backgroundColor='#dc3545';
            info.style.backgroundColor='#dc3545';
        }
    }
    
    
}]);

