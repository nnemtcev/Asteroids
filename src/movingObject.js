const Util = require('./utils');

function MovingObject(options) {
    this.x = options.position[0];
    this.y = options.position[1];
    this.velocity = options.velocity;
    this.radius = options.radius;
    this.colour = options.colour;
};

MovingObject.prototype.move = function() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
};

MovingObject.prototype.draw = function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

module.exports = MovingObject;