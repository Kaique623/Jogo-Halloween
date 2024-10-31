var score = 0;
var timer = 0;
candyCounter = 0;
var gameEnd = false;

var timerLabel = document.getElementById("gametimer");
var gameFrame = document.getElementById("GameMainContainer");
var title = document.getElementById("gameTitle");
var startButton = document.getElementById("StartButton");
var scoreLabel = document.getElementById("scoreCounter");
var endTimeLabel = document.getElementById("TimesOver");
function startGame() {
    gameEnd = false;
    timer = 0;
    score = 0;
    scoreLabel.innerHTML = "Score: " + score
    timerLabel.innerHTML = `Tempo::: ${timer}`;

    console.log("startingGame!")
    score = 0;
    gameFrame.removeChild(startButton);
    gameFrame.removeChild(title);
    timerLabel.style.visibility = "visible";
    scoreLabel.style.visibility = 'visible';
    startTimer();
}

class Candy {
    constructor (){
        this.element = document.createElement("button")
        this.element.style.background = "url(https://static.vecteezy.com/system/resources/previews/010/838/137/non_2x/cute-cartoon-colorful-halloween-candy-pumpkin-free-png.png)";
        this.element.style.backgroundSize = "contain";
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.gridRow = randomIntFromInterval(4, 9);
        this.element.style.gridColumn = randomIntFromInterval(2, 9);
        this.element.className = "item";
        this.element.id = "Candy" + candyCounter;;

        this.element.setAttribute("onclick", `candyClick("${this.element.id}")`);

        startRemoveCounter(this.element)
        gameFrame.appendChild(this.element);
        candyCounter++;
    }
}

function candyClick(id){
    score += 1;
    scoreLabel.innerHTML = "Score: " + score
    console.log(id)
    document.getElementById(id).remove();
}

function startRemoveCounter(element){
    setTimeout(() => {
        try {
            gameFrame.removeChild(element)
        }
        catch {
            
        }
    }, 1000);
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startTimer(){
    let candyAmount = randomIntFromInterval(1, 3);

    console.log(timer);
    setTimeout(() => {
        if (!gameEnd){
            timer++;
            timerLabel.innerHTML = `Tempo::: ${timer}`
            startTimer()
        }
    }, 1000);


    setTimeout(() => {
        for (let i = 0; i < candyAmount; i++)
            if (!gameEnd)
                    new Candy();
    }, randomIntFromInterval(1, 1000));


    if (timer == 60){
        console.log("Fim de Jogo!");
        endGame();
    }
}

function endGame(){
    gameEnd = true;
    
    items = document.getElementsByClassName("item");
    for (let i = 0; i < 5; i ++){
        try {
            items[i].remove();
        }
        catch {
            break;
        }
    }

    title.innerHTML = "Acabou o Tempo!";
    title.style.color = "white";
    startButton.innerHTML =  "Jogar Novamente!";
    gameFrame.appendChild(startButton);
    gameFrame.appendChild(title);
    endTimeLabel.visibility = "hidden";
}