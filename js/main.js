window.onload = function(){
    init();
}

let comparedSquares = [];
let movesCount = 0;
let tmie = 0;
let startFlag = false;
let numberOfPairsLeft;
let movesElement;
let gameOver = false;
let block = false;


function init(){
    numberOfPairsLeft = $(".square").length / 2;

    movesElement = document.querySelector(".score-moves");

    movesElement.innerHTML = "Moves: " + movesCount;

    clearArray(comparedSquares);

    shuffleSquares();
    resetSquareState();

    $(".square").on("click", function(el){
        if(gameOver || block){
            return;
        }
        if(!startFlag){
            startFlag = true;
            startTimer();
        }

        let selectedElement = (this).children[0];

        if(selectedElement.classList.contains("found")){
            return;
        }

        comparedSquares.forEach(function(e){
            if(e === selectedElement){
                return;
            }
        });

        if (comparedSquares.length < 2){
            selectedElement.classList.toggle("hidden");
            comparedSquares.push(selectedElement);
        }
        
        if(comparedSquares.length == 2){
            block = true;
            if(comparedSquares[0].isEqualNode(comparedSquares[1])){
                movesCount++;
                movesElement.innerHTML = "Moves: " + movesCount;
                comparedSquares.forEach(function(e){
                    e.classList.add("found");
                    e.classList.remove("hidden");
                });
                clearArray(comparedSquares);
                numberOfPairsLeft--;
                console.log(numberOfPairsLeft);
                if(numberOfPairsLeft === 0){
                    stopTimer();
                    gameOver = true;
                }
                block = false;
            }else{
                movesCount++;
                movesElement.innerHTML = "Moves: " + movesCount;
                setTimeout(function(){
                    comparedSquares.forEach(function(e){
                        e.classList.add("hidden");
                    });
                    clearArray(comparedSquares);
                    block = false;
                },500);
                
            }
        }
    });
}

function restart(){
    gameOver = false;
    movesCount = 0;
    startFlag = false;
    numberOfPairsLeft = $(".square").length / 2;
    movesElement.innerHTML = "Moves: " + movesCount;
    resetTimer();
    shuffleSquares();
    resetSquareState();
    clearArray(comparedSquares);
}

function clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

class Target {
    constructor(target, target2) {
        this.target = target;
        this.target2 = target2;
    }
}

function shuffleSquares(){
    var squares = $(".square");
    for(var i = 0; i < squares.length; i++){
        var target = Math.floor(Math.random() * squares.length -1) + 1;
        var target2 = Math.floor(Math.random() * squares.length -1) +1;
        squares.eq(target).before(squares.eq(target2));
    }
}

function resetSquareState(){
    var squares = $(".square");
    for(var i = 0; i < squares.length; i++){
        squares[i].children[0].classList.remove("selected", "found", "hidden");
        squares[i].children[0].classList.add("hidden");
    }
}

var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function startTimer() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }

    started = setInterval(clockRunning, 10);	
}

function stopTimer() {
    timeStopped = new Date();
    clearInterval(started);
}
 
function resetTimer() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.getElementById("display-area").innerHTML = "Timer: 00:00:00.000";
}

function clockRunning(){
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

    document.getElementById("display-area").innerHTML = "Timer: " +
        (hour > 9 ? hour : "0" + hour) + ":" + 
        (min > 9 ? min : "0" + min) + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
};