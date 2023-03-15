var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started_to_toggle = false;


$(document).keypress(function(){
    if (!started_to_toggle) {
      $("#level-title").text("Level "+level);
      nextSequence();
      started_to_toggle = true;
    }
});


$(".btn").on("click", function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.random();
  randomNumber *= 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio(name+'.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
            nextSequence();
          }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
    $("#level-title").text("Game over! Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started_to_toggle = false;
}
