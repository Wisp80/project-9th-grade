'use strict';

export const helper = {
    getRandomColor: function () {
        const letters = '012345678ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)] };
        return color;
    },
};