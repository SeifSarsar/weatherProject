var weatherApp = angular.module('weatherApp', ['ui.router', 'ngResource','ngAnimate']); 


weatherApp.config(function($stateProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("");
    $stateProvider
    .state('welcome',{
        url:'/',
        templateUrl:'pages/welcome.html',
        controller:'WelcomeCtrl'
    })
     .state('home',{
        url:'/home',
        templateUrl:'pages/home.html',
        controller:'HomeCtrl',
        controllerAs: 'home'
    })
    .state('forecast',{
        url:'/weather',
        templateUrl:'pages/weather.html',
        controller:'WeatherCtrl',
        controllerAs: 'weather'
    })
    .state('test',{
        
        url:'/test',
        templateUrl:'pages/test.html',
        controller:'testCtrl'
    })
});
//serives
weatherApp.service('CityService',function(){
    
    this.city="";
})


weatherApp.directive('weatherInformation',function(){
    
    return {
        templateUrl:'Directives/weatherInformation.html'
    } 
});


weatherApp.directive('weatherIcons',function(){
    
    return {
        templateUrl:'Directives/weatherIcons.html',
        scope: {
            
            weatherDescription: "="
        }
    } 
});




