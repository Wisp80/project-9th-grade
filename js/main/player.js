'use strict';
import { controls } from './controls.js';
import { canvasData, ctx } from '../canvas/canvas.js';
import { createBullet } from './bullet.js';
import { rocks } from './rock.js';
import { puddles } from './puddle.js';
import { mathHelper } from '../helpers/mathHelper.js';

class Player {
    constructor(
        x, y,
        width, height,
        speed,
        bulletWidth, bulletHeight, bulletColor,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.slowed = false;
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
        let currentSpeed;
        if (this.slowed) {
            currentSpeed = this.speed * 0.5;
        } else {
            currentSpeed = this.speed;
        };

        if (controls.isDKeyDown) { this.currentSpeedX = currentSpeed };
        if (controls.isAKeyDown) { this.currentSpeedX = -1 * currentSpeed };
        if (controls.isSKeyDown) { this.currentSpeedY = currentSpeed };
        if (controls.isWKeyDown) { this.currentSpeedY = -1 * currentSpeed };

        if (controls.isWKeyDown && controls.isDKeyDown) {
            // Нормализация вектора скорости
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;

            // Ожидаемая скорость пули, среднее между двумя скоростями.
            const expectedSpeed = currentSpeed;

            // Умножаем нормализованный вектор на скорость
            this.currentSpeedX = normalizedCurrentSpeedX * expectedSpeed;
            this.currentSpeedY = -1 * normalizedCurrentSpeedY * expectedSpeed;
        };

        if (controls.isDKeyDown && controls.isSKeyDown) {
            // Нормализация вектора скорости
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;

            // Ожидаемая скорость пули, среднее между двумя скоростями.
            const expectedSpeed = currentSpeed;

            // Умножаем нормализованный вектор на скорость
            this.currentSpeedX = normalizedCurrentSpeedX * expectedSpeed;
            this.currentSpeedY = normalizedCurrentSpeedY * expectedSpeed;
        };

        if (controls.isSKeyDown && controls.isAKeyDown) {
            // Нормализация вектора скорости
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;

            // Ожидаемая скорость пули, среднее между двумя скоростями.
            const expectedSpeed = currentSpeed;

            // Умножаем нормализованный вектор на скорость
            this.currentSpeedX = -1 * normalizedCurrentSpeedX * expectedSpeed;
            this.currentSpeedY = normalizedCurrentSpeedY * expectedSpeed;
        };

        if (controls.isAKeyDown && controls.isWKeyDown) {
            // Нормализация вектора скорости
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;

            // Ожидаемая скорость пули, среднее между двумя скоростями.
            const expectedSpeed = currentSpeed;

            // Умножаем нормализованный вектор на скорость
            this.currentSpeedX = -1 * normalizedCurrentSpeedX * expectedSpeed;
            this.currentSpeedY = -1 * normalizedCurrentSpeedY * expectedSpeed;
        };

        if ((controls.isDKeyDown && controls.isAKeyDown) || (!controls.isAKeyDown && !controls.isDKeyDown)) {
            this.currentSpeedX = 0;
        };

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

        const makeOneShot = (
            x, y,
            width, height,
            color,
            currentSpeedX, currentSpeedY,
            owner
        ) => {
            createBullet(
                x, y,
                width, height,
                color,
                currentSpeedX, currentSpeedY,
                owner
            );

            this.shotRecently = true;

            let setTimeoutID = setTimeout(
                () => {
                    this.shotRecently = false;
                    clearTimeout(setTimeoutID);
                },
                this.shootDelay
            );

            return;
        };

        if (controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + this.width, this.y - this.bulletHeight,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, -1 * this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + this.width, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x - this.bulletWidth, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x - this.bulletWidth, this.y - this.bulletHeight,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, -1 * this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isUpArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + (this.height / 2) - this.bulletWidth / 2, this.y,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                0, -1 * this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isRightArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + this.width, this.y + (this.height / 2) - this.bulletHeight / 2,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                this.bulletSpeedX, 0,
                this.bulletOwner
            );
        };

        if (controls.isDownArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + (this.height / 2) - this.bulletWidth / 2, this.y + this.height,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                0, this.bulletSpeedY,
                this.bulletOwner
            );
        };

        if (controls.isLeftArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x, this.y + (this.height / 2) - this.bulletHeight / 2,
                this.bulletWidth, this.bulletHeight, this.bulletColor,
                -1 * this.bulletSpeedX, 0,
                this.bulletOwner
            );
        };
    };

    processControls() {
        this.processMovingControls();
        this.processShootingControls();
    };

    moveX() {
        /*raw prediction of next X.*/
        let nextX = this.x + this.currentSpeedX;
        /*if our raw prediction of next X has changed or not.*/
        let isPredictedXChanged = false;

        /*if we have any X-movement.*/
        if (this.currentSpeedX !== 0) {
            /*in order to prevent from teleportation through objects we check if our speed is greater than our width.*/
            if (Math.abs(this.currentSpeedX) > this.width) {
                /*variable for our predicted way to the right.*/
                let predictedHorizontalWayToTheRightVertices = null;
                /*variable for our predicted way to the left.*/
                let predictedHorizontalWayToTheLeftVertices = null;

                /*if we move to the right, we prepare data about the way we are going to make.*/
                if (this.currentSpeedX > 0) {
                    predictedHorizontalWayToTheRightVertices = [
                        { x: this.x + this.width, y: this.y },
                        { x: this.x + this.width + this.currentSpeedX, y: this.y },
                        { x: this.x + this.width + this.currentSpeedX, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height }
                    ];
                };

                /*if we move to the left, we prepare data about the way we are going to make.*/
                if (this.currentSpeedX < 0) {
                    predictedHorizontalWayToTheLeftVertices = [
                        { x: this.x - Math.abs(this.currentSpeedX), y: this.y },
                        { x: this.x, y: this.y },
                        { x: this.x, y: this.y + this.height },
                        { x: this.x - Math.abs(this.currentSpeedX), y: this.y + this.height }
                    ];
                };

                /*choose one of the predicted ways.*/
                let chosenPredictedWayVertices = predictedHorizontalWayToTheRightVertices
                    ? predictedHorizontalWayToTheRightVertices
                    : predictedHorizontalWayToTheLeftVertices;

                for (let i = 0; i < rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(chosenPredictedWayVertices, rocks[i].vertices)) {
                        for (let j = 0; j < chosenPredictedWayVertices.length; j++) {
                            chosenPredictedWayVertices[j].x -= Math.sign(this.currentSpeedX);
                        };

                        isPredictedXChanged = true;
                    };
                };

                nextX = predictedHorizontalWayToTheRightVertices
                    ? predictedHorizontalWayToTheRightVertices[1].x - this.width
                    : predictedHorizontalWayToTheLeftVertices[0].x;
            };

            /*if we have not changed our raw prediction of next X yet.*/
            if (!isPredictedXChanged) {
                /*predict our position.*/
                const predictedHorizontalPositionVertices = [
                    { x: this.x + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y + this.height },
                    { x: this.x + this.currentSpeedX, y: this.y + this.height },
                ];

                for (let i = 0; i < rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedHorizontalPositionVertices, rocks[i].vertices)) {
                        for (let j = 0; j < predictedHorizontalPositionVertices.length; j++) {
                            predictedHorizontalPositionVertices[j].x -= Math.sign(this.currentSpeedX);
                        };

                        isPredictedXChanged = true;
                    };
                };

                nextX = predictedHorizontalPositionVertices[0].x;
            };
        };

        /*if we have changed our raw prediction of next X, then it means that we hit a solid object, so we need to stop.*/
        if (isPredictedXChanged) { this.currentSpeedX = 0 };

        if (nextX < 0) { nextX = 0 };
        if (nextX + this.width > canvasData.canvasWidth) { nextX = canvasData.canvasWidth - this.width };

        this.x = nextX;
    };

    moveY() {
        let nextY = this.y + this.currentSpeedY;
        let isPredictedYChanged = false;

        if (this.currentSpeedY !== 0) {
            if (Math.abs(this.currentSpeedY) > this.height) {
                let predictedVerticalWayDownVertices = null;
                let predictedVerticalWayUpVertices = null;

                if (this.currentSpeedY > 0) {
                    predictedVerticalWayDownVertices = [
                        { x: this.x, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height + this.currentSpeedY },
                        { x: this.x, y: this.y + this.height + this.currentSpeedY }
                    ];
                };

                if (this.currentSpeedY < 0) {
                    predictedVerticalWayUpVertices = [
                        { x: this.x, y: this.y - Math.abs(this.currentSpeedY) },
                        { x: this.x + this.width, y: this.y - Math.abs(this.currentSpeedY) },
                        { x: this.x + this.width, y: this.y },
                        { x: this.x, y: this.y }
                    ];
                };

                /*choose one of the predicted ways.*/
                let chosenPredictedWayVertices = predictedVerticalWayDownVertices
                    ? predictedVerticalWayDownVertices
                    : predictedVerticalWayUpVertices;

                for (let i = 0; i < rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(chosenPredictedWayVertices, rocks[i].vertices)) {
                        for (let j = 0; j < chosenPredictedWayVertices.length; j++) {
                            chosenPredictedWayVertices[j].y -= Math.sign(this.currentSpeedY);
                        };

                        isPredictedYChanged = true;
                    };
                };

                nextY = predictedVerticalWayDownVertices
                    ? predictedVerticalWayDownVertices[3].y - this.height
                    : predictedVerticalWayUpVertices[0].y;
            };

            /*if we have not changed our raw prediction of next X yet.*/
            if (!isPredictedYChanged) {
                /*predict our position.*/
                const predictedVerticalPositionVertices = [
                    { x: this.x, y: this.y + this.currentSpeedY },
                    { x: this.x + this.width, y: this.y + this.currentSpeedY },
                    { x: this.x + this.width, y: this.y + this.currentSpeedY + this.height },
                    { x: this.x, y: this.y + this.currentSpeedY + this.height }
                ];

                for (let i = 0; i < rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedVerticalPositionVertices, rocks[i].vertices)) {
                        for (let j = 0; j < predictedVerticalPositionVertices.length; j++) {
                            predictedVerticalPositionVertices[j].y -= Math.sign(this.currentSpeedY);
                        };

                        isPredictedYChanged = true;
                    };
                };

                nextY = predictedVerticalPositionVertices[0].y;
            };
        };

        /*if we have changed our raw prediction of next X, then it means that we hit a solid object, so we need to stop.*/
        if (isPredictedYChanged) { this.currentSpeedY = 0 };

        if (nextY < 0) { nextY = 0 };
        if (nextY + this.height > canvasData.canvasHeight) { nextY = canvasData.canvasHeight - this.height };

        this.y = nextY;
    };

    move() {
        this.moveX();
        this.moveY();

        const playerVertices = [
            { x: this.x, y: this.y },
            { x: this.x + this.width, y: this.y },
            { x: this.x + this.width, y: this.y + this.height },
            { x: this.x, y: this.y + this.height }
        ];

        for (let i = 0; i < puddles.length; i++) {
            if (mathHelper.doTwoPolygonsIntersect(playerVertices, puddles[i].vertices)) {
                this.slowed = true;
                return;
            };
        };

        this.slowed = false;
    };

    draw() {
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

export const players = {
    playerOne: new Player(
        100, 400,
        50, 50,
        10,
        10, 10, '#00ffea',
        15, 15, 300,
        'player'
    )
};