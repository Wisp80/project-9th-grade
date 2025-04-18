'use strict';
import { ctx, canvasData } from './canvas/canvas.js';
import { graphicsHelper } from './helpers/graphicsHelper.js';
import { controls } from './main/controls.js';
import { game } from './main/game.js';
import { createBullet } from './main/entities/bullet.js';
import { createEnemy } from './main/entities/enemy.js';
import { createRock } from './main/entities/rock.js';
import { createPuddle } from './main/entities/puddle.js';

/*Запускаем следующий код сразу после того, как вся страница браузера будет загружена.*/
window.onload = function () {
    /*Инициализируем кнопки меню при помощи метода "game.initializeMenuButtonsListening()".*/
    game.initializeMenuButtonsListening(
        ctx, canvasData, controls, game,
        createBullet, createEnemy, createRock, createPuddle
    );

    /*Инициализируем управление персонажем при помощи метода "game.initializeMenuButtonsListening()".*/
    controls.initializePlayersControlsListening();

    /*Отрисовываем сетку на экране.*/
    graphicsHelper.drawGrid(ctx, canvasData, 0.05, 'rgba(0, 0, 0, 1)');
};