// Variables of the game

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game by pressing any key

$(document).keypress(function() { //finds a keypress event anywhere in the document
  if (started === false) { //if started is false then run function
    $("h1").text("Level " + level);
    nextSequence();
    started = true; //updates H1 for the level its on
  }
});

// Flashes a random colour you need to follow

function nextSequence() {

  userClickedPattern = [] //resets the pattern for the next level

  level++ //increments level by 1 each time nextSequence() is called

  var randomNumber = Math.floor(Math.random() * 4); //generates a number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; //random number finds a spot in the array to pull a value from
  gamePattern.push(randomChosenColour); //push the random chosen colour value to the end of the gamePattern array
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //find the ID of the random ChosenColour and make it flash
  playSound(randomChosenColour);
  $("h1").text("Level " + level); //updates H1 for the level its on
}

// User attempts to copy pattern

$(".btn").click(function() { //when the .btn class is clicked, run the following function
  var userChosenColour = $(this).attr('id'); //create variable of the attribute ID that was clicked
  userClickedPattern.push(userChosenColour); //adds the colours the user clicked to the end of an array
  playSound(userChosenColour);
  animatePress(userChosenColour)
  console.log(userClickedPattern); //allows you to see in the log the array as it stands
  checkAnswer(userClickedPattern.length - 1);; //grabs the last answer in the array and uses this parameter to check the result with the random one

})

// Play sound on click and random colour

function playSound(name) { //generic function to play audio for both parameters - user clicked colour and random generated colour
  var audio = new Audio("sounds/" + name + ".mp3"); //play sound for chosen colour
  audio.play();

}

// Flashes on click and random colour

function animatePress(currentColour) { //generic function to add class to pressed item for css styling purposes

  $("#" + currentColour).addClass("pressed"); //selects ID of current colour and adds class of pressed

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"); //after 100ms it removes pressed class from that ID
  }, 100);
};

// Checks if you got the same last pattern as the random generated pattern

function checkAnswer(lastColour) {
  if (userClickedPattern[lastColour] === gamePattern[lastColour]) { //checks the last colour used in user clicked pattern with that of the game pattern

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
}

// If you get it wrong the following statements make a noise, flash red, update the title to game over and reset your settings

else {
    playSound("wrong");
    $("body").addClass("game-over"); //applies game over class to body

    setTimeout(function() {
      $("body").removeClass("game-over"); //after 100ms it removes pressed class from that ID
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

// reset of all settings

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
