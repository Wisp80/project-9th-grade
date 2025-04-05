'use strict';
import { canvas, ctx } from '../../canvas/canvas.js';
import { mathHelper } from '../../helpers/mathHelper.js';

class Bullet {
    constructor(
        x, y, radius, 
        strokeStyle, lineWidth, fillStyle,
        currentSpeedX, currentSpeedY,
        owner,
        players, enemies, rocks, bullets,
        ID
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.fillStyle = fillStyle;
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
            const length = Math.sqrt(currentSpeedX * currentSpeedX + currentSpeedY * currentSpeedY);
            const normalizedCurrentSpeedX = currentSpeedX / length;
            const normalizedCurrentSpeedY = currentSpeedY / length;
            this.currentSpeedX = normalizedCurrentSpeedX * Math.abs(currentSpeedX);
            this.currentSpeedY = normalizedCurrentSpeedY * Math.abs(currentSpeedY);
        }

        this.players = players;
        this.enemies = enemies;
        this.rocks = rocks;
        this.bullets = bullets;
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
            this.bullets.splice(this.bullets.indexOf(this), 1);
        };

        for (let i = 0; i < this.rocks.length; i++) {
            if (mathHelper.isPointInsidePolygon({ x: this.x, y: this.y }, this.rocks[i].vertices)) {
                this.bullets.splice(this.bullets.indexOf(this), 1);
            };
        };

        if (this.owner === 'player') {
            const bulletCenterPoint = { x: this.x, y: this.y };

            for (const enemy of this.enemies) {
                if (mathHelper.isPointInsidePolygon(bulletCenterPoint, enemy.vertices)) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    this.bullets.splice(this.bullets.indexOf(this), 1);
                };
            };
        };

        if (
            this.owner === 'enemy' && mathHelper.isPointInsideNotRotatedRectangle(
                this.players.playerOne.x, this.players.playerOne.x + this.players.playerOne.width,
                this.players.playerOne.y, this.players.playerOne.y + this.players.playerOne.height,
                this.x, this.y
            )
        ) {
            if (!this.players.playerOne.tookDamageRecently) {
                this.players.playerOne.tookDamageRecently = true;
                this.players.playerOne.loseHealthPoints();

                const setTimeoutID = setTimeout(
                    () => {
                        this.players.playerOne.tookDamageRecently = false;
                        clearTimeout(setTimeoutID)
                    },
                    this.players.playerOne.takeDamageDelay
                );
            };

            this.bullets.splice(this.bullets.indexOf(this), 1);
        };
    };

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // Параметры: x, y, радиус, начальный угол, конечный угол
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    };
};

function generateBulletID(bulletIDs) {
    let bulletID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (bulletIDs.includes(bulletID)) { bulletID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    bulletIDs.push(bulletID);
    return bulletID;
};

export function createBullet(
    x, y, radius, 
    strokeStyle, lineWidth, fillStyle,
    currentSpeedX, currentSpeedY,
    owner,
    players, enemies, rocks, bullets,
    bulletIDs
) {
    bullets.push(new Bullet(
        x, y, radius, 
        strokeStyle, lineWidth, fillStyle,
        currentSpeedX, currentSpeedY,
        owner,
        players, enemies, rocks, bullets,
        generateBulletID(bulletIDs)
    ));
};