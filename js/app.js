// Variables given to the dimensions of the x and y grid
var colWidth = 101;
var rowHeight = 83;

//Sprite SuperClass which is called by enemy and player render methods
var Sprite = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function returns a random number between 10-100
function Speed(min, max) {
  min = 10;
  max = 100;
  return Math.random() * (max - min) + min;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Speed();
    this.width = 75;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
      this.x = -200;
    }
    // Check for any collisions
    this.collisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    Sprite.call(this);
};

// Method to detect when the enemy and the player touch each other.  If so, the player
// alive attribute is change to false.
Enemy.prototype.collisions = function () {
  if (this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y === player.y) {
    player.health = false;
    console.log("tryAgain");
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = colWidth * 2;
  this.y = rowHeight * 5;
  this.sprite = 'images/char-boy.png';
  this.width = 75;
  this.health = true;
  this.speed = Speed();
};

Player.prototype.reset = function() {
  this.x = colWidth * 2;
  this.y = rowHeight * 5;
};

Player.prototype.update = function(dt) {
  if (this.health === false) {
    this.reset();
    this.health = true;
  }
  if (this.y < rowHeight) {
    this.reset();
  }
};

Player.prototype.render = function() {
  Sprite.call(this);
};

Player.prototype.handleInput = function(allowedKeys) {
  switch (allowedKeys) {
    case 'left':
    if (this.x > 34) {
      this.x = this.x - colWidth;
    }
    break;
    case 'right':
    if (this.x < 400) {
      this.x = this.x + colWidth;
    }
    break;
    case 'up':
    if (this.y > 0) {
      this.y = this.y - rowHeight;
    }
    break;
    case 'down':
    if (this.y < 400) {
      this.y = this.y + rowHeight;
    }
    break;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i * colWidth, (i * rowHeight + rowHeight)));
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
