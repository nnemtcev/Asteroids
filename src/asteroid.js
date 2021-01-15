const MovingObject = require('./movingObject');
const Util = require('./utils');
const Ship = require('./ship');

Util.inherits(Asteroid, MovingObject);

function Asteroid(position) {
    MovingObject.call(this, { colour: '#d63031', radius: 10, position, velocity: Util.randomVec(10) });
};

Asteroid.prototype.collidesWith = function(otherObject) {
    const distance = Util.calculateDistance([this.x, this.y], [otherObject.x, otherObject.y]);
    const sumOfRadii = this.radius + otherObject.radius;

    if (distance < sumOfRadii && otherObject instanceof Ship) {
        return true;
    }

    return false;
};

module.exports = Asteroid;