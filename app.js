var weatherApp = angular.module('weatherApp', ['ui.router', 'ngResource','ngAnimate']); 


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
    .state('test',{
        
        url:'/test',
        templateUrl:'pages/test.html',
        controller:'testController'
    })
});
//serives
weatherApp.service('cityService',function(){
    
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


