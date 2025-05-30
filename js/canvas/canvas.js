'use strict';

/*Создаем объект холста на основе элемента "canvas" с классом "canvas-one" и сохраняем его в переменную "canvas".*/
export const canvas = document.getElementsByClassName('canvas-one')[0];
/*Создаем 2D контекст на основе объекта холста и сохраняем его в переменную "ctx".*/
export const ctx = canvas.getContext('2d');

/*Создаем объект, свойства которого содержат данные о холсте.*/
export const canvasData = {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    cellWidth: 25,
    cellHeight: 25
};