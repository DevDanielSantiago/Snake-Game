let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let direction = "right";
let box = 32;
let snake = [];
let snakeX;
let snakeY;

snake[0] = { 
    x: 8 * box, 
    y: 8 * box 
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
} 

document.addEventListener("keydown", update);

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    if(event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if(event.key === "ArrowUp" && direction !== "down") direction = "up";
    if(event.key === "ArrowRight" && direction !== "left") direction = "right";
    if(event.key === "ArrowDown" && direction !== "up") direction = "down";
}

function atravessarParede() {
    if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;
}

function fimDeJogo() {
    for(i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(jogo);
            alert("Game Over!");
        }
    }
}

function guardarPosicaoXY() {
    snakeX = snake[0].x;
    snakeY = snake[0].y;
}

function iniciarJogo() {
    criarBG();
    criarCobrinha();
    criarComida();
    
    atravessarParede();
    fimDeJogo();
    
    guardarPosicaoXY();

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);