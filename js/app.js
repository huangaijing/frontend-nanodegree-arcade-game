// Enemies our player must avoid
var Enemy = function (configuration) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.y = (configuration.row - 1) * Constants.BLOCK_HEIGHT - 20;//configuration.row * 83
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.hitbox = {
        offsetX: 0,
        offsetY: 75,
        width: 101,
        height: 71
    };
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

Enemy.prototype.getHitboxX = function () {
    return this.x + this.hitbox.offsetX;
};

Enemy.prototype.getHitboxY = function () {
    return this.y + this.hitbox.offsetY;
};

Enemy.prototype.reset = function () {
    this.x = 0;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = Constants.CHAR_INIT_POSITION_X;
    this.y = Constants.CHAR_INIT_POSITION_Y;
    this.hitbox = {
        offsetX: 18,
        offsetY: 100,
        width: 65,
        height: 41
    }
}

Player.prototype.getHitboxX = function () {
    return this.x + this.hitbox.offsetX;
};

Player.prototype.getHitboxY = function () {
    return this.y + this.hitbox.offsetY;
};

Player.prototype.update = function (allEnemies) {
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollisions(allEnemies);
    if (this.checkWin()) {
        resetAll(this, allEnemies);
    }
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
    var player = this;
    allEnemies.forEach(function (enemy, index, array) {
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

Player.prototype.checkWin = function () {
    if (this.y === Constants.CHAR_INIT_POSITION_Y - (Constants.MAP_ROWS - 1) * Constants.BLOCK_HEIGHT) {
        score += 50;
        return true;
    } else {
        return false;
    }
};

Player.prototype.reset = function () {
    this.x = Constants.CHAR_INIT_POSITION_X;
    this.y = Constants.CHAR_INIT_POSITION_Y;
};

function resetAll(player, allEnemies) {
    player.reset();
    allEnemies.forEach(function (enemy, index, array) {
        enemy.reset();
    });
    console.log("SCORE: "+score);
    ctx.font = '48px serif';
    ctx.fillText('Score: '+score, 0, 50);
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
var score = 0;
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
