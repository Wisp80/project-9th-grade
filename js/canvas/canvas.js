'use strict';

export const canvas = document.getElementsByClassName('canvas-one')[0];
export const ctx = canvas.getContext('2d');

export const canvasData = {
    canvasWidth: 1600,
    canvasHeight: 900,
    cellWidth: 25,
    cellHeight: 25,
    cells: [],

    getCellsData: function() {
        for (let i = 0; i < canvas.width; i += canvasData.cellWidth) {
            for (let j = 0; j < canvas.height; j += canvasData.cellHeight) {
                canvasData.cells.push(
                    {
                        x: i,
                        y: j,
                        width: canvasData.cellWidth,
                        height: canvasData.cellHeight,
                        id: `${i / 10}-${j / 10}`
                    }
                );
            };
        };
    
        console.log('cells');
        console.log(canvasData.cells);
        console.log('--------------------------------------');
    }
};