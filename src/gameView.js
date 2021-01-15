const Game = require('./game');

function GameView(canvasContext) {
    this.ctx = canvasContext;
    this.game = new Game(4, 800, 600);
};

GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.setInterval(() => {
        this.game.step();
        this.game.draw();
    }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
    key('up', () => {
        this.game.ship.power([0, -1]);
    });
    key('down', () => {
        this.game.ship.power([0, 1]);
    });
    key('left', () => {
        this.game.ship.power([-1, 0]);
    });
    key('right', () => {
        this.game.ship.power([1, 0]);
    });
    key('space', () => {
        const bullet = this.game.ship.fireBullet();
        this.game.bullets.push(bullet);
    });
};

module.exports = GameView;