'use strict';
import { ctx, canvasData } from '../canvas/canvas.js';
import { mathHelper } from '../helpers/mathHelper.js';
import { graphicsHelper } from '../helpers/graphicsHelper.js';
import { Player } from './entities/player.js';
import { createEnemy } from './entities/enemy.js';
import { createRock } from './entities/rock.js';
import { createPuddle } from './entities/puddle.js';

/*Объект "game" представляет из себя главный объект игры, обрабатывающий все данные игры.*/
export const game = {
    /*Свойство "setTimeoutID" нужно для хранения ID вызовов функции "setTimeout()" внутри метода "tick()".*/
    setTimeoutID: null,
    /*Свойство "ticks" нужно для хранения текущего количества отрисованных кадров.*/
    ticks: 0,
    /*Свойство "currentFPS" нужно для хранения текущего значения FPS.*/
    currentFPS: 0,
    /*Свойство "currentLevel" нужно для хранения текущего номера уровня в игре.*/
    currentLevel: 1,
    finished: false,

    /*Метод "tick()" занимается подготовкой кадров игры.
    Метод "tick()" не принимает никаких параметров.
    Метод "tick()" ничего не возвращает.*/
    tick: function () {
        /*Удаляем из памяти предыдущий вызов функции "setTimeout()" при помощи функции "clearTimeout()".*/
        window.clearTimeout(this.setTimeoutID);
        /*Подготавливаем данные для следующего кадра при помощи метода "game.prepareDataForNextTick()".*/
        this.prepareDataForNextTick();
        /*Отрисовываем подготовленные данные для следующего кадра при помощи метода 
        "game.renderPreparedDataForNextTick()".*/
        this.renderPreparedDataForNextTick();
        /*Запускаем через 1/60 секунды подготовку следующего кадра, тем самым добиваясь 60 кадров в секунду.*/
        this.setTimeoutID = window.setTimeout(() => { game.tick() }, 1000 / 60);
    },

    /*Метод "prepareDataForNextTick()" подготавливает данные для следующего кадра.
    Метод "prepareDataForNextTick()" не принимает никаких параметров.
    Метод "prepareDataForNextTick()" ничего не возвращает.*/
    prepareDataForNextTick: function () {
        /*Обрабатываем нажатые кнопки игроком при помощи метода "players.playerOne.processControls()".*/
        players.playerOne.processControls();
        /*Обрабатываем движение персонажа на основе нажатых кнопок игроком.*/
        players.playerOne.move();
        /*Обрабатываем движение врагов при помощи метода "enemy.move()".*/
        for (const enemy of enemies) { enemy.move() };
        /*Обрабатываем стрельбу врагов при помощи метода "enemy.shoot()".*/
        for (const enemy of enemies) { enemy.shoot() };
        /*Обрабатываем движение пуль при помощи метода "bullet.move()".*/
        for (const bullet of bullets) { bullet.move() };
        /*Рассчитываем текущее значение FPS при помощи метода "calculateFPS()".*/
        this.calculateFPS();
        /*Увеличиваем количество отрисованных кадров.*/
        this.ticks++;
    },

    /*Метод "renderPreparedDataForNextTick()" отрисовывает подготавленные данные для следующего кадра.
    Метод "renderPreparedDataForNextTick()" не принимает никаких параметров.
    Метод "renderPreparedDataForNextTick()" ничего не возвращает.*/
    renderPreparedDataForNextTick: function () {
        /*Очищаем экран игры при помощи метода "graphicsHelper.clearScreen()".*/
        graphicsHelper.clearScreen('rgba(125, 109, 76, 1)'); // 'rgba(118, 125, 76, 1)'
        /*Отрисовываем сетку на экране. Это нужно только для тестирования.*/
        graphicsHelper.drawGrid();
        /*Отрисовываем лужи при помощи метода "puddle.draw()".*/
        for (const puddle of puddles) { puddle.draw() };
        /*Отрисовываем камни при помощи метода "rock.draw()".*/
        for (const rock of rocks) { rock.draw() };
        /*Отрисовываем пули при помощи метода "bullet.draw()".*/
        for (const bullet of bullets) { bullet.draw() };
        /*Отрисовываем персонажа при помощи метода "players.playerOne.draw()".*/
        players.playerOne.draw();
        /*Отрисовываем врагов при помощи метода "enemy.draw()".*/
        for (const enemy of enemies) { enemy.draw() };
        /*Отрисовываем текущее значение FPS при помощи метода "drawFPS()".*/
        this.drawFPS();
        /*Отрисовываем текущий уровень в игре при помощи метода "drawCurrentLevel()".*/
        this.drawCurrentLevel();
        /*Отрисовываем очки здоровья персонажа при помощи метода "drawPlayerHealthPoints()".*/
        this.drawPlayerHealthPoints();
    },

    start: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        this.tick();
    },

    stop: function (reason) {
        this.finished = true;
        window.clearTimeout(this.setTimeoutID);
        alert(reason === 'win' ? 'You won!' : 'You lost!');
    },

    /*Метод "calculateFPS()" рассчитывает текущее значение FPS.
    Метод "calculateFPS()" не принимает никаких параметров.
    Метод "calculateFPS()" ничего не возвращает.*/
    calculateFPS: function () {
        setInterval(
            () => {
                /*Берем количество отрисованных кадров через одну секунду.*/
                const currentTicks = this.ticks;
                /*Берем количество отрисованных кадров через две секунды и вычитаем количество отрисованных кадров через 
                одну секунду, тем самым получая значение FPS за соседние две секунды.*/
                setTimeout(() => { this.currentFPS = this.ticks - currentTicks }, 1000);
            },
            1000
        );
    },

    /*Метод "drawFPS()" отрисовывает текущее значение FPS.
    Метод "drawFPS()" не принимает никаких параметров.
    Метод "drawFPS()" ничего не возвращает.*/
    drawFPS: function () {
        ctx.fillStyle = '#c8ff00';
        ctx.font = '30px serif';
        ctx.fillText(`FPS: ${this.currentFPS}`, canvasData.canvasWidth - 100, 35);
    },

    /*Метод "drawCurrentLevel()" отрисовывает текущий уровень в игре.
    Метод "drawCurrentLevel()" не принимает никаких параметров.
    Метод "drawCurrentLevel()" ничего не возвращает.*/
    drawCurrentLevel: function () {
        ctx.fillStyle = '#ff4800';
        ctx.font = '30px serif';
        ctx.fillText(`LEVEL: ${this.currentLevel}`, canvasData.canvasWidth / 2 - 72 , 35);
    },

    /*Метод "drawPlayerHealthPoints()" отрисовывает текущее количество очков здоровья персонажа.
    Метод "drawPlayerHealthPoints()" не принимает никаких параметров.
    Метод "drawPlayerHealthPoints()" ничего не возвращает.*/
    drawPlayerHealthPoints: function () {
        ctx.fillStyle = '#66ff00';
        ctx.font = '30px serif';
        ctx.fillText(`HP: ${players.playerOne.healthPoints}`, 25, 35);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*Создаем массив "bulletIDs" для хранения ID пуль.*/
const bulletIDs = [];
/*Создаем массив "bullets" для хранения объектов, содержащих данные о пулях.*/
const bullets = [];

/*Создаем массив "puddleIDs" для хранения ID луж.*/
const puddleIDs = [];
/*Создаем массив "puddles" для хранения объектов, содержащих данные о лужах.*/
const puddles = [];

/*Создаем массив "rockIDs" для хранения ID камней.*/
const rockIDs = [];
/*Создаем массив "rocks" для хранения объектов, содержащих данные о камнях.*/
const rocks = [];

/*Создаем массив "enemyIDs" для хранения ID врагов.*/
const enemyIDs = [];
/*Создаем массив "enemies" для хранения объектов, содержащих данные о врагах.*/
const enemies = [];

/*Создаем объект "players" для хранения объектов, содержащих данные о персонажах.*/
const players = {};

/*--------------------------------------------------------------------------------------------------------------------*/

/*
x, y,
width, height,
speed, slowDebuffMultiplierб
healthPoints, takeDamageDelay,
bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
bulletSpeedX, bulletSpeedY, shootDelay,
bulletOwner,
players, enemies, rocks, puddles, bullets, bulletIDs
*/
players.playerOne = new Player(
    100, 400,
    50, 50,
    10, 0.5,
    3, 1000,
    4, '#000000', 2, '#00ffea',
    15, 15, 300,
    'player',
    players, enemies, rocks, puddles, bullets, bulletIDs
);

/*--------------------------------------------------------------------------------------------------------------------*/

/*
x, y,
width, height,
speed,
numberOfVertices, clockwiseStepX, clockwiseStepY,
bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
bulletSpeedX, bulletSpeedY, shootDelay,
bulletOwner, bulletIDs, bullets,
players, enemies, rocks,
enemyIDs
*/
createEnemy(
    200, 650,
    150, 200,
    40,
    6, 50, 100,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

createEnemy(
    300, 200,
    200, 150,
    40,
    6, 100, 50,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

createEnemy(
    600, 300,
    150, 200,
    40,
    6, 50, 100,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

createEnemy(
    900, 600,
    200, 150,
    40,
    6, 100, 50,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

createEnemy(
    1100, 400,
    150, 200,
    40,
    6, 50, 100,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

createEnemy(
    1200, 100,
    200, 150,
    40,
    6, 100, 50,
    8, '#000000', 2, '#ff00d4',
    10, 10, mathHelper.getRandomIntFromInterval(750, 2000),
    'enemy', bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
);

/*--------------------------------------------------------------------------------------------------------------------*/

/*
x, y,
width, height,
strokeStyle, fillStyle,
numberOfVertices, clockwiseStepX, clockwiseStepY,
rocks, rockIDs
*/
createRock(
    300, 350,
    150, 200,
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 1)',
    6, 50, 100,
    rocks, rockIDs
);

createRock(
    650, 350,
    150, 200,
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 1)',
    6, 50, 100,
    rocks, rockIDs
);

createRock(
    1150, 450,
    600, 600,
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 1)',
    8, 100, 100,
    rocks, rockIDs
);

/*--------------------------------------------------------------------------------------------------------------------*/

/*
x, y,
width, height,
strokeStyle, fillStyle,
numberOfVertices, clockwiseStepX, clockwiseStepY,
puddles, puddleIDs
*/
createPuddle(
    500, 550,
    150, 200,
    'rgba(0, 0, 0, 1)', 'rgba(128, 18, 238, 0.6)',
    6, 50, 100,
    puddles, puddleIDs
);

/*--------------------------------------------------------------------------------------------------------------------*/

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