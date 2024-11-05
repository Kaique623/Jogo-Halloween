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

class trash {
    constructor (){
        this.element = document.createElement("button")
        this.element.style.background = "url(https://images.vexels.com/media/users/3/264716/isolated/preview/f0e57cdefa35ee793892771da58b4458-lixo-de-garrafa-de-pla-stico.png)";
        this.element.style.backgroundSize = "contain";
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.gridRow = randomIntFromInterval(4, 9);
        this.element.style.gridColumn = randomIntFromInterval(2, 9);
        this.element.className = "item";
        this.element.id = "Trash" + candyCounter;;

        this.element.setAttribute("onclick", `trashClick("${this.element.id}")`);

        startRemoveCounter(this.element)
        gameFrame.appendChild(this.element);
        candyCounter++;
    }
}

function candyClick(id){
    score += 1;
    scoreLabel.innerHTML = "Score: " + score
    document.getElementById(id).remove();
}

function trashClick() {
    if (score != 0)
        score -= 1;
    scoreLabel.innerHTML = "Score: " + score
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
            if (!gameEnd){
                new Candy();
            }

        for (let i = 0; i < randomIntFromInterval(1, 3); i++)
            if (!gameEnd){
                new trash();
            }
                
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


function goFullScreen() {
    let element = document.getElementById("GameMainContainer");
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

// Ensure the container maintains a 16:9 aspect ratio
window.addEventListener('resize', adjustAspectRatio);

function adjustAspectRatio() {
    let container = document.getElementById('GameMainContainer');
    let windowAspectRatio = window.innerWidth / window.innerHeight;
    let containerAspectRatio = 16 / 9;
    
    if (windowAspectRatio > containerAspectRatio) {
        container.style.width = 'auto';
        container.style.height = '100%';
    } else {
        container.style.width = '100%';
        container.style.height = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', adjustAspectRatio);
