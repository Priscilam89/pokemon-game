const body = document.querySelector("body");
const game = document.querySelector(".game");

const count = document.querySelector("h1"); 
const reset = document.querySelector(".reset")

const ash = document.querySelector("#ash");

const charmander = document.querySelector("#charmander");
const pikachu = document.querySelector("#pikachu");
const zubat = document.querySelector("#zubat");

let findCharmander = false;
let findPikachu = false;
let findZubat = false;

let timeLeft = 60;
let timerInterval;

const audio = document.querySelector("audio");
audio.volume = 0.1;
const musicControl = document.querySelector(".music-control");

musicControl.addEventListener("click", (event) => {
    event.stopPropagation();

    event.target.src = `${event.target.src}`.includes("on.png") ? "assets/icons/off.png" : "assets/icons/on.png";

    `${event.target.src}`.includes("on.png") ? audio.play() : audio.pause();

});

function getRightPosition() {
    const position = parseInt(ash.style.right.split("px")[0]); 
    return isNaN(position) ? 2 : position;
}

function getTopPosition() {
    const position = parseInt(ash.style.top.split("px")[0]);
    return isNaN(position) ? 2 : position;
}

function checkWinCondition() {
    return findCharmander && findPikachu && findZubat;
}

function updateCount() {
    let captured = 0;
    if (findCharmander) captured++;
    if (findPikachu) captured++;
    if (findZubat) captured++;

    count.innerHTML = `Tempo: ${timeLeft}s | Capturados: ${captured} / 3`;
}

function endGame(status) {
    clearInterval(timerInterval);
    body.removeEventListener("keydown", handleKeyDown);
    if (status === "win") {
        count.innerHTML = `VOCÊ GANHOU! Capturou todos: 3 / 3`;
    } else {
        count.innerHTML = `FIM DE JOGO! Tempo esgotado. Capturados: ${findCharmander + findPikachu + findZubat} / 3`;
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateCount(); 
        if (checkWinCondition()) {
            endGame("win");
        } else if (timeLeft <= 0) {
            endGame("lose");
        }
    }, 1000);
}

function verifyLookPokemon(to) {
    const pokemonRightPosition = 
        to === "ArrowLeft" 
            ? `${getRightPosition() + 64}px` 
            : to === "ArrowRight"
                ? `${getRightPosition() - 64}px` 
                : `${getRightPosition()}px`;

    const pokemonTopPosition =
        to === "ArrowUp"
            ? `${getTopPosition() - 64}px`
            : to === "ArrowDown"
                ? `${getTopPosition() + 64}px`
                : `${getTopPosition()}px`;
    
    ash.style.position = "absolute";
    ash.style.zIndex = "99";
    
    if (!findCharmander) { 
        if (
            getTopPosition() >= 50 && 
            getTopPosition() <= 150 &&
            getRightPosition() >= 300 && 
            getRightPosition() <= 400
        ) {
            charmander.style.display = "block";
            charmander.style.position = "absolute";
            charmander.style.zIndex = "5";
            findCharmander = true;
            updateCount(); 
        }
    }
    
    if (findCharmander) { 
        charmander.style.right = pokemonRightPosition;
        charmander.style.top = pokemonTopPosition; 
    }

    if (!findPikachu) { 
        if (
            getTopPosition() >= 200 && 
            getTopPosition() <= 300 &&
            getRightPosition() >= 50 && 
            getRightPosition() <= 150
        ) {
            pikachu.style.display = "block";
            pikachu.style.position = "absolute";
            pikachu.style.zIndex = "5";
            findPikachu = true;
            updateCount(); 
        }
    }
    
    if (findPikachu) { 
        pikachu.style.right = pokemonRightPosition;
        pikachu.style.top = pokemonTopPosition; 
    }

    if (!findZubat) { 
        if (
            getTopPosition() >= 400 && 
            getTopPosition() <= 500 &&
            getRightPosition() >= 600 && 
            getRightPosition() <= 700
        ) {
            zubat.style.display = "block";
            zubat.style.position = "absolute";
            zubat.style.zIndex = "5";
            findZubat = true;
            updateCount(); 
        }
    }

    if (findZubat) { 
        zubat.style.right = pokemonRightPosition;
        zubat.style.top = pokemonTopPosition;
    }

    if (checkWinCondition()) {
        endGame("win");
    }
}

const handleKeyDown = (event) => {
    event.stopPropagation();
    if (timeLeft <= 0 || checkWinCondition()) return;

    switch (event.code) {
        case "ArrowLeft":
            if (getRightPosition() < 800) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = "assets/left.png";
            }
            break;

        case "ArrowRight":
            if (getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = "assets/right.png";
            }
            break;

        case "ArrowDown":
            if (getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = "assets/front.png";
            }

            break;

        case "ArrowUp":
            if (getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = "assets/back.png";
            }

            break;

        default:
            break;
    }

    verifyLookPokemon(event.code);
};

startTimer();
updateCount(); 
body.addEventListener("keydown", handleKeyDown);
reset.addEventListener("click", resetGame);