angular.module('weatherApp').controller('WelcomeCtrl',WelcomeCtrl);
                                                        
WelcomeCtrl.$inject= ['$scope','$interval'];                                            
                                                        
                                                        
function WelcomeCtrl ($scope,$interval){ 
    var icons=document.getElementsByClassName("welcomeIcon");
    for (var i=0;i<icons.length;i++){

        icons[i].style.display="none"
    }

    
    icons[0].style.display="block";
    var i=1;
    var slide=$interval(slideShow,3500);
    function slideShow(){
        if (i !== 0){
            icons[i-1].style.display="none";
        }
        else {
             icons[icons.length-1].style.display="none";
        } 
        icons[i].style.display="block";
        
        
        i++;
        if (i===icons.length){
            i=0;
        }
    }
    
    $scope.$on('$destroy', function() {
        if (angular.isDefined(slide))
            $interval.cancel(slide);
    });
   
    
}