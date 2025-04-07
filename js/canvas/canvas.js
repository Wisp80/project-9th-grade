'use strict';
export const canvas = document.getElementsByClassName('canvas-one')[0];
export const ctx = canvas.getContext('2d');

export const canvasData = {
    canvasWidth: 1600,
    canvasHeight: 900,
    cellWidth: 25,
    cellHeight: 25,
    cells: []
};