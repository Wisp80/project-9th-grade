'use strict';
import { mathHelper } from '../helpers/mathHelper.js';
import { graphicsHelper } from '../helpers/graphicsHelper.js';
import { Player } from './entities/player.js';

/*Объект "game" представляет из себя главный объект игры, обрабатывающий все данные игры.*/
export const game = {
    /*Свойство, которое хранит ID последнего вызова функции "requestAnimationFrame()". Это свойство используется для
    подчистки работы функции "requestAnimationFrame()".*/
    rafID: null,

    /*Свойство "totalCalculatedFrames" нужно для хранения количества рассчитанных кадров за всю игру.*/
    totalCalculatedFrames: 0,
    /*Свойство "calculatedFramesForLastSecond" нужно для хранения количества рассчитанных кадров за последнюю секунду.
    Это свойство используется для рассчета FPS для рассчитанных кадров.*/
    calculatedFramesForLastSecond: 0,
    /*Свойство "lastCalculatedFramesFPSTime" нужно для хранения времени, когда последний раз расчитывался FPS для 
    рассчитанных кадров. Это свойство используется для рассчета FPS для рассчитанных кадров.*/
    lastCalculatedFramesFPSTime: 0,
    /*Свойство "calculatedFramesFPS" нужно для хранения текущего значения FPS для рассчитанных кадров.*/
    calculatedFramesFPS: 0,

    /*Свойство "totalRenderedFrames" нужно для хранения количества отрисованных кадров за всю игру.*/
    totalRenderedFrames: 0,
    /*Свойство "renderedFramesForLastSecond" нужно для хранения количества отрисованных кадров за последнюю секунду. 
    Это свойство используется для рассчета FPS для отрисованных кадров.*/
    renderedFramesForLastSecond: 0,
    /*Свойство "lastRenderedFramesFPSTime" нужно для хранения времени, когда последний раз расчитывался FPS для 
    отрисованных кадров. Это свойство используется для рассчета FPS для рассчитанных кадров.*/
    lastRenderedFramesFPSTime: 0,
    /*Свойство "renderedFramesFPS" нужно для хранения текущего значения FPS для отрисованных кадров.*/
    renderedFramesFPS: 0,

    /*Свойство "fixedTimeStep" нужно для хранения фиксированного временного шага для расчета данных для кадров игры в 60 
    FPS. Этим свойством мы указываем, чтобы данные для кадров рассчитывались не чаще, чем 60 раз в секунду, то есть на 
    рассчет данных для одного кадра должно уходить не меньше ≈16.67 милисекунд. При этом отрисовка рассчитанных данных 
    для кадров не ограничивается этим свойством.*/
    fixedTimeStep: 1000 / 60,
    /*Свойство "currentFrameSteps" нужно для хранения значения, которое обозначает сколько кадров было рассчитано за 
    время текущего вызова метода "gameLoop()".*/
    currentFrameSteps: 0,
    /*Свойство "maxStepsPerFrame" нужно для хранения значения, которое обозначает сколько кадров может быть максимально 
    рассчитано за время одного вызов метода "gameLoop()".*/
    maxStepsPerFrame: 1,
    /*Свойство "accumulatedTimeForCalculatingFrameData" нужно для хранения значения, которое обозначает время, 
    накопленное для рассчета данных для кадров, то есть время, накопленное между всеми вызовами метода "gameLoop()".*/
    accumulatedTimeForCalculatingFrameData: 0,
    /*Свойство "lastRenderedFrameTime" нужно для хранения значения, которое обозначает время, когда последний раз были
    отрисованы данные для кадра, то есть время последнего вызова метода "gameLoop()".*/
    lastRenderedFrameTime: 0,
    /*Множитель для рассчета локальной переменной "maxDeltaTime" в метода "gameLoop()".*/
    maxDeltaTimeMultiplier: 3,
    /*Свойство "frameInterpolation" содержит флаг для указания использовать ли интерполяцию кадров или нет.*/
    frameInterpolation: true,

    /*Метод "gameLoop()" занимается обробаткой цикла игры.

    Метод "gameLoop()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, указывающий время текущего вызова метода "gameLoop()".
    2. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    3. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
    4. "controls" - это параметр в виде объекта, обрабатывающего нажатие и отжатие кнопок управления в игре.
    5. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    6. "createBullet" - это параметр в виде функции, которая создает объект, содержащий данные о пуле, на основе класса 
    "Bullet" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    7. "createEnemy" - это параметр в виде функции, которая создает объект, содержащий данные о враге, на основе класса 
    "Enemy" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    8. "createRock" - это параметр в виде функции, которая создает объект, содержащий данные о камне, на основе класса 
    "Rock" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    9. "createPuddle" - это параметр в виде функции, которая создает объект, содержащий данные о луже, на основе класса 
    "Puddle" и помещает этот объект в массив, куда должны сохраняться такие объекты.

    Метод "gameLoop()" ничего не возвращает.*/
    gameLoop: function (
        timestamp, ctx, canvasData, controls, game,
        createBullet, createEnemy, createRock, createPuddle
    ) {
        /*Подчишаем работы предыдущего вызова функции "requestAnimationFrame()" при помощи функции 
        "cancelAnimationFrame()".*/
        cancelAnimationFrame(this.rafID);

        /*Проверяем не умер ли персонаж. Если это так, то сообщаем, что игра окончена.*/
        if (this.players.playerOne.healthPoints <= 0) { this.finished = true };

        /*Функция "requestAnimationFrame()" принимает в качестве параметра callback-функцию. Функция 
        "requestAnimationFrame()" сама решает когда нужно вызывать переданную в нее callback-функцию.
        
        Функция "requestAnimationFrame()" вызывает переданную в нее callback-функцию однократно перед следующим 
        обновлением экрана. Если функция "requestAnimationFrame()" вызывается рекурсивно, то это означает, что 
        переданная в нее callback-функцию будет вызываться равное частоте обновления монитора раз в секунду, при этом 
        браузер будет стараться синхронизировать функцию "requestAnimationFrame()" с вертикальной синхронизацией 
        монитора, чтобы избежать "разрыва кадров". Также если вкладка неактивна или страница не видна, то браузер будет 
        замедлять или останавливать функцию "requestAnimationFrame()", обычно до 1-10 FPS. Нужно всегда помнить, что
        функция "requestAnimationFrame()" синхронизируется с частотой основного монитора, например, 144 Гц, даже если 
        окно находится на втором, например, 60 Гц.
        
        Когда функция "requestAnimationFrame()" вызывает переданную в нее callback-функцию, она передает в эту 
        callback-функцию параметр (в нашем случае это переменная "timestamp"), обозначающий время вызова этой 
        callback-функции в милисекундах, а точнее время в миллисекундах с момента загрузки страницы с точностью до 
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
        тратить ресурсы.
        
        Рекурсивно вызываем функцию "requestAnimationFrame()", которая будет рекурсивно вызывать метод "gameLoop()", что
        приведит к бесконченому запуску циклов игры.*/
        this.rafID = requestAnimationFrame(
            (timestamp) => this.gameLoop(
                timestamp, ctx, canvasData, controls, game,
                createBullet, createEnemy, createRock, createPuddle
            )
        );

        /*Рассчитываем текущее значение FPS для отрисованных кадров при помощи метода "updateRenderedFPS()".*/
        this.updateRenderedFPS(timestamp);

        /*Высчитываем сколько прошло времени с последнего вызова метода "gameLoop()" и сохраняем результат в переменную 
        "deltaTime".*/
        let deltaTime = timestamp - this.lastRenderedFrameTime;

        /*Создаем переменную "maxDeltaTime" для хранения ограничения для значения в переменной "deltaTime".*/
        const maxDeltaTime = this.maxDeltaTimeMultiplier * this.fixedTimeStep;

        /*Когда вкладка браузера неактивна, то функция "requestAnimationFrame()" приостанавливается, а когда вкладка 
        браузера снова становится активной, то параметр "timestamp" содержит большое значение равное всему времени 
        неактивного периода. Из-за этого значение в переменной "deltaTime" становится огромным, что приводит к 
        множественным выполнениям логики за один кадр. Чтобы решить эту проблему мы вводим ограничение для значения в 
        переменной "deltaTime".*/
        if (deltaTime > maxDeltaTime) { deltaTime = maxDeltaTime };

        /*Обновляем время последнего вызова метода "gameLoop()".*/
        this.lastRenderedFrameTime = timestamp;

        /*Увеличиваем время, накопленное для рассчета данных для кадров, на время, которое прошло с последнего вызова 
        метода "gameLoop()".*/
        this.accumulatedTimeForCalculatingFrameData += deltaTime;

        /*Рассчитываем данные для следующего кадра, если накопилось времения хотя бы на рассчет данных для одного кадра. 
        Если накопилось времени больше, чем на рассчет данных для одного кадра, то делаем наперед расчеты данных для 
        нескольких кадров, но не больше, чем указано в свойстве "maxStepsPerFrame".*/
        while (
            this.accumulatedTimeForCalculatingFrameData >= this.fixedTimeStep &&
            this.currentFrameSteps < this.maxStepsPerFrame
        ) {
            /*Рассчитываем данные для следующего кадра при помощи метода "prepareDataForNextFrame()".*/
            this.prepareDataForNextFrame(
                controls, canvasData, game,
                createBullet, createEnemy, createRock, createPuddle);

            /*Поскольку рассчитали данные для одного кадра, то вычитаем из времени, накопленного для рассчета данных для 
            кадров, время, необходимое на рассчет данных для одного кадра.*/
            this.accumulatedTimeForCalculatingFrameData -= this.fixedTimeStep;

            /*Указываем, что за текущий вызов метода "gameLoop()" рассчитали данные для одного кадра больше.*/
            this.currentFrameSteps++;

            /*Рассчитываем текущее значение FPS для рассчитанных кадров при помощи метода "updateCalculatedFPS()".*/
            this.updateCalculatedFPS(timestamp);
        };

        /*Закончив все рассчеты данных для кадров, обнуляем свойство "currentFrameSteps" для следующего вызова метода 
        "gameLoop()".*/
        this.currentFrameSteps = 0;

        /*Интерполяция кадров - это техника, которая позволяет плавно отображать движение объектов между кадрами логики, 
        даже если частота отрисовки, например, 144 FPS, выше, чем частота обновления игровой логики, например, 60 FPS. 
        Без интерполяции кадров объекты будут "дергаться", так как позиции обновляются реже, чем отрисовываются. 
        Интерполяция кадров плавно заполняет промежутки между кадрами логики, вычисляя промежуточные позиции для 
        отрисовки. 
        
        Для использования интерполяции кадров нужно рассчитывать коэффициент интерполяции, то есть коэффициент смещения 
        между последним и следующим кадром. Этот коэффициент находится путем деления времени, накопленного для рассчета 
        данных для кадров, на фиксированной временной шаг для расчета данных для кадров игры. Этот коэффициент всегда
        находится между 0 (начало кадра) и 1 (конец кадра).
        
        Рассчитываем коэффициент смещения между последним и следующим кадром для плавной отрисовки движущихся 
        объектов и сохраняем его в переменной "interpolationFactor".*/
        const interpolationFactor = this.accumulatedTimeForCalculatingFrameData / this.fixedTimeStep;

        /*Отрисовываем данные для следующего кадра при помощи метода "renderPreparedDataForNextFrame()", используя 
        коэффициент интерполяции.*/
        this.renderPreparedDataForNextFrame(ctx, canvasData, interpolationFactor, game);
    },

    /*Метод "prepareDataForNextFrame()" подготавливает данные для следующего кадра.
    
    Метод "prepareDataForNextFrame()" принимает следующие параметры:
    1. "controls" - это параметр в виде объекта, обрабатывающего нажатие и отжатие кнопок управления в игре.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
    3. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    4. "createBullet" - это параметр в виде функции, которая создает объект, содержащий данные о пуле, на основе класса 
    "Bullet" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    5. "createEnemy" - это параметр в виде функции, которая создает объект, содержащий данные о враге, на основе класса 
    "Enemy" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    6. "createRock" - это параметр в виде функции, которая создает объект, содержащий данные о камне, на основе класса 
    "Rock" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    7. "createPuddle" - это параметр в виде функции, которая создает объект, содержащий данные о луже, на основе класса 
    "Puddle" и помещает этот объект в массив, куда должны сохраняться такие объекты.

    Метод "prepareDataForNextFrame()" ничего не возвращает.*/
    prepareDataForNextFrame: function (
        controls, canvasData, game,
        createBullet, createEnemy, createRock, createPuddle
    ) {
        /*Если игра еще не закончилась, то рассчитываем новый кадр.*/
        if (!this.finished) {
            /*Если персонаж убил всех врагов, то генерируем новый уровень при помощи метода "generateLevel()".*/
            if (this.enemies.length === 0) { this.generateLevel(canvasData, createEnemy, createRock, createPuddle) };

            /*Обрабатываем нажатые кнопки игроком при помощи метода "players.playerOne.processControls()".*/
            this.players.playerOne.processControls(controls, game, createBullet);
            /*Обрабатываем движение персонажа на основе нажатых кнопок игроком при помощи метода 
            "players.playerOne.move()".*/
            this.players.playerOne.move(canvasData, game);
            /*Обрабатываем движение врагов при помощи метода "enemy.move()".*/
            for (const enemy of this.enemies) { enemy.move(canvasData, game) };
            /*Обрабатываем стрельбу врагов при помощи метода "enemy.shoot()".*/
            for (const enemy of this.enemies) { enemy.shoot(game, createBullet) };
            /*Обрабатываем движение пуль при помощи метода "bullet.move()".*/
            for (const bullet of this.bullets) { bullet.move(canvasData, game) };
        } else {
            /*Если игра закончилась, то сбрасываем все данные игры на стартовые при помощи метода "resetGameData()".*/
            this.resetGameData();
        };
    },

    /*Метод "renderPreparedDataForNextFrame()" отрисовывает подготавленные данные для следующего кадра.

    Метод "renderPreparedDataForNextFrame()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "renderPreparedDataForNextFrame()" ничего не возвращает.*/
    renderPreparedDataForNextFrame: function (ctx, canvasData, interpolationFactor, game) {
        /*Очищаем экран игры при помощи метода "graphicsHelper.clearScreen()".*/
        graphicsHelper.clearScreen(ctx, canvasData, 'rgba(125, 109, 76, 1)');
        /*Отрисовываем сетку на экране.*/
        graphicsHelper.drawGrid(ctx, canvasData);

        /*Если игра еще не закончилась, то отрисовываем новый кадр.*/
        if (!this.finished) {
            /*Отрисовываем лужи при помощи метода "puddle.draw()".*/
            for (const puddle of this.puddles) { puddle.draw(ctx) };
            /*Отрисовываем камни при помощи метода "rock.draw()".*/
            for (const rock of this.rocks) { rock.draw(ctx) };
            /*Отрисовываем пули при помощи метода "bullet.draw()".*/
            for (const bullet of this.bullets) { bullet.draw(ctx, interpolationFactor, game) };
            /*Отрисовываем персонажа при помощи метода "players.playerOne.draw()".*/
            this.players.playerOne.draw(ctx, interpolationFactor, game);
            /*Отрисовываем врагов при помощи метода "enemy.draw()".*/
            for (const enemy of this.enemies) { enemy.draw(ctx, interpolationFactor, game) };
        } else {
            /*Если игра закончилась, то отрисовываем экран конца игры при помощи метода "drawGameOverScreen()".*/
            this.drawGameOverScreen(ctx, canvasData);
        };

        /*Отрисовываем текущее значение FPS при помощи метода "drawFPS()".*/
        this.drawFPS(ctx, canvasData);
        /*Отрисовываем текущий уровень в игре при помощи метода "drawCurrentLevel()".*/
        this.drawCurrentLevel(ctx, canvasData);
        /*Отрисовываем очки здоровья персонажа при помощи метода "drawPlayerHealthPoints()".*/
        this.drawPlayerHealthPoints(ctx);
    },

    /*Метод "updateCalculatedFPS()" рассчитывает текущее значение FPS для рассчитанных кадров.

    Метод "updateCalculatedFPS()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, указывающий время текущего вызова метода "gameLoop()".

    Метод "updateCalculatedFPS()" ничего не возвращает.*/
    updateCalculatedFPS: function (timestamp) {
        /*Увеличиваем количество рассчитанных кадров за всю игру.*/
        this.totalCalculatedFrames++;
        /*Увеличиваем количество рассчитанных кадров за последнюю секунду.*/
        this.calculatedFramesForLastSecond++;

        /*Проверяем не прошла ли секунда с последнего обновления FPS для рассчитанных кадров.*/
        if (timestamp - this.lastCalculatedFramesFPSTime >= 1000) {
            /*Обновляем текущее значение FPS для рассчитанных кадров.*/
            this.calculatedFramesFPS = this.calculatedFramesForLastSecond;
            /*Сбрасываем количество рассчитанных кадров за последнюю секунду.*/
            this.calculatedFramesForLastSecond = 0;
            /*Обновляем время, когда последний раз расчитывался FPS для рассчитанных кадров.*/
            this.lastCalculatedFramesFPSTime = timestamp;
        };
    },

    /*Метод "updateRenderedFPS()" рассчитывает текущее значение FPS для отрисованных кадров.

    Метод "updateRenderedFPS()" принимает следующие параметры:
    1. "timestamp" - это числовой параметр, указывающий время текущего вызова метода "gameLoop()".

    Метод "updateRenderedFPS()" ничего не возвращает.*/
    updateRenderedFPS: function (timestamp) {
        /*Увеличиваем количество отрисованных кадров за всю игру.*/
        this.totalRenderedFrames++;
        /*Увеличиваем количество отрисованных кадров за последнюю секунду.*/
        this.renderedFramesForLastSecond++;

        /*Проверяем не прошла ли секунда с последнего обновления FPS для отрисованных кадров.*/
        if (timestamp - this.lastRenderedFramesFPSTime >= 1000) {
            /*Обновляем текущее значение FPS для отрисованных кадров.*/
            this.renderedFramesFPS = this.renderedFramesForLastSecond;
            /*Сбрасываем количество отрисованных кадров за последнюю секунду.*/
            this.renderedFramesForLastSecond = 0;
            /*Обновляем время, когда последний раз расчитывался FPS для отрисованных кадров.*/
            this.lastRenderedFramesFPSTime = timestamp;
        };
    },

    /*Метод "drawFPS()" отрисовывает текущее значение FPS.
    
    Метод "drawFPS()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "drawFPS()" ничего не возвращает.*/
    drawFPS: function (ctx, canvasData) {
        ctx.fillStyle = '#c8ff00';
        ctx.font = '30px serif';
        ctx.fillText(`Calculated FPS: ${this.calculatedFramesFPS}`, canvasData.canvasWidth - 250, 35);

        ctx.fillStyle = '#c8ff00';
        ctx.font = '30px serif';
        ctx.fillText(`Rendered FPS: ${this.renderedFramesFPS}`, canvasData.canvasWidth - 250, 70);
    },

    /*Метод "drawCurrentLevel()" отрисовывает текущий уровень в игре.
    
    Метод "drawCurrentLevel()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "drawCurrentLevel()" ничего не возвращает.*/
    drawCurrentLevel: function (ctx, canvasData) {
        ctx.fillStyle = '#ff4800';
        ctx.font = '30px serif';
        ctx.fillText(`LEVEL: ${this.currentLevel}`, canvasData.canvasWidth / 2 - 72, 35);
    },

    /*Метод "drawPlayerHealthPoints()" отрисовывает текущее количество очков здоровья персонажа.
    
    Метод "drawPlayerHealthPoints()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.

    Метод "drawPlayerHealthPoints()" ничего не возвращает.*/
    drawPlayerHealthPoints: function (ctx) {
        ctx.fillStyle = '#66ff00';
        ctx.font = '30px serif';
        ctx.fillText(`HP: ${this.players.playerOne.healthPoints}`, 25, 35);
    },

    /**/
    drawGameOverScreen: function (ctx, canvasData) {
        ctx.fillStyle = '#ff4800';
        ctx.font = '30px serif';
        ctx.fillText(
            `YOU REACHED LEVEL: ${this.currentLevel}`,
            canvasData.canvasWidth / 2 - 180,
            canvasData.canvasHeight / 2
        );
    },

    /**/
    initializeMenuButtonsListening: function (
        ctx, canvasData, controls, game,
        createBullet, createEnemy, createRock, createPuddle
    ) {
        document.getElementsByClassName('interpolation-on-button')[0]
            .addEventListener(
                'click',
                () => { game.frameInterpolation = true }
            );

        document.getElementsByClassName('interpolation-off-button')[0]
            .addEventListener(
                'click',
                () => { game.frameInterpolation = false }
            );

        document.getElementsByClassName('start-button')[0]
            .addEventListener(
                'click',
                () => {
                    game.start(
                        ctx, canvasData, controls, game,
                        createBullet, createEnemy, createRock, createPuddle
                    )
                }
            );

        document.getElementsByClassName('restart-button')[0]
            .addEventListener(
                'click',
                () => { game.restart() }
            );
    },

    /*Создаем свойство "players" для хранения объекта, содержащего объекты с данными персонажах.*/
    players: {},
    /*Создаем свойство "enemies" для хранения массива, содержащего объекты с данными о врагах.*/
    enemies: [],
    /*Создаем свойство "enemyIDs" для хранения массива, содержащего ID врагов.*/
    enemyIDs: [],
    /*Создаем свойство "bullets" для хранения массива, содержащего объекты с данными о пулях.*/
    bullets: [],
    /*Создаем свойство "bulletIDs" для хранения массива, содержащего ID пуль.*/
    bulletIDs: [],
    /*Создаем свойство "rocks" для хранения массива, содержащего объекты с данными о камнях.*/
    rocks: [],
    /*Создаем свойство "rockIDs" для хранения массива, содержащего ID камней.*/
    rockIDs: [],
    /*Создаем свойство "puddles" для хранения массива, содержащего объекты с данными о лужах.*/
    puddles: [],
    /*Создаем свойство "puddleIDs" для хранения массива, содержащего ID луж.*/
    puddleIDs: [],
    /*Создаем cвойство "currentLevel" для хранения текущего номера уровня в игре.*/
    currentLevel: 0,
    /*Создаем cвойство "currrentEnemiesCount" для указания количества врагов на текущем уровне.*/
    currrentEnemiesCount: 4,
    /**/
    currentEnemiesSpeed: 0,
    /**/
    currentEnemiesShotDelay: 0,
    /**/
    currentEnemiesBulletSpeed: 0,
    /*Создаем cвойство "currentRocksCount" для указания количества камней на текущем уровне.*/
    currentRocksCount: 4,
    /*Создаем cвойство "currentPuddlesCount" для указания количества луж на текущем уровне.*/
    currentPuddlesCount: 4,
    
    /*Создаем свойство "finished", которое обозначает флаг, указывающий закончилась игра или нет.*/
    finished: false,

    /**/
    generateLevel: function (canvasData, createEnemy, createRock, createPuddle) {
        this.players.playerOne.increaseHealthPoints();
        this.players.playerOne.x = 0;
        this.players.playerOne.y = 400;
        this.players.playerOne.slowed = false;
        this.enemies.length = 0;
        this.enemyIDs.length = 0;
        this.bullets.length = 0;
        this.bulletIDs.length = 0;
        this.rocks.length = 0;
        this.rockIDs.length = 0;
        this.puddles.length = 0;
        this.puddleIDs.length = 0;
        this.currentLevel++;

        if (this.currentLevel % 3 === 0) { this.currrentEnemiesCount++ };

        if (this.currentLevel % 5 === 0) {
            if (this.currentRocksCount > 0) { this.currentRocksCount-- };
            this.currentPuddlesCount++;
        };

        for (let i = 0; i < this.currrentEnemiesCount; i++) {
            /*
            x, y,
            width, height,
            speed,
            numberOfVertices, clockwiseStepX, clockwiseStepY, canvasData,
            bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
            bulletSpeedX, bulletSpeedY, shootDelay,
            bulletOwner, bulletIDs, bullets,
            players, enemies, rocks,
            enemyIDs
            */
            createEnemy(
                mathHelper.getRandomIntFromInterval(50, 1500), mathHelper.getRandomIntFromInterval(50, 580),
                mathHelper.getRandomIntFromInterval(200, 600), mathHelper.getRandomIntFromInterval(200, 600),
                40,
                mathHelper.getRandomIntFromInterval(4, 8), 50, 100, canvasData,
                8, '#000000', 1, '#ff00d4',
                10, 10, mathHelper.getRandomIntFromInterval(20, 100),
                'enemy', this.bulletIDs, this.bullets,
                this.players, this.enemies, this.rocks,
                this.enemyIDs
            );
        };

        for (let i = 0; i < this.currentRocksCount; i++) {
            /*
            x, y,
            width, height,
            strokeStyle, lineWidth, fillStyle, canvasData,
            gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
            numberOfVertices, clockwiseStepX, clockwiseStepY,
            rocks, rockIDs
            */
            createRock(
                mathHelper.getRandomIntFromInterval(50, 1500), mathHelper.getRandomIntFromInterval(50, 580),
                mathHelper.getRandomIntFromInterval(250, 300), mathHelper.getRandomIntFromInterval(250, 300),
                'rgba(66, 66, 66, 1)', 1, 'rgba(119, 119, 119, 0.842)', canvasData,
                mathHelper.getRandomIntFromInterval(7, 12), 0.7, true, 0.9,
                mathHelper.getRandomIntFromInterval(5, 8), mathHelper.getRandomIntFromInterval(100, 200), mathHelper.getRandomIntFromInterval(100, 200),
                this.rocks, this.rockIDs
            );
        };;

        for (let i = 0; i < this.currentPuddlesCount; i++) {
            /*
            x, y,
            width, height,
            strokeStyle, lineWidth, fillStyle, canvasData,
            gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
            numberOfVertices, clockwiseStepX, clockwiseStepY,
            puddles, puddleIDs
            */
            createPuddle(
                mathHelper.getRandomIntFromInterval(0, 1700), mathHelper.getRandomIntFromInterval(0, 750),
                mathHelper.getRandomIntFromInterval(400, 500), mathHelper.getRandomIntFromInterval(400, 500),
                'rgba(112, 17, 207, 0.466)', 1, 'rgba(128, 18, 238, 0.6)', canvasData,
                mathHelper.getRandomIntFromInterval(7, 12), 0.7, false, 0.8,
                mathHelper.getRandomIntFromInterval(9, 12), 60, 60,
                this.puddles, this.puddleIDs
            );
        };
    },

    /**/
    start: function (ctx, canvasData, controls, game, createBullet, createEnemy, createRock, createPuddle) {
        document.getElementsByClassName('start-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        requestAnimationFrame(
            (timestamp) => game.gameLoop(
                timestamp, ctx, canvasData, controls, game,
                createBullet, createEnemy, createRock, createPuddle
            )
        );
    },

    /**/
    resetGameData: function () {
        this.currentLevel = 0;
        this.currrentEnemiesCount = 4;
        this.currentRocksCount = 4;
        this.currentPuddlesCount = 4;
        this.players.playerOne.x = 0;
        this.players.playerOne.y = 400;
        this.players.playerOne.slowed = false;
        this.players.playerOne.healthPoints = this.players.playerOne.maxHealthPoints;
        this.enemies.length = 0;
        this.enemyIDs.length = 0;
        this.bullets.length = 0;
        this.bulletIDs.length = 0;
        this.rocks.length = 0;
        this.rockIDs.length = 0;
        this.puddles.length = 0;
        this.puddleIDs.length = 0;
    },

    /*Метод "restart()" сбрасывает все данные игры на стартовые.    
    Метод "restart()" не принимает никаких параметров.
    Метод "restart()" ничего не возвращает.*/
    restart: function () {
        this.finished = false;
        this.resetGameData();
    },
};

/*--------------------------------------------------------------------------------------------------------------------*/

/*
x, y,
width, height,
speed, slowDebuffMultiplier,
maxHealthPoints, takeDamageDelay,
bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
bulletSpeedX, bulletSpeedY, shootDelay,
bulletOwner,
players, enemies, rocks, puddles, bullets, 
bulletIDs, enemyIDs
*/
game.players.playerOne = new Player(
    0, 400,
    50, 50,
    11, 0.4,
    3, 50,
    5, '#000000', 1, '#00ffea',
    15, 15, 2,
    'player',
    game.players, game.enemies, game.rocks, game.puddles, game.bullets,
    game.bulletIDs, game.enemyIDs
);