'use strict';
import { ctx, canvasData } from '../canvas/canvas.js';

export const graphicsHelper = {
    /*Метод "drawPolygonFromVertices()" отрисовывает многоугольник на основе координат вершин.
    
    Метод "drawPolygonFromVertices()" принимает следующие параметры:
    1. "vertices" - это параметр в виде массива объектов, содержащих координаты вершин многоугольника.
    2. "lineWidth" - это числовой параметр, указывающий толщину обводки многоугольника.
    3. "strokeStyle" - это строковой параметр, указывающий стиль обводки многоугольника.
    4. "fillStyle" - это строковой параметр, указывающий стиль заливки многоугольника.
    
    Метод "drawPolygonFromVertices()" ничего не возвращает.*/
    drawPolygonFromVertices: function (vertices, lineWidth, strokeStyle, fillStyle) {
        /*Рассчитываем путь для многоугольника.*/
        ctx.beginPath();
        const region = new Path2D();

        for (let i = 0; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
            region.lineTo(vertices[i].x, vertices[i].y);

            /*Отрисовываем клетки из каждой вершины многоугольника. Это нужно только для тестирования.*/
            // ctx.fillStyle = 'rgb(100, 210, 70)';
            // ctx.fillRect(vertices[i].x, vertices[i].y, canvasData.cellWidth, canvasData.cellHeight);

            /*Отрисовываем вершины многоугольника. Это нужно только для тестирования.*/
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = 'lime';
            // ctx.strokeRect(vertices[i].x, vertices[i].y, canvasData.cellWidth / 5, canvasData.cellHeight / 5);

            /*Отрисовываем номера вершин многоугольника. Это нужно только для тестирования.*/
            ctx.fillStyle = 'black';
            ctx.font = '30px serif';
            ctx.fillText(i + 1, vertices[i].x + 5, vertices[i].y - 5);
        };

        ctx.closePath();

        /*Обводим многоугольник.*/
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();

        region.closePath();

        /*Закрашиваем многоугольник.*/
        ctx.fillStyle = fillStyle;
        ctx.fill(region, 'nonzero');
    },

    /*Метод "clearScreen()" очищает экран.
    Метод "clearScreen()" не принимает никаких параметров.
    Метод "clearScreen()" ничего не возвращает.*/
    clearScreen: function (color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight);
    },

    /*Метод "drawGrid()" отрисовывает сетку.
    Метод "drawGrid()" не принимает никаких параметров.
    Метод "drawGrid()" ничего не возвращает.*/
    drawGrid: function () {
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'black';

        for (let i = 0; i < canvasData.canvasWidth; i += canvasData.cellWidth) {
            for (let j = 0; j < canvasData.canvasHeight; j += canvasData.cellHeight) {
                ctx.strokeRect(i, j, canvasData.cellWidth, canvasData.cellHeight);
            };
        };
    }
};