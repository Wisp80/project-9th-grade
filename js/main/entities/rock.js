'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

class Rock {
    constructor(
        x, y,
        width, height,
        strokeStyle, fillStyle,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        ID
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
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

        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].x <= 75) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x += canvasData.cellWidth * 2 };;
            };

            if (this.vertices[i].x >= canvasData.canvasWidth - 75) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x -= canvasData.cellWidth * 2 };
            };

            if (this.vertices[i].Y <= 75) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y += canvasData.cellHeight * 2 };;
            };

            if (this.vertices[i].y >= canvasData.canvasHeight - 75) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y -= canvasData.cellHeight * 2 };
            };
        };

        this.ID = ID;
    };

    draw() {
        graphicsHelper.drawPolygonFromVertices(this.vertices, 1, this.strokeStyle, this.fillStyle);
    };
};

function generateRockID(rockIDs) {
    let rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (rockIDs.includes(rockID)) { rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    rockIDs.push(rockID);
    return rockID;
};

export function createRock(
    x, y,
    width, height,
    strokeStyle, fillStyle,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    rocks, rockIDs
) {
    rocks.push(new Rock(
        x, y,
        width, height,
        strokeStyle, fillStyle,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        generateRockID(rockIDs)
    ));
};