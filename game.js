let score = 0;
let moleInterval;
let currentMole;
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");
const holes = document.querySelectorAll(".hole");

function getRandomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function showMole() {
    if (currentMole) {
        currentMole.classList.remove("mole");
    }
    const randomHole = getRandomHole();
    randomHole.classList.add("mole");
    currentMole = randomHole;
}

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    moleInterval = setInterval(showMole, 1000);
}

function hitMole(event) {
    if (event.target.classList.contains("mole")) {
        score++;
        scoreElement.textContent = score;
        event.target.classList.remove("mole");
    }
}

startButton.addEventListener("click", startGame);
holes.forEach(hole => hole.addEventListener("click", hitMole));
