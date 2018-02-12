$(document).ready(function() {
  function cl(string) {
    console.log(string);
  }
  // Grab Canvas element and store it
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var popUpPaused = $('#pop-up-paused');
  var popUpScore = $('#pop-up-score');
  var popUpNewGame = $('#pop-up-new-game');
  var popUpLevel = $('#pop-up-level');
  var highScoreText = $('#high-score-text');
  var resetButton = $('#reset');
  var nextPlayerButton = $('#next-player');
  var nextLevelButton = $('#next-level');
  var updateOptionsBtn = $('#options-update');
  var brickImg = new Image();
  brickImg.src = 'img/gray-brick-sm.jpg';
  var player1Input = $('#player1');
  var player2Input = $('#player2');
  var player1ScoreBoard = $('#player1-score');
  var player2ScoreBoard = $('#player2-score');
  var oneItteration = true;
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
  var upForNextLevel;
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
  var level = 1;
  var halfWidthBySnakeSize;
  var halfheightBySnakeSize;
  var recenterSnakeXY;
  var continuousBorder;
  var p1FlipScore;
  var p2FlipScore;

  // Add the scoreboard to the top bar
  p1FlipScore = new FlipClock($('#p1-top-score'), 00, {
    clockFace: 'Counter'
  });
  p2FlipScore = new FlipClock($('#p2-top-score'), 00, {
    clockFace: 'Counter'
  });

  // Initial set up canvas width & height
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - $('header').outerHeight();

  //  This function essentially sets up arrays for grid use
  // It will clear &/or create arrays for the food to randomly select a location
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

  recenterSnakeXY = function() {
    snake.x = widthBySnakeSize[Math.floor(widthBySnakeSize.length / 2)];
    snake.y = heightBySnakeSize[Math.floor(heightBySnakeSize.length / 2)];
  };

  // Get half of the array and make sure its a whole number
  halfWidthBySnakeSize = Math.floor(widthBySnakeSize.length / 2);
  halfHeightBySnakeSize = Math.floor(heightBySnakeSize.length / 2);

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
  }
  cl(snake.x + ' ' + snake.y)
  var randomColor = function() {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  var clearVars = function() {
    score = 0;
    xSnakeTail = [];
    ySnakeTail = [];
    colorSnakeTail = [];
    direction = '';
    level = 1;
  }

  // This function is to use the directions to move the snake
  var moveSnake = function(event) {
    // UP
    if (event.keyCode === 38) {
      if (direction !== 'down' && direction !== 'up' && oneItteration === true) {
        clearInterval(downInterval);
        clearInterval(leftInterval);
        clearInterval(rightInterval);
        startUpInterval = function() {
          upInterval = setInterval(function() {
            snake.y -= snakeSize;
            oneItteration = true;
          }, gameInterval);
        }
        oneItteration = false;
        startUpInterval();
        direction = 'up';
       }
    };
    // Down
    if (event.keyCode === 40) {
      if (direction !== 'up' && direction !== 'down' && oneItteration === true) {
        clearInterval(upInterval);
        clearInterval(leftInterval);
        clearInterval(rightInterval);
        startDownInterval = function() {
          downInterval = setInterval(function() {
            snake.y += snakeSize;
            oneItteration = true;
          }, gameInterval);
        };
        oneItteration = false;
        startDownInterval();
        direction = 'down';
       }
    };
    // Left
    if (event.keyCode === 37) {
      if (direction !== 'right' && direction !== 'left' && oneItteration === true) {
        clearInterval(upInterval);
        clearInterval(downInterval);
        clearInterval(rightInterval);
        startLeftInterval = function() {
          leftInterval = setInterval(function() {
            snake.x -= snakeSize;
            oneItteration = true;
          }, gameInterval);
        }
        oneItteration = false;
        startLeftInterval();
        direction = 'left';
      }
    };
    // Right
    if (event.keyCode === 39) {
      if (direction !== 'left' && direction !== 'right' && oneItteration === true) {
        clearInterval(upInterval);
        clearInterval(downInterval);
        clearInterval(leftInterval);
        startRightInterval = function() {
          rightInterval = setInterval(function() {
            snake.x += snakeSize;
            oneItteration = true;
          }, gameInterval);
        }
        oneItteration = false;
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
        popUpPaused.css('display', 'flex');
        $('#main-modal').modal('open');
      } else if (gamePaused === true) {
        if (direction === 'up'){
          clearInterval(upInterval);
          startUpInterval();
        } else if (direction === 'down') {
          clearInterval(downInterval);
          startDownInterval();
        } else if (direction === 'left') {
          clearInterval(leftInterval);
          startLeftInterval();
        } else if (direction === 'right') {
          clearInterval(rightInterval);
          startRightInterval();
        }
        startDrawing();
        gamePaused = false;
        popUpPaused.css('display', 'none');
        $('#main-modal').modal('close');
      }
    }
  };


  // This function takes the options and updates the game with the new options
  var startGame = function() {
    //--score = 0;
    newFood();
    snakeSize = $('#size-selector').find(':selected').val();
    snakeSize = Number(snakeSize);
    gameInterval = $('#speed-selector').find(':selected').val();
    gameInterval = Number(gameInterval);
    continuousBorder = $('#continuous-border-selector').find(':selected').val();
    console.log(continuousBorder);
    player1Name = player1Input.val();
    player2Name = player2Input.val();
    $('.top-score .p1-top-name').html(player1Name);
    $('.top-score .p2-top-name').html(player2Name);
    colorSnakeTail = [];
    colorSnakeTail.push(food.color);
    snake.w = snakeSize;
    snake.h = snakeSize;
    food.w = snakeSize;
    food.h = snakeSize;
    //It will empty the widthBySnakeSize and heightBySnakeSize and rewrite it with new snakeSize options
    foodLocationChoices();
    recenterSnakeXY();
    food.x = widthBySnakeSize[Math.floor(Math.random() * widthBySnakeSize.length)];
    food.y = heightBySnakeSize[Math.floor(Math.random() * heightBySnakeSize.length)];
    clearAllIntervals();
    direction = '';
    startDrawing();
    // Add an event listener for keydown calling function moveSnake
    window.addEventListener('keydown', moveSnake);

  };

  var nextPlayer = function() {
    clearVars();
    setTimeout(function() {
      $('#main-modal').modal('close');
      popUpScore.css('display', 'none');
    }, 500);
    recenterSnakeXY();
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
        p1FlipScore.increment();
      } else if (currentPlayer === 2) {
        player2Score += 1;
        p2FlipScore.increment();
      }
      newFood();
    }
  };

  // if any conditional ends the game it calls this function
  var gameOver = function() {
    popUpScore.css('display', 'flex');
    $('#main-modal').modal('open');
    if (currentPlayer === 1) {
      $('.final-scores').removeClass('s6');
      $('.final-scores').addClass('s12');
      $('.final-scores:nth-child(2)').hide();
      $('.final-scores #name1').html(player1Name);
      var p1FlipFinalScore = new FlipClock($('#p1-final-score'), player1Score, {
        clockFace: 'Counter'
      });
      $('#reset').hide();
      $('#winner').hide();
      $('#next-player').show();
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      $('.final-scores').removeClass('s12');
      $('.final-scores').addClass('s6');
      $('.final-scores:nth-child(2)').show();
      $('#name1').html(player1Name);
      $('#name2').html(player2Name);
      var p1FlipFinalScore = new FlipClock($('#p1-final-score'), player1Score, {
        clockFace: 'Counter'
      });
      var p2FlipFinalScore = new FlipClock($('#p2-final-score'), player2Score, {
        clockFace: 'Counter'
      });
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

  var levelComplete = function() {
    window.removeEventListener('keydown', moveSnake);
    xSnakeTail = [];
    ySnakeTail = [];
    direction = 'up';
    $('#main-modal').modal('open');
    popUpLevel.css('display', 'flex');
    $('#pop-up-level h1').html('Level ' + level + ' complete');
    recenterSnakeXY();
    clearAllIntervals();
    level++;
    upForNextLevel = function(event) {
      if (event.keyCode === 38) {
        nextLevel();
      }
    }
    window.addEventListener('keydown', upForNextLevel);

  };

  var nextLevel = function() {
    window.removeEventListener('keydown', upForNextLevel);
    popUpLevel.css('display', 'none');
    $('#main-modal').modal('close');
    startUpInterval();
    startDrawing();
    window.addEventListener('keydown', moveSnake);
  };

  // These functions create barriers, make it so food won't be added there
  // and they also check to see if the snake touched it
  var drawingVerticalWall = function(x, y, y2, length) {
    //ctx.fillStyle = '#26a69a';
    var pattern = ctx.createPattern(brickImg, 'repeat');
    ctx.fillStyle = pattern;
    //ctx.fillRect(0, 0, snakeSize, snakeSize);
    ctx.fillRect(x, y, snakeSize, snakeSize * length);
    if (snake.x >= x && snake.x <= (x + snakeSize - 1)) {
      if (snake.y >= y && snake.y <= (y2 - 1) ) {
        gameOver();
      }
    };
  };
  var verticalWallCheck = function(itemX, itemY, x, y, y2, length) {
    if (itemX >= x && itemX <= (x + snakeSize - 1)) {
      if (itemY >= y && itemY <= (y2 - 1) ) {
        // if (itemX === snake.x) {
        //   gameOver();
        //   cl('snakes cannot go on a wall');
        // };
        if (itemX === food.x) {
          newFood();
          cl('food cannot go on a wall');
        };
      };
    };
  };
  var drawingHorizontalWall = function(x, x2, y, length) {
    // ctx.fillStyle = '#26a69a';
    var pattern = ctx.createPattern(brickImg, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(x, y, snakeSize * length, snakeSize);
    if (snake.x >= x && snake.x <= (x2 - 1)) {
      if (snake.y >= y && snake.y <= (y + snakeSize) - 1) {
        gameOver();
      }
    };
  };
  var horizontalWallCheck = function(itemX, itemY, x, x2, y, length) {
    if (itemX >= x && itemX <= (x2 - 1)) {
      if (itemY >= y && itemY <= (y + snakeSize - 1)) {
        // if (itemX === snake.x) {
        //   gameOver();
        //   cl('snakes cannot go on a wall');
        // };
        if (itemX === food.x) {
          newFood();
          cl('food cannot go on a wall');
        };
      };
    };
  };

  // This is the main Interval section for drawing on the canvas
  var animationLoop = function() {
    // Clear the frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check to see if they have completed a level
    // If they haven't then keep drawing the snake and food
    if (score === 5 && level === 1) {
      levelComplete();
    } else if (score === 10 && level === 2){
      levelComplete();
    } else if (score === 20 && level === 3){
      levelComplete();
    } else if (score === 30 && level === 4){
      levelComplete();
    } else {
      //Creating the snake head
      ctx.fillStyle = snake.color;
      ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
      //Creating the food
      ctx.fillStyle = food.color;
      ctx.fillRect(food.x, food.y, food.w, food.h);
    }

    if (score >= 5 && level >= 2) {
      // LeftCenter Wall
      drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize - 6], heightBySnakeSize[halfHeightBySnakeSize - 3], heightBySnakeSize[halfHeightBySnakeSize + 3], 6);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 6], heightBySnakeSize[halfHeightBySnakeSize - 3], heightBySnakeSize[halfHeightBySnakeSize + 3], 6);
      // RightCenter Wall
      drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize + 6], heightBySnakeSize[halfHeightBySnakeSize - 3], heightBySnakeSize[halfHeightBySnakeSize + 3], 6);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 6], heightBySnakeSize[halfHeightBySnakeSize - 3], heightBySnakeSize[halfHeightBySnakeSize + 3], 6);
    }

    if (score >= 10 && level >= 3) {

      // UpperLeft -- create item and make sure no food goes there
      drawingVerticalWall(widthBySnakeSize[5], heightBySnakeSize[5],  heightBySnakeSize[9], 4);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[5], heightBySnakeSize[5],  heightBySnakeSize[9], 4);
      drawingHorizontalWall(widthBySnakeSize[5], widthBySnakeSize[9], heightBySnakeSize[5], 4);
      horizontalWallCheck(food.x, food.y, widthBySnakeSize[5], widthBySnakeSize[9], heightBySnakeSize[5], 4);

      // UpperRight -- create item and make sure no food goes there
      drawingVerticalWall(widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[5],  heightBySnakeSize[9], 4);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[5],  heightBySnakeSize[9], 4);
      drawingHorizontalWall(widthBySnakeSize[widthBySnakeSize.length - 8], widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[5], 4);
      horizontalWallCheck(food.x, food.y, widthBySnakeSize[widthBySnakeSize.length - 8], widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[5], 4);

      // LowerLeft
      drawingVerticalWall(widthBySnakeSize[5], heightBySnakeSize[heightBySnakeSize.length - 8],  heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[5], heightBySnakeSize[heightBySnakeSize.length - 8],  heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      drawingHorizontalWall(widthBySnakeSize[5], widthBySnakeSize[9], heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      horizontalWallCheck(food.x, food.y, widthBySnakeSize[5], widthBySnakeSize[9], heightBySnakeSize[heightBySnakeSize.length - 5], 4);

      drawingVerticalWall(widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[heightBySnakeSize.length - 8],  heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      verticalWallCheck(food.x, food.y, widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[heightBySnakeSize.length - 8],  heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      drawingHorizontalWall(widthBySnakeSize[widthBySnakeSize.length - 8], widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[heightBySnakeSize.length - 5], 4);
      horizontalWallCheck(food.x, food.y, widthBySnakeSize[widthBySnakeSize.length - 8], widthBySnakeSize[widthBySnakeSize.length - 5], heightBySnakeSize[heightBySnakeSize.length - 5], 4);
    }

    if (score >= 20 && level >= 4) {
      if (canvas.width > 860) {
        // MiddleLeft
        drawingHorizontalWall(widthBySnakeSize[8], widthBySnakeSize[15], heightBySnakeSize[halfHeightBySnakeSize], 7);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[8], widthBySnakeSize[15], heightBySnakeSize[halfHeightBySnakeSize], 7);
        // Middle RIght
        drawingHorizontalWall(widthBySnakeSize[widthBySnakeSize.length - 15], widthBySnakeSize[widthBySnakeSize.length - 8], heightBySnakeSize[halfHeightBySnakeSize], 7);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[widthBySnakeSize.length - 14], widthBySnakeSize[widthBySnakeSize.length - 21], heightBySnakeSize[halfHeightBySnakeSize], 7);
      }
      if (canvas.width > 1000) {
        // Inner MiddleLeft
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize - 15], widthBySnakeSize[halfWidthBySnakeSize - 11], heightBySnakeSize[halfHeightBySnakeSize], 4);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 15], widthBySnakeSize[halfWidthBySnakeSize - 11], heightBySnakeSize[halfHeightBySnakeSize], 4);
        // Inner Middle RIght
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize + 11], widthBySnakeSize[halfWidthBySnakeSize + 15], heightBySnakeSize[halfHeightBySnakeSize], 4);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 11], widthBySnakeSize[halfWidthBySnakeSize + 15], heightBySnakeSize[halfHeightBySnakeSize], 4);
      }
    }
    if (score >= 30 && level >= 5) {
      if (canvas.width < 860 && canvas.width > 460) {
        // LowerMiddleLeft
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize - 10], widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[heightBySnakeSize.length - 5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 10], widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[heightBySnakeSize.length - 5], 5);

        // LowerMiddleRight
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize + 5], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 5], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize + 5], widthBySnakeSize[halfWidthBySnakeSize + 9], heightBySnakeSize[heightBySnakeSize.length - 5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 5], widthBySnakeSize[halfWidthBySnakeSize + 9], heightBySnakeSize[heightBySnakeSize.length - 5], 5);

        // UpperMiddleLeft
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 5], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize - 10], widthBySnakeSize[halfWidthBySnakeSize - 6], heightBySnakeSize[5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 10], widthBySnakeSize[halfWidthBySnakeSize - 6], heightBySnakeSize[5], 5);

        // UpperMiddleRight
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize + 5], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 5], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize + 5], widthBySnakeSize[halfWidthBySnakeSize + 9], heightBySnakeSize[5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 5], widthBySnakeSize[halfWidthBySnakeSize + 9], heightBySnakeSize[5], 5);
      } else {
        // LowerMiddleLeft
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize - 20], widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[heightBySnakeSize.length - 5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 20], widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[heightBySnakeSize.length - 5], 5);

        // LowerMiddleRight
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize + 14], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 14], heightBySnakeSize[heightBySnakeSize.length - 6],  heightBySnakeSize[heightBySnakeSize.length - 5], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize + 15], widthBySnakeSize[halfWidthBySnakeSize + 19], heightBySnakeSize[heightBySnakeSize.length - 5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 15], widthBySnakeSize[halfWidthBySnakeSize + 19], heightBySnakeSize[heightBySnakeSize.length - 5], 5);

        // UpperMiddleLeft
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 15], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize - 20], widthBySnakeSize[halfWidthBySnakeSize - 16], heightBySnakeSize[5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize - 20], widthBySnakeSize[halfWidthBySnakeSize - 16], heightBySnakeSize[5], 5);

        // UpperMiddleRight
        drawingVerticalWall(widthBySnakeSize[halfWidthBySnakeSize + 15], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        verticalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 15], heightBySnakeSize[5],  heightBySnakeSize[6], 2);
        drawingHorizontalWall(widthBySnakeSize[halfWidthBySnakeSize + 15], widthBySnakeSize[halfWidthBySnakeSize + 19], heightBySnakeSize[5], 5);
        horizontalWallCheck(food.x, food.y, widthBySnakeSize[halfWidthBySnakeSize + 15], widthBySnakeSize[halfWidthBySnakeSize + 19], heightBySnakeSize[5], 5);
      }
    }

    // Pass the x, y values of the head to an array for the tail to use
    xSnakeTail.unshift(snake.x);
    ySnakeTail.unshift(snake.y);

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
      for (var i = 3; i <= xSnakeTail.length; i++) {
        if (xSnakeTail[i] === xSnakeTail[0] && ySnakeTail[i] === ySnakeTail[0]) {
          hitSelfCheck(snake.x, snake.y, xSnakeTail[i], ySnakeTail[i]);
          console.log('Game Over! Hit Slef');
        }

      };
    };
    console.log(continuousBorder);
    if (continuousBorder === 'no') {
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
    } else {
      if (snake.x + snake.w > canvas.width) {
        snake.x = 0;
      } else if (snake.x < 0) {
        snake.x = widthBySnakeSize[widthBySnakeSize.length];
      } else if (snake.y + snake.h > canvas.height) {
        snake.y = 0;
      } else if (snake.y < 0) {
        snake.y = heightBySnakeSize[heightBySnakeSize.length];
        
      }
    }

  };

  clearAllIntervals = function() {
    clearInterval(upInterval);
    clearInterval(downInterval);
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearInterval(frameLoopInterval);
  };

  var startDrawing = function() {
    frameLoopInterval = setInterval(animationLoop, gameInterval);
  };

  var resetGame = function() {
    clearVars();
    player1Score = 0;
    player2Score = 0;
    p1FlipScore.reset();
    p2FlipScore.reset();
    setTimeout(function() {
      $('#main-modal').modal('close');
      popUpScore.css('display', 'none');
      $('#game-options').modal('open');
    }, 500);
    recenterSnakeXY();
    clearAllIntervals();
  };

    updateOptionsBtn.on('click', startGame);
    resetButton.on('click', resetGame);
    nextPlayerButton.on('click', nextPlayer);
    nextLevelButton.on('click', nextLevel);

    // Materialize Calls
    $('select').material_select();
    $('#game-options').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '20%', // Ending top style attribute
      complete: startGame // Callback for Modal close
    });
    $('#main-modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '20%', // Ending top style attribute
      //complete:  // Callback for Modal close
    });
    $('#game-options').modal('open');

}); /// END $(document).ready(function()
