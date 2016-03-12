var pattern = []; 
var buttons = ["btn-green", "btn-red", "btn-yellow", "btn-blue"];
var clickPattern = [];

// displays the pattern on the screen through simulated button presses
function displayPattern(i) {
    var button = "#" + buttons[pattern[i]];
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
    }, (i*2+1)*1000); // used to time every toggle every 1000 milliseconds
    setTimeout(function() {
        $(button).toggleClass(button.slice(1, button.length) + "-press");
    }, (i*2+2)*1000); 
}

// adds an element to a pattern and calls displayPattern
function addToPattern() {
    nextMove = Math.floor(Math.random()*4)
    pattern.push(nextMove);
    for (i = 0; i < pattern.length; i++) {
        displayPattern(i);
    }
}

function areArraysEqual(a, b) {
    for (i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

$(document).ready(function() {
    var gameStart = false;
    var nextMove = Math.floor(Math.random()*4)
    $(".btn-play").on("click", function() {
        pattern = [];
        gameStart = true;
        addToPattern();
    });

    $(".btn-main").on("click", function() {
        if (gameStart === true) {
            clickPattern.push(buttons.indexOf($(this).attr("id")));
            // if user-entered pattern is same length as generated pattern
            if (pattern.length == clickPattern.length) {
                // if user-enetered pattern is the same as generated pattern, extend the pattern by one, and reset the user generated pattern
                if (areArraysEqual(pattern, clickPattern)) {
                    addToPattern();
                    clickPattern = [];
                // if user-generated pattern does not match pattern, show the pattern again and reset the user generated pattern
                } else {
                    for (i = 0; i < pattern.length; i++) {
                        displayPattern(i);
                    }
                    clickPattern = [];
                }
            // if user-entered pattern is not complete
            } else {
                
            }
        }
    });
});