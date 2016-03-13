var pattern = []; 
var buttons = ["btn-green", "btn-red", "btn-yellow", "btn-blue"];
var clickPattern = [];
var strictMode = false;
var simonSound1 = new Audio("resources/sound/simonSound1.mp3");
var simonSound2 = new Audio("resources/sound/simonSound2.mp3");
var simonSound3 = new Audio("resources/sound/simonSound3.mp3");
var simonSound4 = new Audio("resources/sound/simonSound4.mp3");

// displays a simulated button press on the screen
function displayButtonPress(i) {
    var button = "#" + buttons[pattern[i]];
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
        if (pattern[i] === 0) {
            simonSound4.play();
        } else if (pattern[i] === 1) {
            simonSound3.play();
        } else if (pattern[i] === 2) {
            simonSound2.play();
        } else if (pattern[i] === 3) {
            simonSound1.play();
        }
    }, (i*2+1)*430); // used to time every toggle every 430 milliseconds
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
    }, (i*2+2)*430); 
}

// calls displayButtonPress for each element in the pattern
function displayPattern() {
    for (i = 0; i < pattern.length; i++) {
        displayButtonPress(i);
    }
}

// adds a new element to the pattern, displays the length of the pattern, and calls displayPattern
function addToPattern() {
    nextMove = Math.floor(Math.random()*4);
    pattern.push(nextMove);
    $("#count").text(pattern.length);
    displayPattern();
}

// checks whether two arrays are equal
function areArraysEqual(a, b) {
    for (i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

// resets everything fully
function fullReset() {
    pattern = [];
    clickPattern = [];
}

$(document).ready(function() {
    var noClick = true;
    var nextMove = Math.floor(Math.random()*4)
    
    // Prevents the main button from capturing focus
    $('.btn-main').on('mousedown', function(event) {
      event.preventDefault();
    });
    
    $(".btn-play").on("click", function() {
        $("#btn-embed").text("Reset");
        pattern = [];
        noClick = false;
        $("#count").text(pattern.length);
        addToPattern();
    });
    
    $(".btn-strict").on("click", function() {
        if (strictMode === false) {
            strictMode = true;
            $(this).text("Strict mode on");
        } else {
            strictMode = false;
            $(this).text("Strict mode off");    
        }
    });

    $(".btn-main").on("click", function() {
        if (noClick === false) {
            if ($(this).is("#btn-green")) {
                simonSound4.play();
            } else if ($(this).is("#btn-red")) {
                simonSound3.play();
            } else if ($(this).is("#btn-yellow")) {
                simonSound2.play();
            } else if ($(this).is("#btn-blue")) {
                simonSound1.play();
            }
            
            clickPattern.push(buttons.indexOf($(this).attr("id")));
            // if user-entered pattern is same length as generated pattern
            // the delays are in place to ensure good timing (so a pattern display or a reset doesn't immediately happen on button press), and to stop users from interrupting pattern displays
            if (pattern.length == clickPattern.length) {
                noClick = true;
                // if user-enetered pattern is the same as generated pattern, call addToPattern, and reset the user-generated pattern
                if (areArraysEqual(pattern, clickPattern)) {
                    $("#presses").text(clickPattern.length);
                    // if pattern is 20 units long, end game
                    if (clickPattern.length == 20) {
                        $("#presses").text("0");
                        fullReset();
                        noClick = false;
                        $("#endModalLabel").text("You Win!");
                        $("#endModal").modal("show");
                    } else {
                        setTimeout(function() {
                            addToPattern();
                            clickPattern = [];
                            setTimeout(function() {
                                noClick = false;
                                $("#presses").text(clickPattern.length);
                            }, (pattern.length*2+1)*430);
                        }, 1000)
                    }

                // if user-generated pattern is the same length and does not match pattern
                } else {
                    noClick = true;
                    $("#presses").text("0");
                    // reset if on strict mode
                    if (strictMode === true) {
                        fullReset();
                        $("#endModalLabel").text("You Lose!");
                        $("#endModal").modal("show");
                        noClick = false;
                    // show pattern and reset user-gen pattern
                    } else {
                        setTimeout(function() {
                            displayPattern();
                            clickPattern = [];
                            setTimeout(function() {
                                noClick = false;
                            }, (pattern.length*2+1)*430);
                        }, 1000)
                        
                    }
                }
            // if user-entered pattern is not complete
            } else {
                // if incomplete user-entered pattern does not match incomplete pattern
                if (!areArraysEqual(pattern.slice(0, clickPattern.length), clickPattern)) {
                    noClick = true;
                    $("#presses").text("0");
                    // reset if on strict mode
                    if (strictMode === true) {
                        fullReset();
                        $("#endModalLabel").text("You Lose!");
                        $("#endModal").modal("show");
                        noClick = false;
                    // display the pattern and reset user-gen pattern
                    } else {
                        setTimeout(function() {
                            displayPattern();
                            clickPattern = [];
                            setTimeout(function() {
                                noClick = false;
                            }, (pattern.length*2+1)*430);
                        }, 1000)
                    }
                } else {
                    $("#presses").text(clickPattern.length);
                }
            }
        }
    });
});