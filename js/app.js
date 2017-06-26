// Enemies our player must avoid
var Enemy = function(configuration) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    /*var configuration = {
        row: int,
        minSpeed: int,
        maxSpeed: int
    }*/
    this.y = (configuration.row - 1) * Constants.BLOCK_HEIGHT - 20;
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    //hit box using for checking collision
    this.hitbox = {
        offsetX: 0,
        offsetY: 75,
        width: 101,
        height: 71
    };
    var getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    this.v = getRandomInt(configuration.minSpeed, configuration.maxSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Get hit box coordinate X for enemy instance
Enemy.prototype.getHitboxX = function() {
    return this.x + this.hitbox.offsetX;
};
// Get hit box coordinate Y for enemy instance
Enemy.prototype.getHitboxY = function() {
    return this.y + this.hitbox.offsetY;
};
// Reset enemy instances to the initial setting
Enemy.prototype.reset = function() {
    this.x = 0;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = Constants.CHAR_INIT_POSITION_X;
    this.y = Constants.CHAR_INIT_POSITION_Y;
    //hit box using for checking collision
    this.hitbox = {
        offsetX: 18,
        offsetY: 100,
        width: 65,
        height: 41
    }
}

// Get hit box coordinate X for player instance
Player.prototype.getHitboxX = function() {
    return this.x + this.hitbox.offsetX;
};

// Get hit box coordinate Y for player instance
Player.prototype.getHitboxY = function() {
    return this.y + this.hitbox.offsetY;
};

// Update the palyer's position, required method for game
// Parameter: allEnemies, the enemies arry, need update enemies' states according to player's state
Player.prototype.update = function(allEnemies) {
    this.checkCollisions(allEnemies);
    if (this.checkWin()) {
        resetAll(this, allEnemies);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//Handle user input, required method for game
Player.prototype.handleInput = function(key) {
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
            if (this.y <= 0) {
                return;
            }
            this.y -= Constants.BLOCK_HEIGHT;
            break;
        case 'down':
            if (this.y === 5 * Constants.BLOCK_HEIGHT - 30) { //initial y
                return;
            }
            this.y += Constants.BLOCK_HEIGHT;
            break;
    }

};

// check collisions of player and enemies 
Player.prototype.checkCollisions = function(allEnemies) {
    var player = this;
    allEnemies.forEach(function(enemy, index, array) {
        if (player.getHitboxX() + player.hitbox.width < enemy.getHitboxX() ||
            enemy.getHitboxX() + enemy.hitbox.width < player.getHitboxX() ||
            player.getHitboxY() + player.hitbox.height < enemy.getHitboxY() ||
            enemy.getHitboxY() + enemy.hitbox.height < player.getHitboxY()) {
            return;
        } else {
            console.log("Collision!!");
            resetAll(player, allEnemies);
            return;
        }
    });
};

// check player win or not
Player.prototype.checkWin = function() {
    if (this.y === Constants.CHAR_INIT_POSITION_Y - (Constants.MAP_ROWS - 1) * Constants.BLOCK_HEIGHT) {
        score += 50;
        return true;
    } else {
        return false;
    }
};

// Reset player's position
Player.prototype.reset = function() {
    this.x = Constants.CHAR_INIT_POSITION_X;
    this.y = Constants.CHAR_INIT_POSITION_Y;
};

// reset all enetities after win of collide
function resetAll(player, allEnemies) {
    player.reset();
    pickGameLevel(score / 50, allEnemies);
    console.log("SCORE: " + score);
}

//upgrade game level based on current score
function pickGameLevel(level, allEnemies) {
    var enemyNum = 0;
    var minSpeed = 0;
    var maxSpeed = 0;
    var conf = {};
    allEnemies.length = 0;
    switch (level) {
        case 0:
            enemyNum = 3;
            minSpeed = 50;
            maxSpeed = 200;
            break;
        case 1:
            enemyNum = 3;
            minSpeed = 100;
            maxSpeed = 400;
            break;
        case 2:
            enemyNum = 3;
            minSpeed = 100;
            maxSpeed = 600;
            break;
        case 3:
            enemyNum = 4;
            minSpeed = 200;
            maxSpeed = 600;
            break;
        case 4:
            enemyNum = 5;
            minSpeed = 200;
            maxSpeed = 700;
            break;
        default:
            enemyNum = 6;
            minSpeed = 300;
            maxSpeed = 700;
    }
    for (var i = 0; i < enemyNum; i++) {
        conf.row = i%3+2;
        conf.minSpeed = minSpeed;
        conf.maxSpeed = maxSpeed;
        allEnemies.push(new Enemy(conf));
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Initialize the score to 0 for the game
var allEnemies = [];
var conf = {};
for (var i = 0; i< 3; i++){
    conf.row = i%3+2;
    conf.minSpeed = 50;
    conf.maxSpeed = 200;
    allEnemies.push(new Enemy(conf));
}

var player = new Player();
var score = 0;

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