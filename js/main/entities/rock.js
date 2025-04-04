'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

class Rock {
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

const rockIDs = [];
export const rocks = [];

function generateRockID() {
    let rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (rockIDs.includes(rockID)) { rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    rockIDs.push(rockID);
    return rockID;
};

export function createRock(
    x, y,
    width, height,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    strokeStyle, fillStyle
) {
    rocks.push(new Rock(
        x, y,
        width, height,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        strokeStyle, fillStyle,
        generateRockID()
    ));
};

createRock(
    300, 350,
    150, 200,
    6, 50, 100,
    'rgba(0, 0, 0, 1)', 'rgba(91, 90, 92, 0.6)'
);

createRock(
    650, 350,
    150, 200,
    6, 50, 100,
    'rgba(0, 0, 0, 1)', 'rgba(91, 90, 92, 0.6)'
);