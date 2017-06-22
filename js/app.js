// Enemies our player must avoid
var Enemy = function (configuration) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.y = (configuration.row - 1) * Constants.BLOCK_HEIGHT - 20;//configuration.row * 83
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;

    var getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    this.v = getRandomInt(50, 200);


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var ds = this.v * dt;
    if (this.x > 505) {
        this.x = 0;
    } else {
        this.x += ds;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * Constants.BLOCK_WIDTH;
    this.y = 5 * Constants.BLOCK_HEIGHT - 30;
    this.hitbox = {
        //TODO
    }
}

Player.prototype.update = function () {

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x <= 0) {
                return;
            }
            this.x -= Constants.BLOCK_WIDTH;
            break;
        case 'right':
            if (this.x === Constants.BLOCK_WIDTH * (Constants.MAP_COLUMNS - 1)) {
                return;
            }
            this.x += Constants.BLOCK_WIDTH;
            break;
        case 'up':
            console.log("this.y" + this.y);
            // console.log("this.y" + this.y);
            if (this.y <= 0) {
                return;
            }
            this.y -= Constants.BLOCK_HEIGHT;
            break;
        case 'down':
            if (this.y === 5 * Constants.BLOCK_HEIGHT - 30) {//initial y
                return;
            }
            this.y += Constants.BLOCK_HEIGHT;
            break;
    }
};

Player.prototype.checkCollisions = function (allEnemies) {
    allEnemies.forEach(function (currentValue, index, array) {

    });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy({
    row: 2
}));
allEnemies.push(new Enemy({
    row: 3
}));
allEnemies.push(new Enemy({
    row: 4
}));

var player = new Player();

// var canvas = document.getElementsByTagName("canvas")[0];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
