const Asteroid = require('./asteroid');
const Ship = require('./ship');

function Game(numAsteroids, width, height) {
    this.NUM_ASTEROIDS = numAsteroids;
    this.DIM_X = width;
    this.DIM_Y = height;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship(this.randomPosition());
    this.addAsteroids();
};

Game.prototype.addAsteroids = function() {
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
        const randomPosition = this.randomPosition();
        this.asteroids.push(new Asteroid(randomPosition));
    }
};

Game.prototype.randomPosition = function() {
    const x = Math.random() * this.DIM_X;
    const y = Math.random() * this.DIM_Y;

    return [x, y];
};

Game.prototype.draw = function() {
    const ctx = document.getElementById('game-canvas').getContext('2d');
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach((movingObject) => {
        movingObject.draw();

        this.bullets.forEach(function(bullet) {
            bullet.draw();
        });
    });
};

Game.prototype.moveObjects = function() {
    this.allObjects().forEach((movingObject) => {
        movingObject.move();
        const wrappedPosition = this.wrap([movingObject.x, movingObject.y]);
        movingObject.x = wrappedPosition[0];
        movingObject.y = wrappedPosition[1];
    });
};

Game.prototype.wrap = function(pos) {
    const x = pos[0];
    const y = pos[1];

    let wrappedX = x;
    let wrappedY = y;

    if (x > this.DIM_X + 10) {
        wrappedX = 0;
    }

    if (x < -10) {
        wrappedX = this.DIM_X;
    }

    if (y < -10) {
        wrappedY = this.DIM_Y;
    }

    if (y > this.DIM_Y + 10) {
        wrappedY = 0;
    }

    return [wrappedX, wrappedY];
};

Game.prototype.remove = function(asteroid) {
    const objectIndex = this.asteroids().indexOf(asteroid);
    this.allObjects().splice(objectIndex, 1);
};

Game.prototype.checkCollisions = function() {
    this.asteroids.forEach((asteroid) => {
       if (asteroid.collidesWith(this.ship)) {
           const randomPosition = this.randomPosition();
           this.ship.relocate(randomPosition);
           this.ship.velocity = [0, 0];
       }
    });
};

Game.prototype.allObjects = function() {
    const allObjects = [];

    this.asteroids.forEach(function(asteroid) {
        allObjects.push(asteroid);
    });

    this.bullets.forEach(function(bullet) {
        allObjects.push(bullet);
    });

    allObjects.push(this.ship);
    return allObjects;
};

Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
};

module.exports = Game;