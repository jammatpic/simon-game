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
    addToPattern();
}

$(document).ready(function() {
    var noClick = true;
    var nextMove = Math.floor(Math.random()*4)
    
    // Prevents the main button from capturing focus
    $('.btn-main').on('mousedown', function(event) {
      event.preventDefault();
    });
    
    $(".btn-play").on("click", function() {
        pattern = [];
        noClick = false;
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
/* NEED TO HAVE ERROR MESSAGES FOR MISTAKES, ALSO STYLING*/
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
            // the delays are in place to ensure good timing, and to stop users from interrupting pattern displays
            if (pattern.length == clickPattern.length) {
                noClick = true;
                // if user-enetered pattern is the same as generated pattern, call addToPattern, and reset the user-generated pattern
                if (areArraysEqual(pattern, clickPattern)) {
                    setTimeout(function() {
                        addToPattern();
                        clickPattern = [];
                        setTimeout(function() {
                            noClick = false;
                        }, (pattern.length*2+1)*430);
                    }, 1000)
                // if user-generated pattern does not match pattern
                } else {
                    noClick = true;
                    // reset if on strict mode
                    if (strictMode === true) {
                        setTimeout(function() {
                            fullReset();
                            noClick = false;
                        }, 1000)
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
                    // reset if on strict mode
                    if (strictMode === true) {
                        setTimeout(function() {
                            fullReset();
                            noClick = false;
                        }, 1000)
                    // display the pattern and reset user-gen pattern
                    } else {
                        setTimeout(function() {
                            displayPattern();
                            clickPattern = [];
                            noClick = false;
                        }, 1000)
                    }
                }
            }
        }
    });
});