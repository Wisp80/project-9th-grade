'use strict';

/*Объект "controls" представляет из себя объект игры, обрабатывающий нажатие и отжатие кнопок управления игрой.*/
export const controls = {
    isAKeyDown: false,
    isDKeyDown: false,
    isWKeyDown: false,
    isSKeyDown: false,
    isLeftArrowKeyDown: false,
    isRightArrowKeyDown: false,
    isUpArrowKeyDown: false,
    isDownArrowKeyDown: false,

    mapping: {
        65: 'isAKeyDown',
        68: 'isDKeyDown',
        87: 'isWKeyDown',
        83: 'isSKeyDown',
        37: 'isLeftArrowKeyDown',
        39: 'isRightArrowKeyDown',
        38: 'isUpArrowKeyDown',
        40: 'isDownArrowKeyDown'
    },

    buttonPress: function (event) { this[this.mapping[event.keyCode]] = true },
    buttonRelease: function (event) { this[this.mapping[event.keyCode]] = false },

    initializePlayersControlsListening: function () {
        window.addEventListener('keydown', function (event) { controls.buttonPress(event) }, false);
        window.addEventListener('keyup', function (event) { controls.buttonRelease(event) }, false);
    }
};