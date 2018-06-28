angular.module('weatherApp').controller('forecastController',['$scope','cityService','weatherQueryService','googleQueryService',function($scope,cityService,weatherQueryService,googleQueryService){  
    $scope.city=cityService.city;
    $scope.displayInfo=false;
    $scope.display=false;
    $scope.displayMap=false;
    $scope.displayLoading=true;
    var weatherFactory=weatherQueryService.getInstance();
    var googleFactory=googleQueryService.getInstance();
    
   
    $scope.weatherObject=weatherFactory.fetchWeather({city:$scope.city},handleWeatherSuccess,handleWeatherError); //Query Data from JSON
   
    console.log($scope.weatherObject);
   
    function handleWeatherSuccess(data){
        $scope.displayLoading=false;
        $scope.display=true;
        //checkDayTime();
        var weatherObject=data;
        
        $scope.tempInCelcius=kelvinToCelcius($scope.weatherObject.main.temp);
        definirCouleur($scope.tempInCelcius);
        
        $scope.weatherDescription=weatherObject.weather[0].description;
        
        $scope.country=weatherObject.sys.country;      
     
    }
    function handleWeatherError(){
        $scope.displayLoading=false;
        $scope.display=false;
        console.log("Error");
    }
    
     
    $scope.timeFunction=function (){
       $scope.displayInfo=true; 
        $scope.timeOffsetObject=googleFactory.fetchTimeOffset({lat:$scope.weatherObject.coord.lat,lon:$scope.weatherObject.coord.lon,timeStamp:$scope.weatherObject.dt},handleTimeOffsetSuccess,handleTimeOffsetError);
    }
    
    
   function handleTimeOffsetSuccess(data){
      $scope.tempInFaren=kelvinToFaren($scope.weatherObject.main.temp);
      var localTime=new Date();
      var offsetUtcMin=localTime.getTimezoneOffset();
      $scope.cityTime=localTime.setSeconds(localTime.getSeconds()+(60*offsetUtcMin)+$scope.timeOffsetObject.rawOffset+$scope.timeOffsetObject.dstOffset); 
       
     
   }
    
   function handleTimeOffsetError(){
       
       console.log("Error Time Offset Query")
   }
   
    function kelvinToCelcius(temperatureInKelvin){
        
        return Math.round(temperatureInKelvin-273.15);
    }
    function kelvinToFaren(temperatureInKelvin){
        
        return Math.round(temperatureInKelvin*(9/5)-459.67);
    }
    
    function definirCouleur(temperatureCelcius){
        var card= document.getElementById('cardMeteo');
         var info=document.getElementById('information');
        if (temperatureCelcius<=20){
            
            card.style.backgroundColor='#007bff';
            info.style.backgroundColor='#007bff';
            
        }
        else if (temperatureCelcius>20 && temperatureCelcius<=30){
            card.style.backgroundColor='#ffc107';
            info.style.backgroundColor='#ffc107';
        }
        else {
            card.style.backgroundColor='#dc3545';
            info.style.backgroundColor='#dc3545';
        }
    }
       
    $scope.createMap=function(){ 
      $scope.displayMap=!$scope.displayMap;        
      var location = {lat:$scope.weatherObject.coord.lat , lng:$scope.weatherObject.coord.lon};
      $scope.map = new google.maps.Map(
          document.getElementById('map'), {zoom: 4, center: location});
      $scope.marker = new google.maps.Marker({position: location, map: $scope.map});
        $scope.displayGallery();
    }
    
    $scope.displayGallery=function(){
        
        console.log($scope.weatherObject.coord.lat);
        googleFactory.fetchPlace({lat:$scope.weatherObject.coord.lat,lon:$scope.weatherObject.coord.lon},handlePlaceSuccess,handlePlaceError);
           
    }
    
    
    function handlePlaceSuccess (data){
        console.log(data);
        $scope.places=data.results;
        
        var photosReference=getPhotosReference($scope.places);
        console.log(photosReference);
    }
    
    function getPhotosReference(places){
        var photosReference=[];
        
        for (var i=0;i<places.length;i++){
            
            if (places[i].photos!=undefined){
                
                photosReference.push($scope.places[i].photos[0].photo_reference);
            }
        }
        return photosReference;
    }
    
    function handlePlaceError(){
        
        console.log("Problem fetching places");
    }
  
    
    
    
}]);