

  addLevels = function(score, level, widthBySnakeSize, heightBySnakeSize, foodX, foodY, halfWidthBySnakeSize, halfHeightBySnakeSize, canvasW, canvasH) {
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
  };
