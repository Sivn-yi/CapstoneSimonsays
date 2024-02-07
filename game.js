var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var buttons = document.querySelectorAll(".btn");
var level = 0;
buttons.forEach(button =>
    button.addEventListener("click", function(event) {
        var userChosenColour = event.target.classList[1];
        handleClick(userChosenColour);
    }));

$(document).one("keypress",(function(event) {
    nextSequence();
}))

function nextSequence () {
    level = level+1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*3)+1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
}

function handleClick(input) {
    playSound(input);
    userClickedPattern.push(input);
    animatePress(input);
    checkAnswer(userClickedPattern.length,userClickedPattern);
}

function checkAnswer(currentLevel,pattern) {
    if(currentLevel === gamePattern.length) {
        var isCorrect = true;
        for (i=0; i<currentLevel; i++) {
            if (pattern[i] != gamePattern[i]) {
                isCorrect = false;
                break;
            }
        }
        if(isCorrect) {
            console.log("success");
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        } else {
            console.log("wrong");
            var audioWrong = new Audio("./sounds/wrong.mp3");
            audioWrong.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            $(document).one("keypress",(function(event) {
                startOver();
            }))
        }       
    } 
}

function startOver() {
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    nextSequence();
}


function playSound(name) {
    var audio1 = new Audio("./sounds/"+name+".mp3");
    audio1.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

//nextSequence();

