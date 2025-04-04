'use strict';
import { mathHelper } from '../helpers/mathHelper.js';
import { game } from './game.js';
import { canvasData, ctx } from '../canvas/canvas.js';
import { graphicsHelper } from '../helpers/graphicsHelper.js';
import { Bullet, bullets } from './bullet.js';

class Enemy {
    constructor(
        x, y,
        width, height,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        bulletWidth, bulletHeight, bulletColor,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, ID
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

        this.bulletWidth = bulletWidth;
        this.bulletHeight = bulletHeight;
        this.bulletColor = bulletColor;
        this.bulletSpeedX = bulletSpeedX;
        this.bulletSpeedY = bulletSpeedY;
        this.shootDelay = shootDelay;
        this.bulletOwner = bulletOwner;
        this.shotRecently = false;
        this.ID = ID;
    };

    moveX() {
        let nextX = this.x + mathHelper.getRandomIntFromInterval(-40, 40);
        while (nextX + this.width > canvasData.canvasWidth - 50) { nextX--; };
        while (nextX < 50) { nextX++ };
        this.x = nextX;
    };

    moveY() {
        let nextY = this.y + mathHelper.getRandomIntFromInterval(-40, 40);
        while (nextY + this.height > canvasData.canvasHeight - 50) { nextY--; };
        while (nextY < 50) { nextY++ };
        this.y = nextY;
    };    

    move() {
        if (game.ticks % 10 === 0) {
            // this.moveX();
            // this.moveY();

            // this.vertices = mathHelper.preparePolygonVerticesData(
            //     this.numberOfVertices,
            //     this.x, this.x + this.width,
            //     this.y, this.y + this.height,
            //     this.clockwiseStepX, this.clockwiseStepY,
            //     canvasData.cellWidth, canvasData.cellHeight,
            //     true
            // );
        }
    };

    shoot() {
        const direction = mathHelper.getRandomIntFromInterval(1, 8);

        if (!this.shotRecently) {
            switch (direction) {
                case 1: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        this.bulletSpeedX, -1 * this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 2: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        this.bulletSpeedX, this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 3: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        -1 * this.bulletSpeedX, this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 4: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        -1 * this.bulletSpeedX, -1 * this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 5: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        0, -1 * this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 6: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        this.bulletSpeedX, 0,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 7: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        0, this.bulletSpeedY,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                case 8: {
                    bullets.push(new Bullet(
                        this.x + this.width / 2, this.y + this.height / 2,
                        this.bulletWidth, this.bulletHeight, this.bulletColor,
                        -1 * this.bulletSpeedX, 0,
                        this.bulletOwner
                    ));

                    this.shotRecently = true;

                    let setTimeoutID = setTimeout(
                        () => { 
                            this.shotRecently = false;
                            clearTimeout(setTimeoutID);
                        },
                        this.shootDelay
                    );

                    break;
                }

                default: {
                    break;
                }
            }
        };
    };

    draw() {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        graphicsHelper.drawPolygonFromVertices(this.vertices, 1, 'yellow', 'rgb(20, 2, 50, 0.6)');
    };
};

const enemyIDs = [];
export const enemies = {};

function generateEnemyID() {
    let enemyID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    while (enemyIDs.includes(enemyID)) { enemyID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    enemyIDs.push(enemyID);
    return enemyID;
};

function addEnemy(
    x, y,
    width, height,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    bulletWidth, bulletHeight, bulletColor,
    bulletSpeedX, bulletSpeedY, shootDelay,
    bulletOwner, ID
) {
    enemies[ID] = new Enemy(
        x, y,
        width, height,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        bulletWidth, bulletHeight, bulletColor,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, ID
    );
};

addEnemy(
    200, 650,
    150, 200,
    6, 50, 100,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(500, 1000),
    'enemy', generateEnemyID()
);

addEnemy(
    300, 200,
    200, 150,
    6, 100, 50,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(250, 1000),
    'enemy', generateEnemyID()
);

addEnemy(
    600, 300,
    150, 200,
    6, 50, 100,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(250, 1000),
    'enemy', generateEnemyID()
);

addEnemy(
    900, 600,
    200, 150,
    6, 100, 50,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(250, 1000),
    'enemy', generateEnemyID()
);

addEnemy(
    1100, 400,
    150, 200,
    6, 50, 100,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(250, 1000),
    'enemy', generateEnemyID()
);

addEnemy(
    1200, 100,
    200, 150,
    6, 100, 50,
    20, 20, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(250, 1000),
    'enemy', generateEnemyID()
);