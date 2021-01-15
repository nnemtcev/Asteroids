const MovingObject = require('./movingObject');
const Util = require('./utils');

Util.inherits(Bullet, MovingObject);

function Bullet(options) {
    MovingObject.call(this, { position: options.position, velocity: options.velocity, radius: '3', colour: 'green' });
};

module.exports = Bullet;