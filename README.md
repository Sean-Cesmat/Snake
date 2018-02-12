# Snake
My Unit1 game project for WDI 17

# Instructions
- Use the arrow keys to control the snake and collect the "food".
- If you eat the "food", you will have 1 point added to your score.
- If you hit your own tail, a barrier or the edge of the map (unless continuous borders is set to 'yes'), your turn ends.
- The person with the highest score wins!


# Unsolved problems
- there is a small glitch after pausing where the snake is missing a sections for a second


# Approach Taken
- Used a setInterval to animate
- Randomly add a "food" square to the board and grab a random color from the array
- If the snake head collides with the "food" the square it is added to the tail array
- The x,y coordinates get passed down the array so each square follows the one in front of it
- Check if the snake head has gone beyond the edge of canvas, has the same x,y as one of its tail squares or if the x,y is between two numbers.
- If it is it ends the turn and pops up the score.
- After both turns it shows both scores with the name of the winner!

# Technologies Used
- HTML5
- CSS
- Javascript
- jQuery

# Credits
- FlipClock.js for my scoreboard. Check it out at http://flipclockjs.com/
- Snake by icon 54 from the Noun Project
