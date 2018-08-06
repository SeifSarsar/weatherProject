angular.module('weatherApp').controller('WeatherCtrl',WeatherCtrl);
                                                        
WeatherCtrl.$inject= ['$scope','CityService','WeatherQueryService','GoogleQueryService','$location'];                                            
                                                        
                                                        
function WeatherCtrl ($scope,CityService,WeatherQueryService,GoogleQueryService,$location){ 

   
    var vm = this;
    vm.displayInfo=false;
    vm.display=false;
    vm.displayMap=false;
    vm.displayLoading=true;
    vm.displayGallery=false;
    var weatherFactory=WeatherQueryService.getInstance();
    var googleFactory=GoogleQueryService.getInstance();
    var adjustedCityName;
    var rawTimeOffset=0;
    var dstTimeOffset=0;
    /*When reload page... */
    if (CityService.city===""){
       $location.path('/'); 
    }
    /*********************************Adjust City Name ********************************/
    adjustLetters();
    function adjustLetters(){
        var letter;
        adjustedCityName=CityService.city[0].toUpperCase();
        for (var i=1;i<CityService.city.length;i++){
            
            if (CityService.city[i-1]=="-" || CityService.city[i-1]==" "){
                letter=CityService.city[i].toUpperCase();
            }
            else {
               letter=CityService.city[i].toLowerCase(); 
            }
            adjustedCityName+=letter;
        }
        
        console.log(adjustedCityName);
        vm.city=adjustedCityName;
    }
    /*********************************************************************************/
    
    /***************************************Weather Query**************************************************************/
   var CurrentWeather=weatherFactory.fetchCurrentWeather({city:vm.city},handleCurrentWeatherSuccess,handleCurrentWeatherError); //Query Data from JSON
    console.log(CurrentWeather);
    function handleCurrentWeatherSuccess(data){
        vm.displayLoading=false;
        vm.display=true;
        vm.tempInCelcius=kelvinToCelcius(data.main.temp);
        vm.weatherDescription=data.weather[0].description;
        vm.country=data.sys.country; 
        createFlag(vm.country);
        //definirCouleur(vm.tempInCelcius);        
    }
    function handleCurrentWeatherError(){
        vm.displayLoading=false;
        vm.display=false;
        console.log("Error Weather Query");
    }
    
     /*****************************************************************************************************/
    
    /***************************************Time offset Query**************************************************************/
    vm.callExtraInformation=function (){
        vm.displayInfo=true; googleFactory.fetchTimeOffset({lat:CurrentWeather.coord.lat,lon:CurrentWeather.coord.lon,timeStamp:CurrentWeather.dt},handleTimeOffsetSuccess,handleTimeOffsetError);
    }
    
    
   function handleTimeOffsetSuccess(data){
        var localTime=new Date();
        var offsetUtcMin=localTime.getTimezoneOffset();
        rawTimeOffset=data.rawOffset;
        dstTimeOffset=data.dstOffset;
        vm.cityTime=localTime.setSeconds(localTime.getSeconds()+(60*offsetUtcMin)+rawTimeOffset+dstTimeOffset); 
        vm.tempInFaren=kelvinToFaren(CurrentWeather.main.temp);
        vm.humidity=CurrentWeather.main.humidity;
        vm.clouds=CurrentWeather.clouds.all;
        vm.wind=CurrentWeather.wind.speed;
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
    
    
     /**********************Create google map Api ****************************/  
    vm.createMap=function(){ 
        vm.displayMap=!vm.displayMap;        
        var location = {lat:CurrentWeather.coord.lat , lng:CurrentWeather.coord.lon};
        vm.map = new google.maps.Map(
          document.getElementById('map'), {zoom: 4, center: location});
        vm.marker = new google.maps.Marker({position: location, map: vm.map});   
    }
    /*************************************************************************/
    
    var createFlag=function(country){
        document.getElementById("imageFlag").src="http://www.countryflags.io/"+country+"/shiny/32.png";    
    }
    
    /**********************Forecast next 5 days weather****************************/  
    weatherFactory.fetch5DaysWeather({city:vm.city},handle5DaysWeatherSuccess,handle5DaysWeatherError); //Query Data from JSON
    
    
    function findMostRepeatedElementOfArray(array){
        var counter = 0;
        var maxCounter = 0;
        var mostRepeatedWeather = null;
        array.sort();
        for (var i = 0; i< array.length ; i++){
                var z=i;
                while (array[i]===array[z]){
                    counter++;
                    z++;
                }
                if (counter>maxCounter){
                    maxCounter=counter;
                    mostRepeatedWeather=array[i];
                }
                counter=0;
        }
        return mostRepeatedWeather
    }
    
    function calculateDailyMeanTemperature(array){
        var sum=0;
        for (var i=0; i<array.length;i++){
            sum+=array[i];
        }
        return kelvinToCelcius(sum/array.length);
        
    }
    
    
    function handle5DaysWeatherSuccess(data){
        
            //find most repeated weather
            vm.weatherForecastEveryDay=[];
            var dailyWeatherEvery3h=[];
            var dailyMinTemp=[];
            var dailyMaxTemp=[];
            var currentDate=null;
        
            var dailyTemperatureEvery3h=[];
            for (var i=0;i<data.cnt-1;i++){
                currentDate=data.list[i].dt_txt.slice(0,10);
                while (currentDate === data.list[i].dt_txt.slice(0,10) && i< data.cnt-1){
                    dailyWeatherEvery3h.push(data.list[i].weather[0].description);
                    dailyTemperatureEvery3h.push(data.list[i].main.temp);
                    dailyMinTemp.push(data.list[i].main.temp_min);
                    
                    dailyMaxTemp.push(data.list[i].main.temp_max);
                    i++;
                }
                dailyMinTemp.sort();
                dailyMaxTemp.sort();
                vm.weatherForecastEveryDay.push({maxTemperature:kelvinToCelcius(dailyMaxTemp[dailyMaxTemp.length-1]), minTemperature:kelvinToCelcius(dailyMinTemp[0]),meanTemperature: calculateDailyMeanTemperature(dailyTemperatureEvery3h) , description: findMostRepeatedElementOfArray(dailyWeatherEvery3h) ,time:data.list[i].dt});
                
                dailyMinTemp=[];
                dailyMaxTemp=[];
                dailyWeatherEvery3h=[];
                dailyTemperatureEvery3h=[];
            }
    }
    
     function handle5DaysWeatherError(){
        
        console.log("Error Fetching 5 Days Forecast");
    }
    /*************************************************************************/
}