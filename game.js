var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clickcounter = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + buttonColours[randomNumber]).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
}

///////////////////////////////////////////////////////////////////////

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(gamePattern);
  // console.log(userClickedPattern);
  // console.log(level);
  var result = checkAnswer(userClickedPattern.length - 1);
  // if (result === "fail") {
  //   wrongResult();
  // } else {
  //   if (level === userClickedPattern.length) {
  //     setTimeout(function() {
  //       nextSequence();
  //     }, 1000);
  //   }
  //
  // }
  // clickcounter++;
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}



function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}


$(document).keypress(function(event) {
  $("h1").text("Level 0");
  level = 0;
  nextSequence();
});

function checkAnswer(level) {

  if (gamePattern[level] === userClickedPattern[level]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }else{
    wrongResult();
  }

}



function startover() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


function wrongResult() {

  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart") //
  }, 200);
  startover();
}
