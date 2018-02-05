$(document).ready(function() {
  $('select').material_select();
});

document.addEventListener('DOMContentLoaded', function(event) {
  function cl(string) {
    console.log(string);
  }

  // Grab Canvas element and store it
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var popUpContainer = document.getElementById('pop-up-container');
  var popUpPaused = document.getElementById('pop-up-paused');
  var popUpScore = document.getElementById('pop-up-score');
  var popUpNewGame = document.getElementById('pop-up-new-game')
  var finalScoreText = $('#final-score-text');
  var highScoreText = document.getElementById('high-score-text');
  var resetButton = document.getElementById('reset');
  var nextPlayerButton = document.getElementById('next-player');
  var updateOptionsBtn = document.getElementById('options-update');
  var player1Input = $('#player1');
  var player2Input = $('#player2');
  var player1ScoreBoard = $('#player1-score');
  var player2ScoreBoard = $('#player2-score');
  var frameLoopInterval;
  var gameInterval = 100;
  var snakeSize = 15;
  var score = 0;
  var xSnakeTail = [];
  var ySnakeTail = [];
  var colorSnakeTail = [];
  var colors = ['#ee4035', '#f37736', '#fce01a', '#7bc043', '#0392cf', '#7d32cc', '#c24cd3']
  var upInterval;
  var downInterval;
  var leftInterval;
  var rightInterval;
  var direction;
  var widthBySnakeSize = [];
  var heightBySnakeSize = [];
  var clearAllIntervals;
  var gamePaused = false;
  var startUpInterval;
  var startDownInterval;
  var startLeftInterval;
  var startRightInterval;
  var player1Name;
  var player2Name;
  var player1Score = 0;
  var player2Score = 0;
  var currentPlayer = 1;

  // set up canvas width & height
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;

  // This function will clear &/or create arrays for the food to randomly select a location
  var foodLocationChoices = function() {
    widthBySnakeSize = [];
    heightBySnakeSize = [];
    for (var i = 0; i < (canvas.width - snakeSize); i += snakeSize) {
      widthBySnakeSize.push(i);
    }
    for (var i = 0; i < (canvas.height - snakeSize); i += snakeSize) {
      heightBySnakeSize.push(i);
    }
  }
  foodLocationChoices();

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

  // This function is to use the directions to move the snake
  var moveSnake = function(event) {
    // UP
    if (event.keyCode === 38) {
      if (direction !== 'down') {
        clearInterval(downInterval);
        clearInterval(leftInterval);
        clearInterval(rightInterval);
        startUpInterval = function() {
          clearInterval(upInterval);
          upInterval = setInterval(function() {
            snake.y -= snakeSize;
          }, gameInterval);
        }
        startUpInterval();
        direction = 'up';
       }
    };
    // Down
    if (event.keyCode === 40) {
      if (direction !== 'up') {
        clearInterval(upInterval);
        clearInterval(leftInterval);
        clearInterval(rightInterval);
        startDownInterval = function() {
          clearInterval(downInterval);
          downInterval = setInterval(function() {
            snake.y += snakeSize;
          }, gameInterval);
        };

        startDownInterval();
        direction = 'down';
       }
    };
    // Left
    if (event.keyCode === 37) {
      if (direction !== 'right') {
        clearInterval(upInterval);
        clearInterval(downInterval);
        clearInterval(rightInterval);
        startLeftInterval = function() {
          clearInterval(leftInterval);
          leftInterval = setInterval(function() {
            snake.x -= snakeSize;
          }, gameInterval);
        }
        startLeftInterval();
        direction = 'left';
      }
    };
    // Right
    if (event.keyCode === 39) {
      if (direction !== 'left') {
        clearInterval(upInterval);
        clearInterval(downInterval);
        clearInterval(leftInterval);
        startRightInterval = function() {
          clearInterval(rightInterval);
          rightInterval = setInterval(function() {
            snake.x += snakeSize;
          }, gameInterval);
        }
        startRightInterval();
        direction = 'right';
      }
    };
    // SpaceBar (pause toggle)
    if (event.keyCode === 32) {
      if (gamePaused === false) {
        //clearInterval(frameLoopInterval);
        clearAllIntervals();
        gamePaused = true;
        popUpPaused.style.display = 'flex';
        popUpContainer.style.display = 'flex';
      } else if (gamePaused === true) {
        if (direction === 'up'){
          startUpInterval();
        } else if (direction === 'down') {
          startDownInterval();
        } else if (direction === 'left') {
          startLeftInterval();
        } else if (direction === 'right') {
          startRightInterval();
        }
        startDrawing();
        gamePaused = false;
        popUpContainer.style.display = 'none';
        popUpPaused.style.display = 'none';
      }
    }
  };

  var updateScoreBoard = function() {
    player1ScoreBoard.html(player1Name + ': ' + player1Score);
    player2ScoreBoard.html(player2Name + ': ' + player2Score);
  };

  // This function takes the options and updates the game with the new options
  var startGame = function() {
    score = 0;
    snakeSize = $('#size-selector').find(':selected').val();
    snakeSize = Number(snakeSize);
    gameInterval = $('#speed-selector').find(':selected').val();
    gameInterval = Number(gameInterval);
    cl('interval ' + gameInterval);
    player1Name = player1Input.val();
    player2Name = player2Input.val();
    updateScoreBoard();
    //Clear the colors array
    colorSnakeTail = [];
    colorSnakeTail.push(food.color);
    snake.w = snakeSize;
    snake.h = snakeSize;
    food.w = snakeSize;
    food.h = snakeSize;
    //It will empty the widthBySnakeSize and heightBySnakeSize and rewrite it with new snakeSize options
    foodLocationChoices();
    snake.x = widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)];
    snake.y = heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)];
    clearAllIntervals();
    direction = '';
    startDrawing();
    popUpNewGame.style.display = 'none';
    popUpContainer.style.display = 'none';
    // Add an event listener for keydown calling function moveSnake
    window.addEventListener('keydown', moveSnake);
  };

  var nextPlayer = function() {
    score = 0;
    xSnakeTail = [];
    ySnakeTail = [];
    colorSnakeTail = [];
    direction = '';
    setTimeout(function() {
      popUpContainer.style.display = 'none';
      popUpScore.style.display = 'none';
      finalScoreText.html('');
    }, 500);
    snake.x = widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)];
    snake.y = heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)];
    clearAllIntervals();
    newFood();
    startDrawing();
  };

  // Create a new food square
  var newFood = function() {
    food.color = randomColor();
    colorSnakeTail.push(food.color);
    food.x = widthBySnakeSize[Math.floor(Math.random() * widthBySnakeSize.length)];
    food.y = heightBySnakeSize[Math.floor(Math.random() * heightBySnakeSize.length)];
    for (var i = 0; i <= score; i++ ) {
      if (xSnakeTail[i] === food.x && ySnakeTail[i] === food.y) {
        newFood();
        cl('woops food cannot go on the snake');
      }
    }
    console.log('x ' + food.x + '  y ' + food.y);
  };


  var foodGotAte = function(x1, y1, x2, y2) {
    var xDistance = (x2 + snakeSize) - (x1 + snakeSize);
    var yDistance = (y2 + snakeSize) - (y1 + snakeSize);
    var gotAte = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    if (gotAte <= (snakeSize - 2)) {
      score += 1;
      if (currentPlayer === 1) {
        player1Score += 1;
      } else if (currentPlayer === 2) {
        player2Score += 1;
      }
      updateScoreBoard();
      newFood();
    }
  };

  // if any conditional ends the game it calls this function
  var gameOver = function() {
    //cl(finalScoreText)
    popUpScore.style.display = 'flex';
    popUpContainer.style.display = 'flex';
    finalScoreText.html(score);
    if (currentPlayer === 1) {
      finalScoreText.html(player1Name + ': ' + player1Score);
      $('#reset').hide();
      $('#winner').hide();
      $('#next-player').show();
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      finalScoreText.html(player1Name + ': ' + player1Score + '<br />' + player2Name + ': ' + player2Score);
      if (player1Score > player2Score) {
        $('#winner').html(player1Name + ' Wins!');
      } else if (player1Score < player2Score) {
        $('#winner').html(player2Name + ' Wins!');
      } else {
        $('#winner').html("It's a Draw!")
      }
      $('#winner').html()
      $('#next-player').hide();
      $('#reset').show();
      $('#winner').show();
      currentPlayer = 1;
    }
    clearAllIntervals();
  };



  // This is the main Interval section for drawing on the canvas
  var animationLoop = function() {
    // Clear the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cl(colorSnakeTail);
    //Creating the snake head
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
    //Creating the food
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, food.w, food.h);


    // document.getElementById('score').textContent = String(score);

    // Pass the x, y values of the head to an array for the tail to use
    xSnakeTail.unshift(snake.x);
    ySnakeTail.unshift(snake.y);

    //cl('x: ' + xSnakeTail.length + ' | y: ' + ySnakeTail);

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


    // Check to see if the head of the snake has hit its own  tail, if so end the game
    var hitSelfCheck = function(x1, y1, x2, y2) {
      var xDistance = (x2 + snakeSize) - (x1 + snakeSize);
      var yDistance = (y2 + snakeSize) - (y1 + snakeSize);
      var selfCheck = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
      if (selfCheck <= 1) {
        gameOver();
      }
    };

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

  clearAllIntervals = function() {
    clearInterval(upInterval);
    clearInterval(downInterval);
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearInterval(frameLoopInterval);
  };

  var newGame = function() {
    popUpContainer.style.display = 'flex';
    popUpNewGame.style.display = 'flex';
    newFood();
  };

  var startDrawing = function() {
    frameLoopInterval = setInterval(animationLoop, gameInterval);
  };
  newGame();



  var resetGame = function() {
    score = 0;
    player1Score = 0;
    player2Score = 0;
    updateScoreBoard();
    xSnakeTail = [];
    ySnakeTail = [];
    colorSnakeTail = [];
    //colorSnakeTail.push(food.color);
    setTimeout(function() {
      popUpContainer.style.display = 'none';
      popUpScore.style.display = 'none';
      finalScoreText.html('');
      newGame();
    }, 500);
    snake.x = widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)];
    snake.y = heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)];
    clearAllIntervals();
    direction = '';
    //startDrawing();
    //newGame();
  };

    updateOptionsBtn.addEventListener('click', startGame, true);
    resetButton.addEventListener('click', resetGame);
    nextPlayerButton.addEventListener('click', nextPlayer);

}); /// END DOM LOAD
