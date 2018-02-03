function cl(string) {
  console.log(string);
}

// Grab Canvas element and store it
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var gameInterval = 70;
var upInterval;
var downInterval;
var leftInterval;
var rightInterval;
var snakeSize = 10;
var score = 0;
var xSnakeTail = [];
var ySnakeTail = [];
var direction;


// set up canvas width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var snake = {
  x: 100,
  y: 100,
  color: '#07bcc2',
  w: snakeSize,
  h: snakeSize,
}

var food = {
  w: snakeSize,
  h: snakeSize,
  color: '#cd3302',
}




var moveSnake = function(event) {
  clearInterval(upInterval);
  clearInterval(downInterval);
  clearInterval(leftInterval);
  clearInterval(rightInterval);
  // UP
  if (event.keyCode === 38) {
    if (direction !== 'down') {
      upInterval = setInterval(function() {
        snake.y -= snakeSize;
      }, gameInterval);
      direction = 'up';
    } else { //this else statement is so it doesn't just stop
      downInterval = setInterval(function() {
        snake.y += snakeSize;
      }, gameInterval);
      direction = 'down';
    }
  };
  // Down
  if (event.keyCode === 40) {
    if (direction !== 'up') {
      downInterval = setInterval(function() {
        snake.y += snakeSize;
      }, gameInterval);
      direction = 'down';
    } else { //this else statement is so it doesn't just stop
      upInterval = setInterval(function() {
        snake.y -= snakeSize;
      }, gameInterval);
      direction = 'up';
    };
  };
  // Left
  if (event.keyCode === 37) {
    if (direction !== 'right') {
      leftInterval = setInterval(function() {
        snake.x -= snakeSize;
      }, gameInterval);
      direction = 'left';
    } else { //this else statement is so it doesn't just stop
      rightInterval = setInterval(function() {
        snake.x += snakeSize;
      }, gameInterval);
      direction = 'right';
    };
  };
  // Right
  if (event.keyCode === 39) {
    if (direction !== 'left') {
      rightInterval = setInterval(function() {
        snake.x += snakeSize;
      }, gameInterval);
      direction = 'right';
    } else { //this else statement is so it doesn't just stop
      leftInterval = setInterval(function() {
        snake.x -= snakeSize;
      }, gameInterval);
      direction = 'left';
    };
  };
};

var newFood = function() {
  food.x = Math.random() * (window.innerWidth - snakeSize);
  food.y = Math.random() * (window.innerHeight - snakeSize);
  console.log('x ' + food.x + '  y ' + food.y);
};
newFood();

var foodGotAte = function(x1, y1, x2, y2) {
  var xDistance = (x2 + snakeSize) - (x1 + snakeSize);
  var yDistance = (y2 + snakeSize) - (y1 + snakeSize);
  var gotAte = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  cl(gotAte);
  if (gotAte <= 10) {
    score += 1;
    newFood();
  }
};


var animationLoop = function() {
  // Clear the frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = snake.color;
  ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, food.w, food.h);

  document.getElementById('score').textContent = String(score);
  xSnakeTail.unshift(snake.x);
  ySnakeTail.unshift(snake.y);


  cl('x: ' + xSnakeTail.length + ' | y: ' + ySnakeTail);

  for (var i = 1; i <= score; i++) {
    if (i === 0) {
      return;
    }
    ctx.fillStyle = snake.color;
    ctx.fillRect(xSnakeTail[i], ySnakeTail[i], snake.w, snake.h);
  }

  // Make sure the array stays the length of the snake
  // (score + 1 because the 0 spot of th array is the head)
  if (xSnakeTail.length >= score + 1) {
    xSnakeTail.pop();
  }
  if (ySnakeTail.length >= score + 1) {
    ySnakeTail.pop();
  }


  foodGotAte(snake.x, snake.y, food.x, food.y);


  if (snake.x + snake.w > canvas.width) {
    console.log('Game Over!')
  } else if (snake.x < 0) {
    console.log('Game Over!')
  }

};

setInterval(animationLoop, gameInterval);

// Wait for everything on the page to load
// Then add an event listener for keydown calling function moveSnake
document.addEventListener('DOMContentLoaded', function(event) {
  window.addEventListener('keydown', moveSnake);
});
