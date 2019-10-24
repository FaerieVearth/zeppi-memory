window.onload = function(){
    init();
}

function init(){
    console.log("Zeppo initialized");

    playingBoardElement = document.getElementsByClassName("playing-board");
    squareElement = document.getElementsByClassName("square");

    let square = document.getElementsByClassName("sqaure");
    let squares = [...square]


    let movesCount = 0;
    let movesElement = document.querySelector("score-moves");

    let compare = document.getElementsByClassName("found");

    let openSquares = [];

    squares = shuffleSquares();
}

class Target {
    constructor(target, target2) {
        this.target = target;
        this.target2 = target2;
    }
}

let reverseSet = [];

function shuffleSquares(){
    console.log("shuffle them Zeppis");
    var squares = $(".square");
    for(var i = 0; i < squares.length; i++){
        var target = Math.floor(Math.random() * squares.length -1) + 1;
        var target2 = Math.floor(Math.random() * squares.length -1) +1;
        squares.eq(target).before(squares.eq(target2));
    }
}
