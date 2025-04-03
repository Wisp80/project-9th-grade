'use strict';
import { canvas, ctx } from '../canvas/canvas.js';
import { enemies } from './enemy.js';
import { mathHelper } from '../helpers/mathHelper.js';

export class Bullet {
    constructor(
        x, y,
        width, height,
        color,
        currentSpeedX, currentSpeedY,
        owner
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.currentSpeedX = currentSpeedX;
        this.currentSpeedY = currentSpeedY;
        this.owner = owner;
        if (currentSpeedX === 0 && currentSpeedY < 0) { this.direction = 'north' };
        if (currentSpeedX > 0 && currentSpeedY < 0) { this.direction = 'north-east' };
        if (currentSpeedX > 0 && currentSpeedY === 0) { this.direction = 'east' };
        if (currentSpeedX > 0 && currentSpeedY > 0) { this.direction = 'south-east' };
        if (currentSpeedX === 0 && currentSpeedY > 0) { this.direction = 'south' };
        if (currentSpeedX < 0 && currentSpeedY > 0) { this.direction = 'south-west' };
        if (currentSpeedX < 0 && currentSpeedY === 0) { this.direction = 'west' };
        if (currentSpeedX < 0 && currentSpeedY < 0) { this.direction = 'north-west' };
    };

    moveX() {
        let nextX = this.x + this.currentSpeedX;
        this.x = nextX;
    };

    moveY() {
        let nextY = this.y + this.currentSpeedY;
        this.y = nextY;
    };

    move() {
        this.moveX();
        this.moveY();

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            bullets.splice(bullets.indexOf(this), 1);
        };

        if (this.owner === 'player') {
            const bulletCenterPoint = { x: this.x + this.width / 2, y: this.y + this.height / 2 };

            for (const key in enemies) {
                if (mathHelper.isPointInsidePolygon(bulletCenterPoint, enemies[key].vertices)) {
                    delete enemies[key];
                    bullets.splice(bullets.indexOf(this), 1);
                };
            };
        };
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + this.width / 2, this.y + this.height / 2, 20, 2);

    };
};

export const bullets = [];