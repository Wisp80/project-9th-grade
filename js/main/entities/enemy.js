'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';
import { game } from '../game.js';
import { createBullet } from './bullet.js';

class Enemy {
    constructor(
        x, y,
        width, height,
        speed,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, bulletIDs, bullets,
        players, enemies, rocks,
        ID
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(48, 48, 44, 0.6)';
        this.speed = speed;
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

        this.bulletRadius = bulletRadius;
        this.bulletStrokeStyle = bulletStrokeStyle;
        this.bulletLineWidth = bulletLineWidth;
        this.bulletFillStyle = bulletFillStyle;
        this.bulletSpeedX = bulletSpeedX;
        this.bulletSpeedY = bulletSpeedY;
        this.shootDelay = shootDelay;
        this.bulletOwner = bulletOwner;
        this.shotRecently = false;
        this.ID = ID;
        this.players = players;
        this.enemies = enemies;
        this.rocks = rocks;
        this.bulletIDs = bulletIDs;
        this.bullets = bullets;
    };

    moveX() {
        let nextX = this.x + mathHelper.getRandomIntFromInterval(-1 * this.speed, this.speed);
        while (nextX + this.width > canvasData.canvasWidth - 50) { nextX--; };
        while (nextX < 50) { nextX++ };
        this.x = nextX;
    };

    moveY() {
        let nextY = this.y + mathHelper.getRandomIntFromInterval(-1 * this.speed, this.speed);
        while (nextY + this.height > canvasData.canvasHeight - 50) { nextY--; };
        while (nextY < 50) { nextY++ };
        this.y = nextY;
    };

    move() {
        if (game.ticks % 10 === 0) {
            this.moveX();
            this.moveY();

            this.vertices = mathHelper.preparePolygonVerticesData(
                this.numberOfVertices,
                this.x, this.x + this.width,
                this.y, this.y + this.height,
                this.clockwiseStepX, this.clockwiseStepY,
                canvasData.cellWidth, canvasData.cellHeight,
                true
            );
        };
    };

    shoot() {
        const direction = mathHelper.getRandomIntFromInterval(1, 8);

        const makeOneShot = (
            currentSpeedX, currentSpeedY
        ) => {
            createBullet(
                this.x + this.width / 2, this.y + this.height / 2, this.bulletRadius,
                this.bulletStrokeStyle, this.bulletLineWidth, this.bulletFillStyle,
                currentSpeedX, currentSpeedY,
                this.bulletOwner,
                this.players, this.enemies, this.rocks, this.bullets,
                this.bulletIDs
            );

            this.shotRecently = true;

            const setTimeoutID = setTimeout(
                () => {
                    this.shotRecently = false;
                    clearTimeout(setTimeoutID);
                },
                this.shootDelay
            );
        };

        if (!this.shotRecently) {
            switch (direction) {
                case 1: {
                    makeOneShot(this.bulletSpeedX, -1 * this.bulletSpeedY);
                    break;
                }

                case 2: {
                    makeOneShot(this.bulletSpeedX, this.bulletSpeedY);
                    break;
                }

                case 3: {
                    makeOneShot(-1 * this.bulletSpeedX, this.bulletSpeedY);
                    break;
                }

                case 4: {
                    makeOneShot(-1 * this.bulletSpeedX, -1 * this.bulletSpeedY);
                    break;
                }

                case 5: {
                    makeOneShot(0, -1 * this.bulletSpeedY);
                    break;
                }

                case 6: {
                    makeOneShot(this.bulletSpeedX, 0);
                    break;
                }

                case 7: {
                    makeOneShot(0, this.bulletSpeedY);
                    break;
                }

                case 8: {
                    makeOneShot(-1 * this.bulletSpeedX, 0);
                    break;
                }

                default: {
                    break;
                }
            }
        };
    };

    draw() {
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        const colors = [
            'rgb(20, 2, 50, 0.6)',
            'rgba(2, 50, 40, 0.6)',
            'rgba(7, 66, 84, 0.6)',
            'rgba(47, 5, 22, 0.6)',
            'rgba(47, 45, 5, 0.6)',
            'rgba(48, 48, 44, 0.6)'
        ];

        if (game.ticks % 10 === 0) { this.color = colors[mathHelper.getRandomIntFromInterval(0, colors.length - 1)] };

        graphicsHelper.drawPolygonFromVertices(this.vertices, 1, 'yellow', this.color);
    };
};

function generateEnemyID(enemyIDs) {
    let enemyID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (enemyIDs.includes(enemyID)) { enemyID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    enemyIDs.push(enemyID);
    return enemyID;
};

export function createEnemy(
    x, y,
    width, height,
    speed,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
    bulletSpeedX, bulletSpeedY, shootDelay,
    bulletOwner, bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
) {
    enemies.push(new Enemy(
        x, y,
        width, height,
        speed,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, bulletIDs, bullets,
        players, enemies, rocks,
        generateEnemyID(enemyIDs)
    ));
};