var weatherApp = angular.module('weatherApp', ['ui.router', 'ngResource','ngAnimate']); 


weatherApp.config(function($stateProvider){
    $stateProvider
    .state('home',{
        url:'/home',
        templateUrl:'pages/home.html',
        controller:'HomeCtrl'
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
        templateUrl:'Directives/weatherIcons.html'
    } 
});


