angular.module('weatherApp').controller('WeatherCtrl',WeatherCtrl);
                                                        
WeatherCtrl.$inject= ['$scope','CityService','WeatherQueryService','GoogleQueryService'];                                            
                                                        
                                                        
function WeatherCtrl ($scope,CityService,WeatherQueryService,GoogleQueryService){  
    var vm = this;
    
    vm.city=CityService.city;
    vm.displayInfo=false;
    vm.display=false;
    vm.displayMap=false;
    vm.displayLoading=true;
    vm.displayGallery=false;
    var weatherFactory=WeatherQueryService.getInstance();
    var googleFactory=GoogleQueryService.getInstance();
    
   
   
    
    /***************************************Weather Query**************************************************************/
   var weatherObject=weatherFactory.fetchWeather({city:vm.city},handleWeatherSuccess,handleWeatherError); //Query Data from JSON
    console.log(weatherObject);
    function handleWeatherSuccess(data){
        vm.displayLoading=false;
        vm.display=true;
        vm.tempInCelcius=kelvinToCelcius(data.main.temp);
        vm.weatherDescription=data.weather[0].description;
        vm.country=data.sys.country; 
        createFlag(vm.country);
        definirCouleur(vm.tempInCelcius);        
    }
    function handleWeatherError(){
        vm.displayLoading=false;
        vm.display=false;
        console.log("Error Weather Query");
    }
    
     /*****************************************************************************************************/
    
    /***************************************Time offset Query**************************************************************/
    vm.callExtraInformation=function (){
        vm.displayInfo=true; googleFactory.fetchTimeOffset({lat:weatherObject.coord.lat,lon:weatherObject.coord.lon,timeStamp:weatherObject.dt},handleTimeOffsetSuccess,handleTimeOffsetError);
    }
    
    
   function handleTimeOffsetSuccess(data){
        var localTime=new Date();
        var offsetUtcMin=localTime.getTimezoneOffset();
        vm.cityTime=localTime.setSeconds(localTime.getSeconds()+(60*offsetUtcMin)+data.rawOffset+data.dstOffset); 
        vm.tempInFaren=kelvinToFaren(weatherObject.main.temp);
        vm.humidity=weatherObject.main.humidity;
        vm.clouds=weatherObject.clouds.all;
        vm.wind=weatherObject.wind.speed;
   }
    
   function handleTimeOffsetError(){
        console.log("Error Time Offset Query")
   }
   /*****************************************************************************************************/
    
    function kelvinToCelcius(temperatureInKelvin){
        return Math.round(temperatureInKelvin-273.15);
    }
    function kelvinToFaren(temperatureInKelvin){
        return Math.round(temperatureInKelvin*(9/5)-459.67);
    }
    
    
    function definirCouleur(temperatureCelcius){
        var card = document.getElementById('cardMeteo');
        var info = document.getElementById('information');
        
        if (temperatureCelcius<20){
            card.style.backgroundColor='#cce5ff';
            info.style.backgroundColor='#cce5ff';
            
        }
        else if (temperatureCelcius>=20 && temperatureCelcius<30){
            card.style.backgroundColor='#fff3cd';
            info.style.backgroundColor='#fff3cd';
        }
        else {
            card.style.backgroundColor='#f8d7da';
            info.style.backgroundColor='#f8d7da';
        }
    }
     /**********************Create google map Api ****************************/  
    vm.createMap=function(){ 
        vm.displayMap=!vm.displayMap;        
        var location = {lat:weatherObject.coord.lat , lng:weatherObject.coord.lon};
        vm.map = new google.maps.Map(
          document.getElementById('map'), {zoom: 4, center: location});
        vm.marker = new google.maps.Marker({position: location, map: vm.map});   
    }
    /*************************************************************************/
    
    var createFlag=function(country){
        document.getElementById("imageFlag").src="http://www.countryflags.io/"+country+"/shiny/32.png";    
    }
}