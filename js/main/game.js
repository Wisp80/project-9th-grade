'use strict';
import { players } from './player.js';
import { enemies } from './enemy.js';
import { rocks } from './rock.js';
import { puddles } from './puddle.js';
import { bullets } from './bullet.js';
import { graphicsHelper } from '../helpers/graphicsHelper.js';
import { mathHelper } from '../helpers/mathHelper.js';
import { ctx, canvasData } from '../canvas/canvas.js';

export const game = {
    setTimeoutID: null,
    ticks: 0,
    currentFPS: 0,
    currentLevel: 1,
    finished: false,

    tick: function () {
        window.clearTimeout(this.setTimeoutID);
        if (this.finished) { return };
        this.prepareDataForNextTick();
        this.renderPreparedDataForNextTick();
        this.setTimeoutID = window.setTimeout(() => { game.tick() }, 1000 / 60);
    },

    prepareDataForNextTick: function () {
        this.ticks++;
        players.playerOne.processControls();
        players.playerOne.move();
        if (enemies.length > 0) { for (const enemy of enemies) { enemy.move() } }
        if (enemies.length > 0) { for (const enemy of enemies) { enemy.shoot() } }
        if (bullets.length > 0) { for (const bullet of bullets) { bullet.move() } };
        this.calculateFPS();
    },

    renderPreparedDataForNextTick: function () {
        graphicsHelper.clearScreen();
        graphicsHelper.drawGrid();
        players.playerOne.draw();
        if (enemies.length > 0) { for (const enemy of enemies) { enemy.draw() } }
        if (bullets.length > 0) { for (const bullet of bullets) { bullet.draw() } };
        if (rocks.length > 0) { for (const rock of rocks) { rock.draw() } };
        if (puddles.length > 0) { for (const puddle of puddles) { puddle.draw() } };
        this.drawFPS();
        this.drawCurrentLevel();

        /*Проверяем находится ли какая-то точка внутри многоугольника при помощи метода "helper.isPointInsidePolygon()". 
        Это нужно только для тестирования.*/
        // const vertices = mathHelper.preparePolygonVerticesData(
        //     13,
        //     100, 1400,
        //     50, 850,
        //     150, 100,
        //     canvasData.cellWidth, canvasData.cellHeight
        // );

        // const vertices2 = mathHelper.preparePolygonVerticesData(
        //     7,
        //     100, 1400,
        //     50, 850,
        //     50, 25,
        //     canvasData.cellWidth, canvasData.cellHeight
        // );
        // graphicsHelper.drawPolygonFromVertices(vertices, 10, 'yellow', 'rgb(20, 2, 50, 0.6)');        
        // mathHelper.isPointInsidePolygon({ x: 500, y: 420 }, vertices);
    },

    start: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        audio.playSound(audio.backgroundMusic);
        this.tick();
        this.showFPS();

        setTimeout(function () {
            world.fillWorldGrid();
            console.log(world.worldGrid);
        }, 100);
    },

    stop: function (reason) {
        this.finished = true;
        audio.pauseSound(audio.backgroundMusic);
        window.clearTimeout(this.setTimeoutID);
        alert(reason === 'win' ? 'You won!' : 'You lost!');
    },

    calculateFPS: function () {
        setInterval(
            () => {
                const currentTicks = this.ticks;
                setTimeout(() => { this.currentFPS = this.ticks - currentTicks }, 1000);
            },
            1000
        );
    },

    drawFPS: function () {
        ctx.fillStyle = '#c1ec23';
        ctx.font = '30px serif';
        ctx.fillText(this.currentFPS, 25, 25);
    },

    drawCurrentLevel: function () {
        ctx.fillStyle = '#ec5c23';
        ctx.font = '30px serif';
        ctx.fillText(this.currentLevel, 75, 25);
    }
};