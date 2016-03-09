function displayPattern() {
    for (i = 0; i < pattern.length; i++) {
        
    }
}

$(document).ready(function() {
    var pattern = [];
    gameStart = false;
    nextMove = Math.floor(Math.random()*4)
    $("btn-play").on("click", function() {
        pattern = [];
        gameStart = true;
        nextMove = Math.floor(Math.random()*4)
    });
    if (gameStart == true) {
        $("btn-main").on("click", function() {
            
        });
    }
    
});