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
    if (a.length != b.length) {
        return false;
    }
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
            if (areArraysEqual(pattern, clickPattern)) {
                addToPattern();
                clickPattern = [];
            }
        }
    });
});