'use strict';

export const helper = {
    checkIntersectionBetweenNotRotatedRectangleAndPoint: function (
        farX, closeX,
        farY, closeY,
        pointX, pointY,
    ) {
        if (closeX <= pointX &&
            farX >= pointX &&
            closeY <= pointY &&
            farY >= pointY) {
            return true;
        } else {
            return false;
        };
    },

    getRandomColor: function () {
        const letters = '012345678ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)] };
        return color;
    },
};