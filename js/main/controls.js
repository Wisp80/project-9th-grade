'use strict';

/*Объект "controls" представляет из себя объект, обрабатывающий нажатие и отжатие кнопок управления в игре.*/
export const controls = {
    /*Свойство "isAKeyDown" нужно для определения нажата ли сейчас кнопка "A" или нет.*/
    isAKeyDown: false,
    /*Свойство "isDKeyDown" нужно для определения нажата ли сейчас кнопка "D" или нет.*/
    isDKeyDown: false,
    /*Свойство "isWKeyDown" нужно для определения нажата ли сейчас кнопка "W" или нет.*/
    isWKeyDown: false,
    /*Свойство "isSKeyDown" нужно для определения нажата ли сейчас кнопка "S" или нет.*/
    isSKeyDown: false,
    /*Свойство "isLeftArrowKeyDown" нужно для определения нажата ли сейчас кнопка стрелки влево или нет.*/
    isLeftArrowKeyDown: false,
    /*Свойство "isRightArrowKeyDown" нужно для определения нажата ли сейчас кнопка стрелки вправо или нет.*/
    isRightArrowKeyDown: false,
    /*Свойство "isUpArrowKeyDown" нужно для определения нажата ли сейчас кнопка стрелки вверх или нет.*/
    isUpArrowKeyDown: false,
    /*Свойство "isDownArrowKeyDown" нужно для определения нажата ли сейчас кнопка стрелки вниз или нет.*/
    isDownArrowKeyDown: false,

    /*Свойство "mapping" нужно для хранения объекта, в котором ключи, в виде кодов кнопок, сопоставляются со значениями,
    в виде названий свойств, указывающих нажата ли какая-то кнопка или нет.*/
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

    /*Метод "buttonPress()" является callback-функцией, которая при вызове устанавливает, что нажата какая-то кнопка, 
    путем установления одного из свойств, отвечающих за указание нажата ли какая-то кнопка или нет, как true.
    
    Метод "buttonPress()" принимает следующие параметры:
    1. "event" - это числовой параметр, указывающий код нажатой кнопки.
    
    Метод "buttonPress()" ничего не возвращает.*/
    buttonPress: function (event) { this[this.mapping[event.keyCode]] = true },

    /*Метод "buttonRelease()" является callback-функцией, которая при вызове устанавливает, что отжата какая-то кнопка, 
    путем установления одного из свойств, отвечающих за указание нажата ли какая-то кнопка или нет, как false.
    
    Метод "buttonRelease()" принимает следующие параметры:
    1. "event" - это числовой параметр, указывающий код отжатой кнопки.
    
    Метод "buttonRelease()" ничего не возвращает.*/
    buttonRelease: function (event) { this[this.mapping[event.keyCode]] = false },

    /*Метод "initializePlayersControlsListening()" подписывает методы "buttonPress()" и "buttonRelease()" на события
    нажатия кнопок и отжатия кнопок соответственно.
    Метод "initializePlayersControlsListening()" не принимает никаких параметров.
    Метод "initializePlayersControlsListening()" ничего не возвращает.*/
    initializePlayersControlsListening: function () {
        window.addEventListener('keydown', function (event) { controls.buttonPress(event) }, false);
        window.addEventListener('keyup', function (event) { controls.buttonRelease(event) }, false);
    }
};