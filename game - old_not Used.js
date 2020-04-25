var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + buttonColours[randomNumber]).fadeOut(100).fadeIn(100);
  // console.log("sounds/"+randomChosenColour+ ".mp3");
  // var sound = new Audio("sounds/"+randomChosenColour+ ".mp3");
  // sound.play();
  playSound(randomChosenColour);
  if (level != 0) {
    $("h1").text("Level " + level);
  }
  level += 1;
  userClickedPattern = [];
}

$(".btn").click(function(event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(gamePattern);
  console.log(userClickedPattern);
  console.log(level);
  if (gamePattern.length < userClickedPattern.length) {
    if (checkAnswer(level) !== "fail") {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      var sound = new Audio("sounds/wrong.mp3");
      sound.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart") //
      }, 200);
      startover();
    }

  }

});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play()

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
  for (var i = 0; i <= level; i++) {
  //  debugger;
    if (gamePattern[i] != userClickedPattern[i]) {
      console.log("Fail");

      return "fail";
    } else {
      return "pass";
    }
  }
}


function startover() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
