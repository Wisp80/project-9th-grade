'use strict';
import { ctx, canvasData } from '../canvas/canvas.js';
import { graphicsHelper } from './graphicsHelper.js';

function drawNotRotatedRectangle() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(canvasData.canvasWidth / 4, canvasData.canvasHeight / 4);
    ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight / 4);

    ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.75);
    ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.75);
    ctx.lineTo(canvasData.canvasWidth / 4, canvasData.canvasHeight * 0.75);
    ctx.closePath();
    ctx.stroke();
};

function drawRotatedRectangle() {
    const centerX = canvasData.canvasWidth / 2;
    const centerY = canvasData.canvasHeight / 2;
    const size = Math.min(canvasData.canvasWidth, canvasData.canvasHeight) * 0.25;

    /*Сохраняем текущее состояние контекста.*/
    ctx.save();

    /*Переносим начало координат в центр квадрата.*/
    ctx.translate(centerX, centerY);

    /*Поворачиваем контекст на 30 градусов.*/
    ctx.rotate(30 * Math.PI / 180);

    /*Рисуем квадрат относительно нового центра.*/
    ctx.beginPath();
    ctx.rect(-size, -size, size * 2, size * 2);
    ctx.closePath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.stroke();

    /*Рисуем квадрат относительно нового центра.*/
    ctx.restore();
};

function draw003() {
    const delay = 1000;
    const lineWidth = 3;
    const strokeStyle = 'rgba(0, 0, 0, 1)';

    function drawStep001() {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight / 4);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight / 4);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth * 0.75, 0);
        ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight * 0.75);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight * 0.75);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth / 4, 0);
        ctx.lineTo(canvasData.canvasWidth / 4, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep002() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth, canvasData.canvasHeight * 0.75);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight / 4);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight / 4);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep003() {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(0, 0, canvasData.canvasWidth * 0.75, canvasData.canvasHeight);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth * 0.75, 0);
        ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep004() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.75);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.75);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight / 4);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight / 4);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth * 0.75, 0);
        ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep005() {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.fillRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight * 0.75);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight * 0.75);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight * 0.75);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep006() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.5);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.5);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.fillRect(0, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.75, canvasData.canvasHeight * 0.5);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight / 4);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight / 4);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth * 0.75, 0);
        ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight * 0.75);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight * 0.75);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep007() {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(canvasData.canvasWidth / 4, 0, canvasData.canvasWidth * 0.75, canvasData.canvasHeight);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth / 4, 0);
        ctx.lineTo(canvasData.canvasWidth / 4, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();
    };

    function drawStep008() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(canvasData.canvasWidth / 4, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.5, canvasData.canvasHeight * 0.5);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(canvasData.canvasWidth / 4, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.5, canvasData.canvasHeight * 0.5);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.fillRect(canvasData.canvasWidth / 4, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.5, canvasData.canvasHeight * 0.5);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(canvasData.canvasWidth / 4, canvasData.canvasHeight / 4, canvasData.canvasWidth * 0.5, canvasData.canvasHeight * 0.5);

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight / 4);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight / 4);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth * 0.75, 0);
        ctx.lineTo(canvasData.canvasWidth * 0.75, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvasData.canvasHeight * 0.75);
        ctx.lineTo(canvasData.canvasWidth, canvasData.canvasHeight * 0.75);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasData.canvasWidth / 4, 0);
        ctx.lineTo(canvasData.canvasWidth / 4, canvasData.canvasHeight);
        ctx.closePath();
        ctx.stroke();
    };

    setTimeout(
        () => {
            graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
            graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
            drawStep001();

            setTimeout(
                () => {
                    graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                    graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                    drawStep002();

                    setTimeout(
                        () => {
                            graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                            graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                            drawStep003();

                            setTimeout(
                                () => {
                                    graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                                    graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                                    drawStep004();

                                    setTimeout(
                                        () => {
                                            graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                                            graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                                            drawStep005();

                                            setTimeout(
                                                () => {
                                                    graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                                                    graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                                                    drawStep006();

                                                    setTimeout(
                                                        () => {
                                                            graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                                                            graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                                                            drawStep007();

                                                            setTimeout(
                                                                () => {
                                                                    graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
                                                                    graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
                                                                    drawStep008();
                                                                }, delay
                                                            );
                                                        }, delay
                                                    );
                                                }, delay
                                            );
                                        }, delay
                                    );
                                }, delay
                            );
                        }, delay
                    );
                }, delay
            );
        }, delay
    );
};

function drawRayMethod001() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 8 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(3 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(0, 255, 76, 1)';
    ctx.fillRect(5 * canvasData.cellWidth - 11, 8 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(13 * canvasData.cellWidth - 15, 8 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod002() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(14 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 8 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(14 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod003() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(8 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 8 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(8 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(0, 255, 76, 1)';
    ctx.fillRect(13 * canvasData.cellWidth - 15, 8 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod004() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(3 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(0, 255, 76, 1)';
    ctx.fillRect(10 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod005() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(7 * canvasData.cellWidth, 5 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 5 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(7 * canvasData.cellWidth - 4, 5 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(0, 255, 76, 1)';
    ctx.fillRect(7 * canvasData.cellWidth - 2.5, 5 * canvasData.cellHeight - 2.5, 5, 5);
    ctx.fillRect(11 * canvasData.cellWidth - 4, 5 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod006() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 14 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 5 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(3 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(0, 255, 76, 1)';
    ctx.fillRect(5 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(9 * canvasData.cellWidth - 8, 12 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(11 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4, 8, 8);
};

function drawRayMethod007() {
    const vertices = [
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 10 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.151)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(67, 23, 189, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(canvasData.canvasWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(3 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);

    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(0, 255, 76, 1)';
    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();
};

function drawTwoPolygons001() {
    const vertices01 = [
        { x: 6 * canvasData.cellWidth, y: 3 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 2 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 3 * canvasData.cellHeight },
        { x: 12 * canvasData.cellWidth, y: 1 * canvasData.cellHeight },
        { x: 15 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 12 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
    ];

    const vertices02 = [
        { x: 2 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 8 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 11 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 15 * canvasData.cellHeight },
        { x: 3 * canvasData.cellWidth, y: 14 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices01, 3, 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 0, 0.3)');
    graphicsHelper.drawPolygonFromVertices(ctx, vertices02, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 255, 0.3)');
};

function drawTwoPolygons002() {
    const vertices01 = [
        { x: 6 * canvasData.cellWidth, y: 3 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 2 * canvasData.cellHeight },
        { x: 11 * canvasData.cellWidth, y: 3 * canvasData.cellHeight },
        { x: 12 * canvasData.cellWidth, y: 1 * canvasData.cellHeight },
        { x: 15 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 12 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 8 * canvasData.cellWidth, y: 10 * canvasData.cellHeight },
    ];

    const vertices02 = [
        { x: 2 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 8 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 13 * canvasData.cellWidth, y: 11 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 15 * canvasData.cellHeight },
        { x: 3 * canvasData.cellWidth, y: 14 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices01, 3, 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 0, 0.3)');
    graphicsHelper.drawPolygonFromVertices(ctx, vertices02, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 255, 0.3)');
};

function drawTwoPolygons003() {
    const vertices01 = [
        { x: 2 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 6 * canvasData.cellWidth, y: 1 * canvasData.cellHeight },
        { x: 9 * canvasData.cellWidth, y: 2 * canvasData.cellHeight },
        { x: 15 * canvasData.cellWidth, y: 8 * canvasData.cellHeight },
        { x: 12 * canvasData.cellWidth, y: 15 * canvasData.cellHeight },
        { x: 8 * canvasData.cellWidth, y: 14 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 15 * canvasData.cellHeight },
    ];

    const vertices02 = [
        { x: 3 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 5 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 4 * canvasData.cellHeight },
        { x: 14 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 8 * canvasData.cellWidth, y: 13 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices01, 3, 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 0, 0.3)');
    graphicsHelper.drawPolygonFromVertices(ctx, vertices02, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 255, 0.3)');
};

function drawTwoPolygons004() {
    const vertices01 = [
        { x: 3 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 5 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 4 * canvasData.cellHeight },
        { x: 14 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 8 * canvasData.cellWidth, y: 13 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
    ];

    const vertices02 = [
        { x: 3 * canvasData.cellWidth, y: 7 * canvasData.cellHeight },
        { x: 5 * canvasData.cellWidth, y: 5 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 6 * canvasData.cellHeight },
        { x: 7 * canvasData.cellWidth, y: 4 * canvasData.cellHeight },
        { x: 14 * canvasData.cellWidth, y: 9 * canvasData.cellHeight },
        { x: 8 * canvasData.cellWidth, y: 13 * canvasData.cellHeight },
        { x: 4 * canvasData.cellWidth, y: 12 * canvasData.cellHeight },
    ];

    graphicsHelper.drawPolygonFromVertices(ctx, vertices01, 3, 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 0, 0.3)');
    graphicsHelper.drawPolygonFromVertices(ctx, vertices02, 3, 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 255, 0.3)');
};

function drawCrossProduct001() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(4 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(4 * canvasData.cellWidth - 4, 4 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillText('P', 3 * canvasData.cellWidth, 4 * canvasData.cellHeight);
};

function drawCrossProduct002() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(12 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillText('P', 12 * canvasData.cellWidth + 6, 12 * canvasData.cellHeight);
};

function drawCrossProduct003() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(8 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(2 * canvasData.cellWidth - 4, 14 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(14 * canvasData.cellWidth - 4, 2 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillText('P', 7 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.fillText('P', 1 * canvasData.cellWidth, 14 * canvasData.cellHeight);
    ctx.fillText('P', 13 * canvasData.cellWidth, 2 * canvasData.cellHeight);
};

function drawDotProduct001() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(7 * canvasData.cellWidth, 5 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 5 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.fillText('B', 10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.fillText('P', 6 * canvasData.cellWidth, 5 * canvasData.cellHeight);
};

function drawDotProduct002() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(7 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 5 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.fillText('B', 10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.fillText('P', 7 * canvasData.cellWidth, 15 * canvasData.cellHeight);
};

function drawDotProduct003() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(6 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 14 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 5 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.fillText('B', 10 * canvasData.cellWidth, 6 * canvasData.cellHeight);
    ctx.fillText('P', 10 * canvasData.cellWidth, 14 * canvasData.cellHeight);
};

function drawPointOnLineSegment() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 255, 13, 1)';
    ctx.fillRect(8 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(2 * canvasData.cellWidth - 4, 14 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(14 * canvasData.cellWidth - 4, 2 * canvasData.cellHeight - 4, 8, 8);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(0, 255, 13, 1)';
    ctx.fillText('P', 7 * canvasData.cellWidth, 8 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillText('P', 1 * canvasData.cellWidth, 14 * canvasData.cellHeight);
    ctx.fillText('P', 13 * canvasData.cellWidth, 2 * canvasData.cellHeight);
};

function drawTwoLineSegmentsIntersect001() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.fillText('C', 3 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.fillText('D', 12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
};

function drawTwoLineSegmentsIntersect002() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(4 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(30, 120, 223, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    ctx.beginPath();
    ctx.moveTo(8 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.fillText('B', 12 * canvasData.cellWidth, 4 * canvasData.cellHeight);
    ctx.fillText('C', 7 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.fillText('D', 12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
};

function drawDiagonalMovement001() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(3 * canvasData.cellWidth, 12 * canvasData.cellHeight, 2 * canvasData.cellWidth, 2 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 2 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4);
};

function drawDiagonalMovement002() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(12 * canvasData.cellWidth, 12 * canvasData.cellHeight, 2 * canvasData.cellWidth, 2 * canvasData.cellHeight);

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 2 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4);
};

function drawDiagonalMovement003() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(12 * canvasData.cellWidth, 1 * canvasData.cellHeight, 2 * canvasData.cellWidth, 2 * canvasData.cellHeight);

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('A', 2 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4);
    ctx.fillText('B', 12 * canvasData.cellWidth + 4, 4 * canvasData.cellHeight);
};

function drawDiagonalMovement004() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(12 * canvasData.cellWidth, 1 * canvasData.cellHeight, 2 * canvasData.cellWidth, 2 * canvasData.cellHeight);

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(223, 117, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(223, 210, 30, 1)';
    ctx.font = '30px serif';
    ctx.fillText('5', 7.5 * canvasData.cellWidth, 13 * canvasData.cellHeight);
    ctx.fillText('5', 12 * canvasData.cellWidth + 4, 7.5 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(223, 117, 30, 1)';
    ctx.fillText('7,07', 6 * canvasData.cellWidth + 4, 6.5 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.fillText('A', 2 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4);
    ctx.fillText('B', 12 * canvasData.cellWidth + 4, 4 * canvasData.cellHeight);
};

function drawDiagonalMovement005() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(12 * canvasData.cellWidth, 1 * canvasData.cellHeight, 2 * canvasData.cellWidth, 2 * canvasData.cellHeight);

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(223, 210, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(12 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(223, 117, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(37, 223, 30, 1)';
    ctx.lineWidth = 3;
    ctx.arc(3 * canvasData.cellWidth, 12 * canvasData.cellHeight, 9 * canvasData.cellWidth, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(37, 223, 30, 1)';
    ctx.beginPath();
    ctx.moveTo(3 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(9.3 * canvasData.cellWidth, 5.7 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(223, 210, 30, 1)';
    ctx.font = '30px serif';
    ctx.fillText('5', 7.5 * canvasData.cellWidth, 13 * canvasData.cellHeight);
    ctx.fillText('5', 12 * canvasData.cellWidth + 4, 7.5 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(223, 117, 30, 1)';
    ctx.fillText('7,07', 6 * canvasData.cellWidth + 4, 6.5 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.fillText('A', 2 * canvasData.cellWidth, 12 * canvasData.cellHeight - 4);
    ctx.fillText('B', 12 * canvasData.cellWidth + 4, 4 * canvasData.cellHeight);
};

function drawPolygonVertices() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(2 * canvasData.cellWidth, 2 * canvasData.cellHeight, 12 * canvasData.cellWidth, 12 * canvasData.cellHeight);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(224, 214, 202, 1)';

    ctx.beginPath();
    ctx.moveTo(8 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(8 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillRect(9 * canvasData.cellWidth - 4, 3 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(12 * canvasData.cellWidth - 4, 5 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(13 * canvasData.cellWidth - 4, 7 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(11 * canvasData.cellWidth - 4, 10 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(10 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(9 * canvasData.cellWidth - 4, 13 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(6 * canvasData.cellWidth - 4, 12 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(5 * canvasData.cellWidth - 4, 9 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(2 * canvasData.cellWidth - 4, 8 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(3 * canvasData.cellWidth - 4, 7 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(4 * canvasData.cellWidth - 4, 5 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(5 * canvasData.cellWidth - 4, 3 * canvasData.cellHeight - 4, 8, 8);
    ctx.fillRect(7 * canvasData.cellWidth - 4, 2 * canvasData.cellHeight - 4, 8, 8);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(221, 19, 19, 1)';
    ctx.beginPath();
    ctx.moveTo(9 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.lineTo(12 * canvasData.cellWidth, 5 * canvasData.cellHeight);
    ctx.lineTo(13 * canvasData.cellWidth, 7 * canvasData.cellHeight);
    ctx.lineTo(11 * canvasData.cellWidth, 10 * canvasData.cellHeight);
    ctx.lineTo(10 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(9 * canvasData.cellWidth, 13 * canvasData.cellHeight);
    ctx.lineTo(6 * canvasData.cellWidth, 12 * canvasData.cellHeight);
    ctx.lineTo(5 * canvasData.cellWidth, 9 * canvasData.cellHeight);
    ctx.lineTo(2 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(3 * canvasData.cellWidth, 7 * canvasData.cellHeight);
    ctx.lineTo(4 * canvasData.cellWidth, 5 * canvasData.cellHeight);
    ctx.lineTo(5 * canvasData.cellWidth, 3 * canvasData.cellHeight);
    ctx.lineTo(7 * canvasData.cellWidth, 2 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('I', 13 * canvasData.cellWidth + 7, 3 * canvasData.cellHeight);
    ctx.fillText('II', 13 * canvasData.cellWidth + 2, 14 * canvasData.cellHeight - 5);
    ctx.fillText('III', 2 * canvasData.cellWidth + 3, 14 * canvasData.cellHeight - 5);
    ctx.fillText('IV', 2 * canvasData.cellWidth + 3, 3 * canvasData.cellHeight);

    ctx.fillStyle = 'rgba(255, 166, 0, 1)';
    ctx.fillText('3', 9 * canvasData.cellWidth + 7, 7 * canvasData.cellHeight - 3);
    ctx.fillText('3', 9 * canvasData.cellWidth + 7, 10 * canvasData.cellHeight - 3);
    ctx.fillText('3', 6 * canvasData.cellWidth + 7, 10 * canvasData.cellHeight - 3);
    ctx.fillText('4', 6 * canvasData.cellWidth + 7, 7 * canvasData.cellHeight - 3);
};

function drawAxis001() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(1 * canvasData.cellWidth, 1 * canvasData.cellHeight, 14 * canvasData.cellWidth, 14 * canvasData.cellHeight);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(224, 214, 202, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';

    ctx.beginPath();
    ctx.moveTo(14 * canvasData.cellWidth, 0.5 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(14 * canvasData.cellWidth, 1.5 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0.5 * canvasData.cellWidth, 14 * canvasData.cellHeight);
    ctx.lineTo(1 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.lineTo(1.5 * canvasData.cellWidth, 14 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('X', 14 * canvasData.cellWidth, 2.5 * canvasData.cellHeight);
    ctx.fillText('Y', 2 * canvasData.cellWidth - 7, 15 * canvasData.cellHeight - 4);
    ctx.fillText('(0, 0)', 1 * canvasData.cellWidth + 4, 2 * canvasData.cellHeight + 2);
};

function drawAxis002() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeRect(1 * canvasData.cellWidth, 1 * canvasData.cellHeight, 14 * canvasData.cellWidth, 14 * canvasData.cellHeight);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(224, 214, 202, 1)';

    ctx.beginPath();
    ctx.moveTo(1 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(8 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(8 * canvasData.cellWidth, 15 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';

    ctx.beginPath();
    ctx.moveTo(14 * canvasData.cellWidth, 7.5 * canvasData.cellHeight);
    ctx.lineTo(15 * canvasData.cellWidth, 8 * canvasData.cellHeight);
    ctx.lineTo(14 * canvasData.cellWidth, 8.5 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(7.5 * canvasData.cellWidth, 2 * canvasData.cellHeight);
    ctx.lineTo(8 * canvasData.cellWidth, 1 * canvasData.cellHeight);
    ctx.lineTo(8.5 * canvasData.cellWidth, 2 * canvasData.cellHeight);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = 'rgba(224, 214, 202, 1)';
    ctx.font = '30px serif';
    ctx.fillText('X', 14 * canvasData.cellWidth, 7.5 * canvasData.cellHeight - 7);
    ctx.fillText('Y', 8.5 * canvasData.cellWidth + 7, 2 * canvasData.cellHeight);
    ctx.fillText('(0, 0)', 8 * canvasData.cellWidth + 4, 9 * canvasData.cellHeight + 2);
};

// drawNotRotatedRectangle();
// drawRotatedRectangle();
// draw003();
// drawRayMethod001();
// drawRayMethod002();
// drawRayMethod003();
// drawRayMethod004();
// drawRayMethod005();
// drawRayMethod006();
// drawRayMethod007();
// drawTwoPolygons001();
// drawTwoPolygons002();
// drawTwoPolygons003();
// drawTwoPolygons004();
// drawCrossProduct001();
// drawCrossProduct002();
// drawCrossProduct003();
// drawDotProduct001();
// drawDotProduct002();
// drawDotProduct003();
// drawPointOnLineSegment();
// drawTwoLineSegmentsIntersect001();
// drawTwoLineSegmentsIntersect002();
// drawDiagonalMovement001();
// drawDiagonalMovement002();
// drawDiagonalMovement003();
// drawDiagonalMovement004();
// drawDiagonalMovement005();
// drawPolygonVertices();
// drawAxis001();
// drawAxis002();