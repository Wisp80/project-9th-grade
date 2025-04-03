'use strict';
import { controls } from './controls.js';
import { ctx } from '../canvas/canvas.js';
import { Bullet, bullets } from './bullet.js';

class Player {
    constructor(
        x, y,
        width, height,
        bulletWidth, bulletHeight, bulletColor,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentSpeedX = 0;
        this.currentSpeedY = 0;
        this.bulletWidth = bulletWidth;
        this.bulletHeight = bulletHeight;
        this.bulletColor = bulletColor;
        this.bulletSpeedX = bulletSpeedX;
        this.bulletSpeedY = bulletSpeedY;
        this.shootDelay = shootDelay;
        this.bulletOwner = bulletOwner;
        this.shotRecently = false;
    };

    processMovingControls() {
        if (controls.isDKeyDown) { this.currentSpeedX = 10 };
        if (controls.isAKeyDown) { this.currentSpeedX = -10 };

        if ((controls.isDKeyDown && controls.isAKeyDown) || (!controls.isAKeyDown && !controls.isDKeyDown)) {
            this.currentSpeedX = 0;
        };

        if (controls.isSKeyDown) { this.currentSpeedY = 10 };
        if (controls.isWKeyDown) { this.currentSpeedY = -10 };

        if ((controls.isSKeyDown && controls.isWKeyDown) || (!controls.isSKeyDown && !controls.isWKeyDown)) {
            this.currentSpeedY = 0;
        };
    };

    processShootingControls() {
        if (controls.isUpArrowKeyDown && controls.isDownArrowKeyDown ||
            controls.isRightArrowKeyDown && controls.isLeftArrowKeyDown ||
            controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && controls.isDownArrowKeyDown ||
            controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown ||
            controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown ||
            controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown && controls.isRightArrowKeyDown ||
            controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown
        ) {
            return;
        };

        if (controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x + this.width, this.y - this.bulletHeight,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, -1 * this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x + this.width, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x - this.bulletWidth, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x - this.bulletWidth, this.y - this.bulletHeight,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, -1 * this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isUpArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x + (this.height / 2) - this.bulletWidth / 2, this.y,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                0, -1 * this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isRightArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x + this.width, this.y + (this.height / 2) - this.bulletHeight / 2,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, 0,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isDownArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x + (this.height / 2) - this.bulletWidth / 2, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                0, this.bulletSpeedY,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };

        if (controls.isLeftArrowKeyDown && !this.shotRecently) {
            bullets.push(new Bullet(
                this.x, this.y + (this.height / 2) - this.bulletHeight / 2,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, 0,
                this.bulletOwner
            ));

            this.shotRecently = true;

            setTimeout(
                () => { this.shotRecently = false },
                this.shootDelay
            );

            return;
        };
    };

    processControls() {
        this.processMovingControls();
        this.processShootingControls();
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
    };

    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

export const players = {
    playerOne: new Player(
        100, 250,
        50, 50,
        10, 10,'#00ffea',
        10, 10, 300,
        'player'
    )
};