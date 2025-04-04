'use strict';
import { canvas, ctx } from '../canvas/canvas.js';
import { players } from './player.js';
import { enemies } from './enemy.js';
import { rocks } from './rock.js';
import { mathHelper } from '../helpers/mathHelper.js';

export class Bullet {
    constructor(
        x, y,
        width, height,
        color,
        currentSpeedX, currentSpeedY,
        owner, ID
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.currentSpeedX = currentSpeedX;
        this.currentSpeedY = currentSpeedY;
        this.owner = owner;
        this.ID = ID;
        if (currentSpeedX === 0 && currentSpeedY < 0) { this.direction = 'north' };
        if (currentSpeedX > 0 && currentSpeedY < 0) { this.direction = 'north-east' };
        if (currentSpeedX > 0 && currentSpeedY === 0) { this.direction = 'east' };
        if (currentSpeedX > 0 && currentSpeedY > 0) { this.direction = 'south-east' };
        if (currentSpeedX === 0 && currentSpeedY > 0) { this.direction = 'south' };
        if (currentSpeedX < 0 && currentSpeedY > 0) { this.direction = 'south-west' };
        if (currentSpeedX < 0 && currentSpeedY === 0) { this.direction = 'west' };
        if (currentSpeedX < 0 && currentSpeedY < 0) { this.direction = 'north-west' };

        if (this.direction === 'north-east' ||
            this.direction === 'south-east' ||
            this.direction === 'south-west' ||
            this.direction === 'north-west'
        ) {
            // Нормализация вектора скорости
            const length = Math.sqrt(currentSpeedX * currentSpeedX + currentSpeedY * currentSpeedY);
            const normalizedCurrentSpeedX = currentSpeedX / length;
            const normalizedCurrentSpeedY = currentSpeedY / length;

            // Ожидаемая скорость пули, среднее между двумя скоростями.
            const expectedCurrentSpeed = (Math.abs(currentSpeedX) + Math.abs(currentSpeedY)) / 2;

            // Умножаем нормализованный вектор на скорость
            this.currentSpeedX = normalizedCurrentSpeedX * expectedCurrentSpeed;
            this.currentSpeedY = normalizedCurrentSpeedY * expectedCurrentSpeed;
        }
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

        for (let i = 0; i < rocks.length; i++) {
            if (mathHelper.isPointInsidePolygon({ x: this.x, y: this.y }, rocks[i].vertices)) {
                bullets.splice(bullets.indexOf(this), 1);
            };
        };

        if (this.owner === 'player') {
            const bulletCenterPoint = { x: this.x + this.width / 2, y: this.y + this.height / 2 };

            for (const enemy of enemies) {
                if (mathHelper.isPointInsidePolygon(bulletCenterPoint, enemy.vertices)) {
                    enemies.splice(enemies.indexOf(enemy), 1);
                    bullets.splice(bullets.indexOf(this), 1);
                };
            };
        };

        if (
            this.owner === 'enemy' && mathHelper.isPointInsideNotRotatedRectangle(
                players.playerOne.x, players.playerOne.x + players.playerOne.width,
                players.playerOne.y, players.playerOne.y + players.playerOne.height,
                this.x, this.y
            )
        ) {
            console.log('HIT');
        };
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + this.width / 2, this.y + this.height / 2, 20, 2);
    };
};

const bulletIDs = []
export const bullets = [];

function generateBulletID() {
    let bulletID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (bulletIDs.includes(bulletID)) { bulletID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    bulletIDs.push(bulletID);
    return bulletID;
};

export function createBullet(
    x, y,
    width, height,
    color,
    currentSpeedX, currentSpeedY,
    owner
) {
    bullets.push(new Bullet(
        x, y,
        width, height,
        color,
        currentSpeedX, currentSpeedY,
        owner, generateBulletID()
    ));
};