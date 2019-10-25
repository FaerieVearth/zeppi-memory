window.onload = function(){
    init();
}

let comparedSquares = [];

function init(){
    console.log("Zeppo initialized");

    let movesCount = 0;
    let movesElement = document.querySelector("score-moves");

    clearArray(comparedSquares);

    shuffleSquares();
    resetSquareState();

    $(".square").on("mouseup", function(){
        let selectedElement = (this).children[0];
        comparedSquares.forEach(function(e){
            if(e === selectedElement){
                return;
            }
        });

        if (comparedSquares.length < 2){
            selectedElement.classList.toggle("hidden");
            comparedSquares.push(selectedElement);
        }

        console.log(comparedSquares);
        
        if(comparedSquares.length == 2){
            if(comparedSquares[0].isEqualNode(comparedSquares[1])){
                console.log("foud");
                comparedSquares.forEach(function(e){
                    e.classList.add("found");
                    e.classList.remove("hidden");
                });
                clearArray(comparedSquares);
            }else{
                console.log("nah");
                setTimeout(function(){
                    comparedSquares.forEach(function(e){
                        e.classList.add("hidden");
                    });
                    clearArray(comparedSquares);
                },1000);
            }
        }
    });
}

function restart(){
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
    console.log("shuffle them Zeppis");
    var squares = $(".square");
    for(var i = 0; i < squares.length; i++){
        var target = Math.floor(Math.random() * squares.length -1) + 1;
        var target2 = Math.floor(Math.random() * squares.length -1) +1;
        squares.eq(target).before(squares.eq(target2));
    }
}

function resetSquareState(){
    console.log("reset zeppi state");
    var squares = $(".square");
    for(var i = 0; i < squares.length; i++){
        squares[i].children[0].classList.remove("selected", "found", "hidden");
        squares[i].children[0].classList.add("hidden");
    }
}