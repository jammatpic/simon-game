var pattern = []; 
var buttons = ["btn-green", "btn-red", "btn-yellow", "btn-blue"];
var clickPattern = [];
var strictMode = false;

// displays a simulated button press on the screen
function displayButtonPress(i) {
    var button = "#" + buttons[pattern[i]];
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
    }, (i*2+1)*1000); // used to time every toggle every 1000 milliseconds
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
    }, (i*2+2)*1000); 
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

function fullReset() {
    pattern = [];
    clickPattern = [];
    addToPattern();
}

$(document).ready(function() {
    var gameStart = false;
    var nextMove = Math.floor(Math.random()*4)
    $(".btn-play").on("click", function() {
        pattern = [];
        gameStart = true;
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
        if (gameStart === true) {
            clickPattern.push(buttons.indexOf($(this).attr("id")));
            // if user-entered pattern is same length as generated pattern
            if (pattern.length == clickPattern.length) {
                // if user-enetered pattern is the same as generated pattern, call addToPattern, and reset the user-generated pattern
                if (areArraysEqual(pattern, clickPattern)) {
                    addToPattern();
                    clickPattern = [];
                // if user-generated pattern does not match pattern
                } else {
                    // reset if on strict mode
                    if (strictMode === true) {
                        fullReset();
                    // show pattern and reset user-gen pattern
                    } else {
                        displayPattern();
                        clickPattern = [];
                    }
                }
            // if user-entered pattern is not complete
            } else {
                // if incomplete user-entered pattern does not match incomplete pattern
                if (!areArraysEqual(pattern.slice(0, clickPattern.length), clickPattern)) {
                    // reset if on strict mode
                    if (strictMode === true) {
                        fullReset();
                    // display the pattern and reset user gen pattern
                    } else {
                        displayPattern();
                        clickPattern = [];
                    }
                }
            }
        }
    });
});