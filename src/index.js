const Game = require('./game');
const GameView = require('./gameView');

window.Game = Game;

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const gameView = new GameView(ctx);
    
    gameView.start();
});