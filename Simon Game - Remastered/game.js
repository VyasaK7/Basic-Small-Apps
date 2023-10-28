var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
//var count= 0;
var started = false;

var musicButtonToggle = false;
var audioNew = new Audio("sounds/Mario_Running_About.mp3");

$(document).keypress(function () {
  if (started === false) {
    //$("#level-title").text("Level " + level);
    challengePattern();
    started = true;
  } else {
    console.log("Game ongoing!");
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // $(this).addClass("pressed");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkProgress(userClickedPattern.length - 1);
  // If you want game to be like the mole game(simple) uncomment the below code
  //     if(count === level){
  //         setTimeout(function(){
  //         var randomChosenColor = buttonColors[nextSequence()];
  //         gamePattern.push(randomChosenColor);
  //         $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  //         playSound(randomChosenColor);
  //     },1000);
  // }
});

function checkProgress(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        challengePattern();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over!!! Press Any Button To Continue!");
    if (musicButtonToggle === false) {
      playSound("wrong");
    } else {
      var endingAudio = new Audio("sounds/Mario_Game_over.mp3");
      if (!audioNew.paused) {
        audioNew.pause();
        endingAudio.play();
        console.log(endingAudio.duration);
      }
    }
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function challengePattern() {
  userClickedPattern = [];
  var randomChosenColor = buttonColors[nextSequence()];
  gamePattern.push(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(Color) {
  var audio = new Audio("sounds/" + Color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  count = 0;
  level = 0;
  gamePattern = [];
  started = false;
}
// function animateNormal(currentColor){
//     $("#"+currentColor).removeClass("pressed");
// };

// $("#"+userChosenColor).click(function(event){
//     userClickedPattern.push(userChosenColor);
// });

//////////////////////////////////////////////////////////////////////////////

$(".btnNew").click(function () {
  if (musicButtonToggle === false) {
    musicButtonToggle = true;
    audioNew.play();
    $(this).addClass("btnNewShadow");
  } else {
    musicButtonToggle = false;
    audioNew.pause();
    audioNew.currentTime = 0;
    $(this).removeClass("btnNewShadow");
  }
});
