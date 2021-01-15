const MovingObject = require('./movingObject');
const Bullet = require('./bullet');
const Game = require('./game');
const Util = require('./utils');

Util.inherits(Ship, MovingObject);

function Ship(position, velocity = [0, 0]) {
    MovingObject.call(this, { position, velocity, radius: 10, colour: 'blue' });
};

Ship.prototype.relocate = function(newPosition) {
    this.x = newPosition[0];
    this.y = newPosition[1];
};

Ship.prototype.power = function(impulse) {
    this.velocity[0] += impulse[0];
    this.velocity[1] += impulse[1];
};

Ship.prototype.fireBullet = function() {
    return new Bullet({ position: [this.x, this.y], velocity: this.velocity });
};

module.exports = Ship;