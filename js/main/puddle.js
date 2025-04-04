'use strict';
import { mathHelper } from '../helpers/mathHelper.js';
import { canvasData, ctx } from '../canvas/canvas.js';
import { graphicsHelper } from '../helpers/graphicsHelper.js';

class Puddle {
    constructor(
        x, y,
        width, height,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        strokeStyle, fillStyle,
        ID
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.numberOfVertices = numberOfVertices;
        this.clockwiseStepX = clockwiseStepX;
        this.clockwiseStepY = clockwiseStepY;

        this.vertices = mathHelper.preparePolygonVerticesData(
            numberOfVertices,
            this.x, this.x + this.width,
            this.y, this.y + this.height,
            this.clockwiseStepX, this.clockwiseStepY,
            canvasData.cellWidth, canvasData.cellHeight,
            true
        );

        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.ID = ID;
    };

    draw() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        graphicsHelper.drawPolygonFromVertices(this.vertices, 1, this.strokeStyle, this.fillStyle);
    };
};

const puddleIDs = [];
export const puddles = [];

function generatePuddleID() {
    let puddleID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (puddleIDs.includes(puddleID)) { puddleID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    puddleIDs.push(puddleID);
    return puddleID;
};

function createPuddle(
    x, y,
    width, height,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    strokeStyle, fillStyle
) {
    puddles.push(new Puddle(
        x, y,
        width, height,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        strokeStyle, fillStyle,
        generatePuddleID()
    ));
};

createPuddle(
    500, 550,
    150, 200,
    6, 50, 100,
    'rgba(0, 0, 0, 1)', 'rgba(128, 18, 238, 0.6)'
);