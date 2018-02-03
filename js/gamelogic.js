document.addEventListener('DOMContentLoaded', function(event) {
  function cl(string) {
    console.log(string);
  }

  // Grab Canvas element and store it
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var popUpContainer = document.getElementById('pop-up-container');
  var finalScoreText = document.getElementById('final-score-text');
  var highScoreText = document.getElementById('high-score-text');
  var resetButton = document.getElementById('reset');
  var frameLoopInterval;
  var gameInterval = 100;
  var snakeSize = 20;
  var score = 0;
  var xSnakeTail = [];
  var ySnakeTail = [];
  var colorSnakeTail = [];
  var colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf', '#7d32cc', '#c24cd3', '#7d32cc', '#c24cd3']
  var upInterval;
  var downInterval;
  var leftInterval;
  var rightInterval;
  var direction;
  var widthBySnakeSize = [];
  var heightBySnakeSize = [];

  // set up canvas width & height
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (var i = 0; i < (canvas.width - snakeSize); i += snakeSize) {
    widthBySnakeSize.push(i);
  }
  for (var i = 0; i < (canvas.height - snakeSize); i += snakeSize) {
    heightBySnakeSize.push(i);
  }
  //cl(widthBySnakeSize);
  var snake = {
    x: widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)],
    y: heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)],
    color: '#7bc043',
    w: snakeSize,
    h: snakeSize,
  }
  var food = {
    w: snakeSize,
    h: snakeSize,
    //color: '#0392cf',
  }
  cl(snake.x + ' ' + snake.y)
  var randomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  var moveSnake = function(event) {
    // Clear all directional Intervals
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

  // Create a new food square
  var newFood = function() {
    // food.x = Math.random() * (window.innerWidth - snakeSize);
    // food.y = Math.random() * (window.innerHeight - snakeSize);
    food.color = randomColor();
    colorSnakeTail.push(food.color);
    cl(colorSnakeTail);
    food.x = widthBySnakeSize[Math.floor(Math.random() * widthBySnakeSize.length)];
    food.y = heightBySnakeSize[Math.floor(Math.random() * heightBySnakeSize.length)];
    console.log('x ' + food.x + '  y ' + food.y);
  };


  var foodGotAte = function(x1, y1, x2, y2) {
    var xDistance = (x2 + snakeSize) - (x1 + snakeSize);
    var yDistance = (y2 + snakeSize) - (y1 + snakeSize);
    var gotAte = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    cl(gotAte);
    if (gotAte <= (snakeSize - 2)) {
      score += 1;
      newFood();
    }
  };

  // if any conditional ends the game it calls this function
  var gameOver = function() {
    cl(finalScoreText)
    popUpContainer.style.display = 'flex';
    finalScoreText.textContent = score;
    clearInterval(frameLoopInterval);
  };

  // This is the main Interval section for drawing on the canvas
  var animationLoop = function() {
    // Clear the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Creating the snake head
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
    //Creating the food
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, food.w, food.h);


    document.getElementById('score').textContent = String(score);

    // Pass the x, y values of the head to an array for the tail to use
    xSnakeTail.unshift(snake.x);
    ySnakeTail.unshift(snake.y);

    cl('x: ' + xSnakeTail.length + ' | y: ' + ySnakeTail);

    // check to see if the snake has any x,y values for its tail, if so add the squares
    for (var i = 1; i <= score; i++) {
      if (i === 0) {
        return;
      }
      ctx.fillStyle = colorSnakeTail[i -1];
      ctx.fillRect(xSnakeTail[i], ySnakeTail[i], snake.w, snake.h);
    }




    // Make sure the array stays the length of the snake
    // (score + 1 because the 0 spot of th array is the head of the snake)
    if (xSnakeTail.length >= score + 1) {
      xSnakeTail.pop();
    }
    if (ySnakeTail.length >= score + 1) {
      ySnakeTail.pop();
    }

    // Check to See if the snake hits the food
    foodGotAte(snake.x, snake.y, food.x, food.y);
    if (xSnakeTail.length > 2) {
      for (var i = 2; i <= xSnakeTail.length; i++) {
        if (xSnakeTail[i] === xSnakeTail[0] && ySnakeTail[i] === ySnakeTail[0]) {
          hitSelfCheck(snake.x, snake.y, xSnakeTail[i], ySnakeTail[i]);
          console.log('Game Over! Hit Slef');
        }

      };
    };

    // Check to see if the head of the snake has hit its own  tail, if so end the game
    var hitSelfCheck = function(x1, y1, x2, y2) {
      var xDistance = (x2 + snakeSize) - (x1 + snakeSize);
      var yDistance = (y2 + snakeSize) - (y1 + snakeSize);
      var selfCheck = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
      cl(selfCheck);
      if (selfCheck <= 1) {
        gameOver();
      }
    };
    
    // If the Game hits the border, game over.
    if (snake.x + snake.w > canvas.width) {
      gameOver();
    } else if (snake.x < 0) {
      gameOver();
    } else if (snake.y + snake.h > canvas.height) {
      gameOver();
    } else if (snake.y < 0) {
      gameOver();
    }

  };

  var startDrawing = function() {
    frameLoopInterval = setInterval(animationLoop, gameInterval);
    newFood();
  };
  startDrawing();

  var resetGame = function() {
    score = 0;
    xSnakeTail = [];
    ySnakeTail = [];
    colorSnakeTail = [];
    setTimeout(function() {
      popUpContainer.style.display = 'none';
      finalScoreText.textContent = '';
    }, 500);
    snake.x = widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)];
    snake.y = heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)];
    clearInterval(upInterval);
    clearInterval(downInterval);
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    direction = '';
    startDrawing();

  };

  // Add an event listener for keydown calling function moveSnake
    window.addEventListener('keydown', moveSnake);
    resetButton.addEventListener('click', resetGame);

}); /// END DOM LOAD
