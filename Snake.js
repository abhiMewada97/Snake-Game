let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'green';
let snakeCells = [[0,0]];
let cell = 50;
let score = 0;
let direction = 'right';
let gameOver = false;
let foodCell = generateRandomCell();

// Function to generate a random position for the food
function generateRandomCell() {
    return [
        Math.round((Math.random()*(450))/cell)*cell,
        Math.round((Math.random()*(1150))/cell)*cell
      ]
}

// Listen for arrow key presses to change the direction of the snake
document.addEventListener('keydown', (e)=>{
    
    if(direction!='down' && e.key==='ArrowUp') {
        direction = 'up';
    }
    else if(direction!='up' && e.key==='ArrowDown') {
        direction = 'down';
    }
    else if(direction!='left' && e.key==='ArrowRight') {
        direction = 'right';
    }
    else if(direction!='right' && e.key==='ArrowLeft') {
        direction = 'left';
    }
})

// Function to draw the game state
function draw() {

    // If game over, display "Game Over" message 
    if(gameOver) {
        clearInterval(id);
        ctx.font = '48px sans-serif';
        ctx.fillStyle = 'red';
        ctx.fillText(' Game Over ', 100, 100);
        return;
    }
    ctx.clearRect(0,0,1200,500);

    // Draw the snake
    for(let i of snakeCells) {
        ctx.fillStyle = 'red';
        ctx.fillRect(i[0],i[1],cell, cell);
    }
    
    ctx.fillStyle = 'black';
    ctx.fillRect(foodCell[0], foodCell[1], cell, cell);
}

// Update the game state
function update() {
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];
    
    // Check if the snake's head collides with its body
    for (let i = 0; i < snakeCells.length - 1; i++) {
        if (headX === snakeCells[i][0] && headY === snakeCells[i][1]) {
            gameOver = true;
            return;
        }
    }

    if(direction==='up') {
        headY = headY-cell;
        if(headY<0) {
            gameOver=true;
        }
    }
    else if(direction==='down') {
        headY = headY+cell;
        if(headY==500) {
            gameOver=true;
        }
    }
    else if(direction==='right') {
        headX = headX+cell;
        if(headX==1200) {
            gameOver=true;
        }
    }
    else {
        headX = headX-cell;
        if(headX<0) {
            gameOver=true;
        }
    }

    snakeCells.push([headX,headY]);

    if(headX===foodCell[0] && headY===foodCell[1]) {
        foodCell = generateRandomCell();
        score++;
    }
    else {
        snakeCells.shift();
    }
}


let id = setInterval(()=>{
    draw();
    update();
},200);