const Util = {
    inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
    },
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    scale(vec, m) {
        return [vec[0] * m * 0.3, vec[1] * m * 0.3];
    },
    calculateDistance(positionOne, positionTwo) {
        const dx = positionOne[0] - positionTwo[0];
        const dy = positionOne[1] - positionTwo[1];
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
};

module.exports = Util;