/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./movingObject */ \"./src/movingObject.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nUtil.inherits(Asteroid, MovingObject);\n\nfunction Asteroid(position) {\n    MovingObject.call(this, { colour: '#d63031', radius: 10, position, velocity: Util.randomVec(10) });\n};\n\nAsteroid.prototype.collidesWith = function(otherObject) {\n    const distance = Util.calculateDistance([this.x, this.y], [otherObject.x, otherObject.y]);\n    const sumOfRadii = this.radius + otherObject.radius;\n\n    if (distance < sumOfRadii && otherObject instanceof Ship) {\n        return true;\n    }\n\n    return false;\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack://asteroids-game/./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./movingObject */ \"./src/movingObject.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nUtil.inherits(Bullet, MovingObject);\n\nfunction Bullet(options) {\n    MovingObject.call(this, { position: options.position, velocity: options.velocity, radius: '3', colour: 'green' });\n};\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack://asteroids-game/./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game(numAsteroids, width, height) {\n    this.NUM_ASTEROIDS = numAsteroids;\n    this.DIM_X = width;\n    this.DIM_Y = height;\n    this.asteroids = [];\n    this.bullets = [];\n    this.ship = new Ship(this.randomPosition());\n    this.addAsteroids();\n};\n\nGame.prototype.addAsteroids = function() {\n    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {\n        const randomPosition = this.randomPosition();\n        this.asteroids.push(new Asteroid(randomPosition));\n    }\n};\n\nGame.prototype.randomPosition = function() {\n    const x = Math.random() * this.DIM_X;\n    const y = Math.random() * this.DIM_Y;\n\n    return [x, y];\n};\n\nGame.prototype.draw = function() {\n    const ctx = document.getElementById('game-canvas').getContext('2d');\n    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n\n    this.allObjects().forEach((movingObject) => {\n        movingObject.draw();\n\n        this.bullets.forEach(function(bullet) {\n            bullet.draw();\n        });\n    });\n};\n\nGame.prototype.moveObjects = function() {\n    this.allObjects().forEach((movingObject) => {\n        movingObject.move();\n        const wrappedPosition = this.wrap([movingObject.x, movingObject.y]);\n        movingObject.x = wrappedPosition[0];\n        movingObject.y = wrappedPosition[1];\n    });\n};\n\nGame.prototype.wrap = function(pos) {\n    const x = pos[0];\n    const y = pos[1];\n\n    let wrappedX = x;\n    let wrappedY = y;\n\n    if (x > this.DIM_X + 10) {\n        wrappedX = 0;\n    }\n\n    if (x < -10) {\n        wrappedX = this.DIM_X;\n    }\n\n    if (y < -10) {\n        wrappedY = this.DIM_Y;\n    }\n\n    if (y > this.DIM_Y + 10) {\n        wrappedY = 0;\n    }\n\n    return [wrappedX, wrappedY];\n};\n\nGame.prototype.remove = function(asteroid) {\n    const objectIndex = this.asteroids().indexOf(asteroid);\n    this.allObjects().splice(objectIndex, 1);\n};\n\nGame.prototype.checkCollisions = function() {\n    this.asteroids.forEach((asteroid) => {\n       if (asteroid.collidesWith(this.ship)) {\n           const randomPosition = this.randomPosition();\n           this.ship.relocate(randomPosition);\n           this.ship.velocity = [0, 0];\n       }\n    });\n};\n\nGame.prototype.allObjects = function() {\n    const allObjects = [];\n\n    this.asteroids.forEach(function(asteroid) {\n        allObjects.push(asteroid);\n    });\n\n    this.bullets.forEach(function(bullet) {\n        allObjects.push(bullet);\n    });\n\n    allObjects.push(this.ship);\n    return allObjects;\n};\n\nGame.prototype.step = function() {\n    this.moveObjects();\n    this.checkCollisions();\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://asteroids-game/./src/game.js?");

/***/ }),

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView(canvasContext) {\n    this.ctx = canvasContext;\n    this.game = new Game(4, 800, 600);\n};\n\nGameView.prototype.start = function() {\n    this.bindKeyHandlers();\n    window.setInterval(() => {\n        this.game.step();\n        this.game.draw();\n    }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function() {\n    key('up', () => {\n        this.game.ship.power([0, -1]);\n    });\n    key('down', () => {\n        this.game.ship.power([0, 1]);\n    });\n    key('left', () => {\n        this.game.ship.power([-1, 0]);\n    });\n    key('right', () => {\n        this.game.ship.power([1, 0]);\n    });\n    key('space', () => {\n        const bullet = this.game.ship.fireBullet();\n        this.game.bullets.push(bullet);\n    });\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://asteroids-game/./src/gameView.js?");

/***/ }),

/***/ "./src/movingObject.js":
/*!*****************************!*\
  !*** ./src/movingObject.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction MovingObject(options) {\n    this.x = options.position[0];\n    this.y = options.position[1];\n    this.velocity = options.velocity;\n    this.radius = options.radius;\n    this.colour = options.colour;\n};\n\nMovingObject.prototype.move = function() {\n    this.x += this.velocity[0];\n    this.y += this.velocity[1];\n};\n\nMovingObject.prototype.draw = function() {\n    const canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    ctx.beginPath();\n    ctx.fillStyle = this.colour;\n    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);\n    ctx.fill();\n    ctx.closePath();\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack://asteroids-game/./src/movingObject.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./movingObject */ \"./src/movingObject.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nUtil.inherits(Ship, MovingObject);\n\nfunction Ship(position, velocity = [0, 0]) {\n    MovingObject.call(this, { position, velocity, radius: 10, colour: 'blue' });\n};\n\nShip.prototype.relocate = function(newPosition) {\n    this.x = newPosition[0];\n    this.y = newPosition[1];\n};\n\nShip.prototype.power = function(impulse) {\n    this.velocity[0] += impulse[0];\n    this.velocity[1] += impulse[1];\n};\n\nShip.prototype.fireBullet = function() {\n    return new Bullet({ position: [this.x, this.y], velocity: this.velocity });\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://asteroids-game/./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Util = {\n    inherits(childClass, parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    scale(vec, m) {\n        return [vec[0] * m * 0.3, vec[1] * m * 0.3];\n    },\n    calculateDistance(positionOne, positionTwo) {\n        const dx = positionOne[0] - positionTwo[0];\n        const dy = positionOne[1] - positionTwo[1];\n        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://asteroids-game/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./gameView */ \"./src/gameView.js\");\n\nwindow.Game = Game;\n\ndocument.addEventListener('DOMContentLoaded', function() {\n    const canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    const gameView = new GameView(ctx);\n    \n    gameView.start();\n});\n\n//# sourceURL=webpack://asteroids-game/./src/index.js?");
})();

/******/ })()
;