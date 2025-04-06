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
    rafID: null,
    /*Свойство "totalCalculatedFrames" нужно для хранения количества рассчитанных кадров за всю игру.*/
    totalCalculatedFrames: 0,
    /*Свойство "calculatedFramesForLastSecond" нужно для хранения количества рассчитанных кадров за последнюю секунду.*/
    calculatedFramesForLastSecond: 0,
    /*Свойство "currentCalculatedFPS" нужно для хранения текущего значения FPS для рассчитанных кадров.*/
    currentCalculatedFPS: 0,
    /*Свойство "lastCalculatedFPSTime" нужно для хранения времени, когда последний раз расчитывался FPS для рассчитанных 
    кадров.*/
    lastCalculatedFPSTime: 0,

    /*Свойство "totalRenderedFrames" нужно для хранения количества отрисованных кадров за всю игру.*/
    totalRenderedFrames: 0,
    /*Свойство "renderedFramesForLastSecond" нужно для хранения количества отрисованных кадров за последнюю секунду.*/
    renderedFramesForLastSecond: 0,
    /*Свойство "currentRenderedFPS" нужно для хранения текущего значения FPS для отрисованных кадров.*/
    currentRenderedFPS: 0,
    /*Свойство "lastRenderedFPSTime" нужно для хранения времени, когда последний раз расчитывался FPS для отрисованных 
    кадров.*/
    lastRenderedFPSTime: 0,

    /*Свойство "currentLevel" нужно для хранения текущего номера уровня в игре.*/
    currentLevel: 1,
    finished: false,

    /*Свойство "fixedTimeStep" нужно для хранения фиксированного временного шага для расчета логики игры в 60 FPS. Этим 
    свойством мы указываем, чтобы данные для кадров рассчитывались не чаще, чем 60 раз в секунду, то есть на рассчет 
    данных для одного кадра должно уходить не меньше ≈16.67 милисекунд. При этом отрисовка рассчитанных данных для 
    кадров не ограничивается этим свойством.*/
    fixedTimeStep: 1000 / 60,
    /*Свойство "currentFrameSteps" нужно для хранения значения, которое обозначает сколько кадров было рассчитано за 
    время текущего вызова метода "gameLoop()".*/
    currentFrameSteps: 0,
    /*Свойство "maxStepsPerFrame" нужно для хранения значения, которое обозначает сколько кадров может быть максимально 
    рассчитано за время одного вызов метода "gameLoop()".*/
    maxStepsPerFrame: 5,
    /*Свойство "accumulatedTimeForCalculatingFrames" нужно для хранения значения, которое обозначает время, накопленное
    для рассчета данных для кадров, то есть время, накопленное между всеми вызовами метода "gameLoop()".*/
    accumulatedTimeForCalculatingFrames: 0,
    /*Свойство "lastRenderedFrameTime" нужно для хранения значения, которое обозначает время, когда последний раз были
    рассчитаны данные для кадра, то есть время последнего вызова метода "gameLoop()".*/
    lastRenderedFrameTime: 0,

    /*Метод "gameLoop()" занимается обробаткой цикла игры.

    Метод "gameLoop()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, указывающий время текущего вызова метода "gameLoop()".

    Метод "gameLoop()" ничего не возвращает.*/
    gameLoop: function (timestamp) {
        /*Функция "requestAnimationFrame()" принимает в качестве параметра callback-функцию. Функция 
        "requestAnimationFrame()" сама решает когда нужно вызывать переданную в нее callback-функцию.
        
        Функция "requestAnimationFrame()" вызывает переданную в нее callback-функцию однократно перед следующим 
        обновлением экрана. Если функция "requestAnimationFrame()" вызывается рекурсивно, то это означает, что 
        переданная в нее callback-функцию будет вызываться равное частоте обновления монитора раз в секунду, при этом 
        браузер будет стараться синхронизировать функцию "requestAnimationFrame()" с вертикальным синхросигналом (VSync) 
        монитора, чтобы избежать "разрыва кадров". Также если вкладка неактивна или страница не видна, то браузер будет 
        замедлять или останавливать функцию "requestAnimationFrame()", обычно до 1-10 FPS.
        
        Когда функция "requestAnimationFrame()" вызывает переданную в нее callback-функцию, она передает в эту 
        callback-функцию параметр (в нашем случае это переменная "timestamp"), обозначающий время вызова этой 
        callback-функции в милисекундах, то есть время в миллисекундах с момента загрузки страницы с точностью до 
        микросекунд.
        
        Для генерации кадров функция "requestAnimationFrame()" подходит лучше, чем функция "setTimeout()" по следующим
        причинам:
        1. Функция "setTimeout()" не синхронизируется с монитором.
        2. Браузер может задерживать выполнение функции "setTimeout()" из-за нагрузки вкладки, энергосбережения или 
        других задач.
        3. Функция "setTimeout()" может вызывать рывки из-за задержек в Event Loop.
        4. Функция "setTimeout()" не имеет доступа к времени рендеринга.
        5. Функция "setTimeout()" при нагрузке вызывает лавинообразное накопление отложенных вызовов.
        6. Функция "setTimeout()" не останавливается при скрытии вкладки или минимизации окна, то есть продолжает 
        тратить ресурсы.*/
        this.rafID = requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        /*Рассчитываем текущее значение FPS для отрисованных кадров при помощи метода "updateRenderedFPS()".*/
        this.updateRenderedFPS(timestamp);
        /*Высчитываем сколько прошло времени с последнего вызова метода "gameLoop()" и сохраняем результат в переменную 
        "deltaTime".*/
        let deltaTime = timestamp - this.lastRenderedFrameTime;
        /*Создаем переменную "maxDeltaTime" для хранения ограничения для значения в переменной "deltaTime".*/
        const maxDeltaTime = 30 * this.fixedTimeStep;
        /*Когда вкладка браузера неактивна, то функция "requestAnimationFrame()" приостанавливается, а когда вкладка 
        браузера снова становится активной, то параметр "timestamp" содержит большое значение равное всему времени 
        паузы. Из-за этого значение в переменной "deltaTime" становится огромным, что приводит к множественным 
        выполнениям логики за один кадр. Чтобы решить эту проблему мы вводим ограничение для значения в переменной 
        "deltaTime".*/
        if (deltaTime > maxDeltaTime) { deltaTime = maxDeltaTime };
        /*Обновляем время последнего вызова метода "gameLoop()".*/
        this.lastRenderedFrameTime = timestamp;
        /*Увеличиваем время, накопленное для рассчета данных для кадров, на время, которое прошло с последнего вызова 
        метода "gameLoop()".*/
        this.accumulatedTimeForCalculatingFrames += deltaTime;

        /*Рассчитываем данные для следующего кадра, если накопилось времения хотя бы на рассчет данных для одного кадра. 
        Если накопилось времени больше, чем на рассчет данных для одного кадра, то делаем наперед расчеты данных для 
        нескольких кадров, но не больше, чем указано в свойстве "maxStepsPerFrame".*/
        while (
            this.accumulatedTimeForCalculatingFrames >= this.fixedTimeStep &&
            this.currentFrameSteps < this.maxStepsPerFrame
        ) {
            /*Рассчитываем данные для следующего кадра при помощи метода "prepareDataForNextFrame()".*/
            this.prepareDataForNextFrame();
            /*Поскольку рассчитали данные для одного кадра, то вычитаем из времени, накопленного для рассчета данных для 
            кадров, время, необходимое на рассчет данных для одного кадра.*/
            this.accumulatedTimeForCalculatingFrames -= this.fixedTimeStep;
            /*Указываем, что за текущий вызов метода "gameLoop()" рассчитали данные для одного кадра больше.*/
            this.currentFrameSteps++;
            /*Рассчитываем текущее значение FPS для рассчитанных кадров при помощи метода "updateCalculatedFPS()".*/
            this.updateCalculatedFPS(timestamp);
        };

        /*Закончив все рассчеты данных для кадров, обнуляем свойство "currentFrameSteps" для следующего вызова метода 
        "gameLoop()".*/
        this.currentFrameSteps = 0;

        /*Интерполяция - это техника, которая позволяет плавно отображать движение объектов между кадрами логики, даже 
        если частота рендеринга, например, 144 FPS, выше, чем частота обновления игровой логики, например, 60 FPS. Без 
        интерполяции объекты будут "дергаться", так как позиции обновляются реже, чем отрисовываются. Интерполяция 
        плавно заполняет промежутки между кадрами логики, вычисляя промежуточные позиции для рендеринга. Для 
        использования интерполяции нужно рассчитывать коэффициент интерполяции, то есть коэффициент смещения между 
        последним и следующим кадром. Этот коэффициент находится путем деления времени, накопленного для рассчета данных 
        для кадров, на фиксированной временной шаг для расчета логики игры.
        
        Рассчитываем коэффициент смещения между последним и следующим кадром для плавной отрисовки движущихся объектов. 
        Этот коэффициент всегда между 0 (начало кадра) и 1 (конец кадра).*/
        const interpolationFactor = this.accumulatedTimeForCalculatingFrames / this.fixedTimeStep;
        /*Отрисовываем данные для следующего кадра при помощи метода "renderPreparedDataForNextFrame()".*/
        this.renderPreparedDataForNextFrame(interpolationFactor);
    },

    /*Метод "prepareDataForNextFrame()" подготавливает данные для следующего кадра.
    Метод "prepareDataForNextFrame()" не принимает никаких параметров.
    Метод "prepareDataForNextFrame()" ничего не возвращает.*/
    prepareDataForNextFrame: function () {
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
    },

    /*Метод "renderPreparedDataForNextFrame()" отрисовывает подготавленные данные для следующего кадра.
    Метод "renderPreparedDataForNextFrame()" не принимает никаких параметров.
    Метод "renderPreparedDataForNextFrame()" ничего не возвращает.*/
    renderPreparedDataForNextFrame: function (interpolationFactor) {
        /*Очищаем экран игры при помощи метода "graphicsHelper.clearScreen()".*/
        graphicsHelper.clearScreen('rgba(125, 109, 76, 1)'); // 'rgba(118, 125, 76, 1)'
        /*Отрисовываем сетку на экране. Это нужно только для тестирования.*/
        graphicsHelper.drawGrid();
        /*Отрисовываем лужи при помощи метода "puddle.draw()".*/
        for (const puddle of puddles) { puddle.draw() };
        /*Отрисовываем камни при помощи метода "rock.draw()".*/
        for (const rock of rocks) { rock.draw() };
        /*Отрисовываем пули при помощи метода "bullet.draw()".*/
        for (const bullet of bullets) { bullet.draw(interpolationFactor) };
        /*Отрисовываем персонажа при помощи метода "players.playerOne.draw()".*/
        players.playerOne.draw(interpolationFactor);
        /*Отрисовываем врагов при помощи метода "enemy.draw()".*/
        for (const enemy of enemies) { enemy.draw(interpolationFactor) };
        /*Отрисовываем текущее значение FPS при помощи метода "drawFPS()".*/
        this.drawFPS();
        /*Отрисовываем текущий уровень в игре при помощи метода "drawCurrentLevel()".*/
        this.drawCurrentLevel();
        /*Отрисовываем очки здоровья персонажа при помощи метода "drawPlayerHealthPoints()".*/
        this.drawPlayerHealthPoints();
    },

    /*Метод "updateCalculatedFPS()" рассчитывает текущее значение FPS для рассчитанных кадров.

    Метод "updateCalculatedFPS()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, обозначающий время текущего вызова метода "gameLoop()".

    Метод "updateCalculatedFPS()" ничего не возвращает.*/
    updateCalculatedFPS: function (timestamp) {
        /*Увеличиваем количество рассчитанных кадров за всю игру.*/
        this.totalCalculatedFrames++;
        /*Увеличиваем количество рассчитанных кадров за последнюю секунду.*/
        this.calculatedFramesForLastSecond++;

        /*Проверяем не прошла ли секунда с последнего обновления FPS для рассчитанных кадров.*/
        if (timestamp - this.lastCalculatedFPSTime >= 1000) {
            /*Обновляем текущее значение FPS для рассчитанных кадров.*/
            this.currentCalculatedFPS = this.calculatedFramesForLastSecond;
            /*Сбрасываем количество рассчитанных кадров за последнюю секунду.*/
            this.calculatedFramesForLastSecond = 0;
            /*Обновляем время, когда последний раз расчитывался FPS для рассчитанных кадров.*/
            this.lastCalculatedFPSTime = timestamp;
        };
    },

    /*Метод "updateRenderedFPS()" рассчитывает текущее значение FPS для отрисованных кадров.

    Метод "updateRenderedFPS()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, обозначающий время текущего вызова метода "gameLoop()".

    Метод "updateRenderedFPS()" ничего не возвращает.*/
    updateRenderedFPS: function (timestamp) {
        /*Увеличиваем количество отрисованных кадров за всю игру.*/
        this.totalRenderedFrames++;
        /*Увеличиваем количество отрисованных кадров за последнюю секунду.*/
        this.renderedFramesForLastSecond++;

        /*Проверяем не прошла ли секунда с последнего обновления FPS для отрисованных кадров.*/
        if (timestamp - this.lastRenderedFPSTime >= 1000) {
            /*Обновляем текущее значение FPS для отрисованных кадров.*/
            this.currentRenderedFPS = this.renderedFramesForLastSecond;
            /*Сбрасываем количество отрисованных кадров за последнюю секунду.*/
            this.renderedFramesForLastSecond = 0;
            /*Обновляем время, когда последний раз расчитывался FPS для отрисованных кадров.*/
            this.lastRenderedFPSTime = timestamp;
        };
    },

    /*Метод "drawFPS()" отрисовывает текущее значение FPS.
    Метод "drawFPS()" не принимает никаких параметров.
    Метод "drawFPS()" ничего не возвращает.*/
    drawFPS: function () {
        ctx.fillStyle = '#c8ff00';
        ctx.font = '30px serif';
        ctx.fillText(`Calculated FPS: ${this.currentCalculatedFPS}`, canvasData.canvasWidth - 250, 35);

        ctx.fillStyle = '#c8ff00';
        ctx.font = '30px serif';
        ctx.fillText(`Rendered FPS: ${this.currentRenderedFPS}`, canvasData.canvasWidth - 250, 70);
    },

    /*Метод "drawCurrentLevel()" отрисовывает текущий уровень в игре.
    Метод "drawCurrentLevel()" не принимает никаких параметров.
    Метод "drawCurrentLevel()" ничего не возвращает.*/
    drawCurrentLevel: function () {
        ctx.fillStyle = '#ff4800';
        ctx.font = '30px serif';
        ctx.fillText(`LEVEL: ${this.currentLevel}`, canvasData.canvasWidth / 2 - 72, 35);
    },

    /*Метод "drawPlayerHealthPoints()" отрисовывает текущее количество очков здоровья персонажа.
    Метод "drawPlayerHealthPoints()" не принимает никаких параметров.
    Метод "drawPlayerHealthPoints()" ничего не возвращает.*/
    drawPlayerHealthPoints: function () {
        ctx.fillStyle = '#66ff00';
        ctx.font = '30px serif';
        ctx.fillText(`HP: ${players.playerOne.healthPoints}`, 25, 35);
    },

    start: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        this.gameLoop();
    },

    stop: function (reason) {
        this.finished = true;
        window.clearTimeout(this.setTimeoutID);
        alert(reason === 'win' ? 'You won!' : 'You lost!');
    },
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
    15, 0.5,
    3, 1000,
    5, '#000000', 2, '#00ffea',
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
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 0.820)',
    6, 50, 100,
    rocks, rockIDs
);

createRock(
    650, 350,
    150, 200,
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 0.820)',
    6, 50, 100,
    rocks, rockIDs
);

createRock(
    1150, 450,
    600, 600,
    'rgba(82, 82, 82, 1)', 'rgba(82, 82, 82, 0.820)',
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