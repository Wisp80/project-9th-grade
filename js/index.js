'use strict';
import { ctx, canvasData } from './canvas/canvas.js';
import { controls } from './main/controls.js';
import { game } from './main/game.js';
import { createBullet } from './main/entities/bullet.js';
import { createEnemy } from './main/entities/enemy.js';
import { createRock } from './main/entities/rock.js';
import { createPuddle } from './main/entities/puddle.js';

window.onload = function () {
    game.initializeMenuButtonsListening(
        ctx, canvasData, controls, game,
        createBullet, createEnemy, createRock, createPuddle
    );

    controls.initializePlayersControlsListening();
};

requestAnimationFrame((timestamp) => { game.gameLoop(timestamp, ctx, canvasData, controls, game, createBullet, createEnemy, createRock, createPuddle) });