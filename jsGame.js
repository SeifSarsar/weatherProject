var canvas;
var canvasContext;
var character;
var makeItRainInterval;
var increaseRainSpeedInterval;
var gameOver=false;
var isBlessed=false;
var immunisationTimeout;
var intervalDrop;
var deplacement=10;
function Character(positionX){
    this.size=30;
    this.state="white";
    this.positionX=positionX;
};
var rainSpeed=1000; //1 drop per sec
var rain=[];

function Drop(dropType){
    
    if (dropType<=6){
        this.type="orange";
    }
     else if (dropType>6 && dropType<=8){
        this.type="grey"
    }
    else if (dropType>8 && dropType<=10){
        this.type="blue";
    }
   
    this.positionX=Math.random()*800;
    this.positionY=0;
}

window.onload=function(){ 
        
            canvas=document.getElementById("gameCanvas");
            canvasContext=canvas.getContext("2d");
            character=new Character(canvas.width/2);
            drawMap();
            drawCharacter(character);
            intervalDrop=setInterval(addDrop,rainSpeed);
            var keyPressListener=addEventListener("keypress",moveCharacter); 
            setTimeout(function(){
                makeItRainInterval=setInterval(makeItRain,5);
            }, 2000);
            increaseRainSpeedInterval=setInterval(function(){        
                if (rainSpeed>75){
                    clearInterval(intervalDrop);
                    rainSpeed-=25;
                    intervalDrop=setInterval(addDrop,rainSpeed);
                }  
            },2000);
        
    
    
    
    
} 


function drawMap(){
    canvasContext.fillStyle="black";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
}

function drawDrop(drop){
    canvasContext.beginPath();
    canvasContext.fillStyle=drop.type;
    canvasContext.arc(drop.positionX,drop.positionY,8,0,2*Math.PI,true);
    canvasContext.fill();

}


function drawCharacter(character){
    
    canvasContext.beginPath();
    canvasContext.fillStyle=character.state;
    canvasContext.arc(character.positionX,canvas.height,character.size,0,1*Math.PI,true);
    canvasContext.fill();
    
}

function addDrop(){
   var value=Math.round(Math.random()*10);
   var drop=new Drop(value);
    console.log(value);
   rain.push(drop);
}




function makeItRain(){
    drawMap();
    drawCharacter(character);
    for (var i=0;i<rain.length;i++){
        
        drawDrop(rain[i]);
        rain[i].positionY+=1; 
        verifydropTouch(rain[i]);
    }
    
    deleteDrop();
}

function deleteDrop(){
    if  (rain[0].positionY>canvas.height){
       rain.shift();
    }    
}

function moveCharacter(event){
    
    var key=event.keyCode;
    
    if (key==97 && character.positionX-character.size>0){
        
        character.positionX-=deplacement;
    }
    else if (key==100 && character.positionX+character.size<800){
        
        character.positionX+=deplacement;
    }
    else if (key==32){
        
        if (gameOver==true){
            location.reload();
        }
    }
    
}

function verifydropTouch(drop){
    
    if (drop.positionY == (canvas.height-character.size)){
             
        if (drop.positionX <= (character.positionX+character.size) && drop.positionX >= (character.positionX-character.size)){
            
            if (drop.type=="orange") {
                
                
                touchFire();
            }
            else if (drop.type=="blue"){
                
                touchWater();
            }
            
            else {
                
                touchStone();
            }
        }
    }
    
}

function touchFire(){
    isImmuned=false;
    clearTimeout(immunisationTimeout);
    if(character.state=="orange"){
        
        finishGame();
    }
    else if (character.state=="blue"){
        
        character.state="white";
    }
    else if (character.state=="white"){
        character.state="orange";
        
        var gameOverTimeout=setTimeout(function(){
            if (!isBlessed && character.state=="orange"){
                finishGame();
            }
            isBlessed=false;
        },3000);
        
    }
    
}

//en etant blanc au debut bleu orange bleu
function touchWater(){
    clearTimeout(immunisationTimeout);

    if(character.state=="orange"){
        
        isBlessed=true;
        character.state="white";
    }
    else if (character.state=="blue"){
        isImmuned=true;
        character.state="blue";
        immunisationTimeout=setTimeout(function(){
            if (isImmuned){
                character.state="white";
                isImmuned=false;
            }
        },2000);
        
    }
    else if (character.state=="white"){
        isImmuned=true;
        character.state="blue";
        immunisationTimeout=setTimeout(function(){
            if (isImmuned){
                character.state="white";
                isImmuned=false;
            }
        },2000);
        
    }
}


function touchStone(){
    deplacement=1;
    setTimeout(function(){
        
        deplacement=10;
    },2000);
    
}

function finishGame(){
    clearInterval(increaseRainSpeedInterval);
    clearInterval(makeItRainInterval);
    clearInterval(intervalDrop);
    gameOver=true;
    canvasContext.font = "30px Comic Sans MS";
    canvasContext.fillStyle = "red";
    var gameoverMessage="Press Space to Restart";
    canvasContext.fillText(gameoverMessage, (canvas.width/2)-canvasContext.measureText(gameoverMessage).width/2, canvas.height/2); 
}



