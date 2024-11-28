var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

var buttonColours=["red","blue","green","yellow"];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level "+level);
    var num=Math.floor((Math.random()*4));
    var randomColour=buttonColours[num];
    gamePattern.push(randomColour);
    

    $("#"+randomColour).fadeOut(100).fadeIn(100);

    playSound(randomColour);
}

$(".btn").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(colour){
    $("."+colour).addClass("pressed");
    setTimeout(function(){
        $("."+colour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
        
    }
    else if(gamePattern!=userClickedPattern){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over,Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}