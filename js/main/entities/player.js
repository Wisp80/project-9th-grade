'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { controls } from '../controls.js';
import { mathHelper } from '../../helpers/mathHelper.js';
import { game } from '../game.js';
import { createBullet } from './bullet.js';

export class Player {
    constructor(
        x, y,
        width, height,
        speed, slowDebuffMultiplier,
        healthPoints, takeDamageDelay,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner,
        players, enemies, rocks, puddles, bullets, bulletIDs
    ) {
        /*X-координата персонажа.*/
        this.x = x;
        /*Y-координата персонажа.*/
        this.y = y;
        /*Ширина персонажа.*/
        this.width = width;
        /*Высота персонажа.*/
        this.height = height;
        /*Скорость передвижения персонажа.*/
        this.speed = speed;
        /*Множитель замедления передвижения персонажа, если персонаж замедлен.*/
        this.slowDebuffMultiplier = slowDebuffMultiplier;
        /*Флаг, показывающий не замедлен ли персонаж.*/
        this.slowed = false;
        /*Текущая скорость по оси X персонажа.*/
        this.currentSpeedX = 0;
        /*Текущая скорость по оси Y персонажа.*/
        this.currentSpeedY = 0;
        /*Очки здоровья персонажа.*/
        this.healthPoints = healthPoints;
        /*Время неуязвимости после получения урона персонажем.*/
        this.takeDamageDelay = takeDamageDelay;
        /*Флаг, показывающий не получил ли недавно урон персонаж.*/
        this.tookDamageRecently = false;
        /*Радиус пуль, которыми стреляет персонаж.*/
        this.bulletRadius = bulletRadius;
        /*Цвет обводки пуль, которыми стреляет персонаж.*/
        this.bulletStrokeStyle = bulletStrokeStyle;
        /*Ширина овбодки пуль, которыми стреляет персонаж.*/
        this.bulletLineWidth = bulletLineWidth;
        /*Цвет заливки пуль, которыми стреляет персонаж.*/
        this.bulletFillStyle = bulletFillStyle;
        /*Скорость пуль по оси X, которыми стреляет персонаж.*/
        this.bulletSpeedX = bulletSpeedX;
        /*Скорость пуль по оси Y, которыми стреляет персонаж.*/
        this.bulletSpeedY = bulletSpeedY;
        /*Задержка между выстрелами персонажа.*/
        this.shootDelay = shootDelay;
        /*Флаг, показывающий не стрелял ли недавно персонаж.*/
        this.shotRecently = false;
        /*Свойство, описывающее, кто владелец пуль, стреляемых персонажем.*/
        this.bulletOwner = bulletOwner;
        /*Объект, хранящий объекты, содержащие данные о персонажах.*/
        this.players = players;
        /*Массив, хранящий объекты, содержащие данные о врагах.*/
        this.enemies = enemies;
        /*Массив, хранящий объекты, содержащие данные о камнях.*/
        this.rocks = rocks;
        /*Массив, хранящий объекты, содержащие данные о лужах.*/
        this.puddles = puddles;
        /*Массив, хранящий объекты, содержащие данные о пулях.*/
        this.bullets = bullets;
        /*Массив, хранящий ID пуль.*/
        this.bulletIDs = bulletIDs;
    };

    /*Метод "processMovingControls()" обрабатывает нажатые игроком кнопки передвижения.
    Метод "processMovingControls()" не принимает никаких параметров.
    Метод "processMovingControls()" ничего не возвращает.*/
    processMovingControls() {
        /*Создаем переменную "currentSpeed" для хранения текущей скорости передвижения персонажа. Если персонаж 
        замедлен, то эта скорость равна скорости передвижения персонажа перемноженной на множитель замедления 
        передвижения персонажа, иначе эта скорость равна полной скорости передвижения персонажа.*/
        let currentSpeed;
        if (this.slowed) { currentSpeed = this.speed * this.slowDebuffMultiplier } else { currentSpeed = this.speed };

        /*В зависимости от нажатых одиночных кнопок WASD устанавливаем скорости по оси X и по оси Y.*/
        if (controls.isDKeyDown) { this.currentSpeedX = currentSpeed };
        if (controls.isAKeyDown) { this.currentSpeedX = -1 * currentSpeed };
        if (controls.isSKeyDown) { this.currentSpeedY = currentSpeed };
        if (controls.isWKeyDown) { this.currentSpeedY = -1 * currentSpeed };

        /*В зависимости от нажатых комбинаций из двух кнопок WASD устанавливаем скорости по оси X и по оси Y.*/
        if (controls.isWKeyDown && controls.isDKeyDown) {
            /*Когда объект движется по диагонали, его скорость должна быть распределена между X-направлением и 
            Y-направлением. Если просто установить одинаковую скорость по обеим осям, то фактическая скорость объекта 
            будет больше, чем задумано. Например, если скорость по оси X равна 5 и скорость по оси Y равна 5, то 
            скорость при диагональном движении по теореме Пифагора будет равна sqrt(5 * 5 + 5 * 5) ≈ 7.07.
            
            Чтобы решить эту проблему нужно сделать следующее:
            1. Найти текущую (неправильную) величину скорости при диагольном движении путем нахождения длины исходного 
            вектора скорости при диагольном движении.
            2. Произвести нормализацию исходного вектора скорости при диагольном движении путем деления длин его каждой 
            компоненты на длину исходного вектора скорости при диагольном движении. 
            3. Компоненты нормализованного исходного вектора скорости при диагольном движении умножить на ожидаемую 
            скорость, чтобы получить компоненты правильного вектора скорости при диагольном движении.

            Чтобы найти текущую (неправильную) величину скорости при диагональном движении нужно найти длину исходного 
            вектора скорости при диагольном движении. Если построить прямоугольный треугольник, где катеты будут равны 
            текущим скоростям по оси X и по оси Y, то длина гипотенузы, найденная по теореме Пифагора, в этом 
            треугольнике будет равна длине исходного вектора скорости при диагональном движении. Здесь нужно понимать, 
            что при помощи этой гипотенузы можно найти только длину исходного вектора скорости при диагональном 
            движении, но не направление этого вектора.

            Нормализация вектора - это процесс приведения вектора к единичной длине, сохраняя его направление. 
            Нормализованный вектор можно умножить на какое-то число, чтобы указать "на сколько сильно двигаться" в
            каком-то направлении. Чтобы произвести нормализацию исходного вектора скорости при диагольном движении, 
            нужно длины его компонент поделить на длину исходного вектора скорости при диагольном движении. Компоненты 
            вектора это проекции этого вектора на оси координат, то есть в нашем случае это вектора текущих скоростей по 
            оси X и по оси Y.
            
            Чтобы получить компоненты правильного вектора скорости при диагональном движении, нужно компоненты 
            нормализованного исходного вектора скорости при диагональном движении умножить на ожидаемую скорость.*/

            /*Вычисляем длину исходного вектора скорости при диагональном движении.*/
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            /*Нормализуем исходный вектор скорости при диагональном движении.*/
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;
            /*Вычисляем компоненты правильного вектора скорости при диагональном движении.*/
            this.currentSpeedX = normalizedCurrentSpeedX * currentSpeed;
            this.currentSpeedY = -1 * normalizedCurrentSpeedY * currentSpeed;
        };

        if (controls.isDKeyDown && controls.isSKeyDown) {
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;
            this.currentSpeedX = normalizedCurrentSpeedX * currentSpeed;
            this.currentSpeedY = normalizedCurrentSpeedY * currentSpeed;
        };

        if (controls.isSKeyDown && controls.isAKeyDown) {
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;
            this.currentSpeedX = -1 * normalizedCurrentSpeedX * currentSpeed;
            this.currentSpeedY = normalizedCurrentSpeedY * currentSpeed;
        };

        if (controls.isAKeyDown && controls.isWKeyDown) {
            const length = Math.sqrt(currentSpeed * currentSpeed + currentSpeed * currentSpeed);
            const normalizedCurrentSpeedX = currentSpeed / length;
            const normalizedCurrentSpeedY = currentSpeed / length;
            this.currentSpeedX = -1 * normalizedCurrentSpeedX * currentSpeed;
            this.currentSpeedY = -1 * normalizedCurrentSpeedY * currentSpeed;
        };

        /*Зануляем скорости по оси X и по оси Y если нажаты или отжаты комбинации из двух противоположных кнопок WASD.*/
        if ((controls.isDKeyDown && controls.isAKeyDown) || (!controls.isAKeyDown && !controls.isDKeyDown)) {
            this.currentSpeedX = 0;
        };

        if ((controls.isSKeyDown && controls.isWKeyDown) || (!controls.isSKeyDown && !controls.isWKeyDown)) {
            this.currentSpeedY = 0;
        };
    };

    /*Метод "processShootingControls()" обрабатывает нажатые игроком кнопки стрельбы.
    Метод "processShootingControls()" не принимает никаких параметров.
    Метод "processShootingControls()" ничего не возвращает.*/
    processShootingControls() {
        /*Если нажата одна из неразрешенных комбинаций кнопок стрельбы, то не стреляем.*/
        if (controls.isUpArrowKeyDown && controls.isDownArrowKeyDown ||
            controls.isRightArrowKeyDown && controls.isLeftArrowKeyDown ||
            controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && controls.isDownArrowKeyDown ||
            controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown ||
            controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown ||
            controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown && controls.isRightArrowKeyDown ||
            controls.isUpArrowKeyDown && controls.isRightArrowKeyDown && controls.isDownArrowKeyDown &&
            controls.isLeftArrowKeyDown
        ) {
            return;
        };

        /**/
        const makeOneShot = (
            x, y,
            currentSpeedX, currentSpeedY
        ) => {
            createBullet(
                x, y, this.bulletRadius,
                this.bulletStrokeStyle, this.bulletLineWidth, this.bulletFillStyle,
                currentSpeedX, currentSpeedY,
                this.bulletOwner,
                this.players, this.enemies, this.rocks, this.bullets,
                this.bulletIDs
            );

            this.shotRecently = true;

            const setTimeoutID = setTimeout(
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
                this.x + this.width, this.y,
                this.bulletSpeedX, -1 * this.bulletSpeedY
            );
        };

        if (controls.isRightArrowKeyDown && controls.isDownArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + this.width, this.y + this.height,
                this.bulletSpeedX, this.bulletSpeedY
            );
        };

        if (controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x, this.y + this.height,
                -1 * this.bulletSpeedX, this.bulletSpeedY
            );
        };

        if (controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x, this.y,
                -1 * this.bulletSpeedX, -1 * this.bulletSpeedY
            );
        };

        if (controls.isUpArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + (this.width / 2), this.y,
                0, -1 * this.bulletSpeedY
            );
        };

        if (controls.isRightArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + this.width, this.y + (this.height / 2),
                this.bulletSpeedX, 0
            );
        };

        if (controls.isDownArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x + (this.width / 2), this.y + this.height,
                0, this.bulletSpeedY
            );
        };

        if (controls.isLeftArrowKeyDown && !this.shotRecently) {
            makeOneShot(
                this.x, this.y + (this.height / 2),
                -1 * this.bulletSpeedX, 0
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

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(chosenPredictedWayVertices, this.rocks[i].vertices)) {
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

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedHorizontalPositionVertices, this.rocks[i].vertices)) {
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

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(chosenPredictedWayVertices, this.rocks[i].vertices)) {
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

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedVerticalPositionVertices, this.rocks[i].vertices)) {
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
        if (nextY + this.height >= canvasData.canvasHeight) { nextY = canvasData.canvasHeight - this.height };

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

        for (let i = 0; i < this.enemies.length; i++) {
            if (mathHelper.doTwoPolygonsIntersect(playerVertices, this.enemies[i].vertices)) {
                if (!this.tookDamageRecently) {
                    this.tookDamageRecently = true;
                    this.healthPoints--;

                    const setTimeoutID = setTimeout(
                        () => {
                            this.tookDamageRecently = false;
                            clearTimeout(setTimeoutID)
                        },
                        this.takeDamageDelay
                    );
                };
            };
        };

        for (let i = 0; i < this.puddles.length; i++) {
            if (mathHelper.doTwoPolygonsIntersect(playerVertices, this.puddles[i].vertices)) {
                this.slowed = true;
                return;
            };
        };

        this.slowed = false;
    };

    draw() {
        // Добавляем в ваш код:
        const angle = (game.ticks % 360) * Math.PI / 180; // Переводим градусы в радианы
        const length = Math.sqrt(this.width * this.width + this.height * this.height); // Длина градиента

        // Вычисляем новые координаты для градиента (чтобы он вращался)
        const gradientX1 = this.x + this.width / 2 + Math.cos(angle) * length / 2;
        const gradientY1 = this.y + this.height / 2 + Math.sin(angle) * length / 2;
        const gradientX2 = this.x + this.width / 2 - Math.cos(angle) * length / 2;
        const gradientY2 = this.y + this.height / 2 - Math.sin(angle) * length / 2;

        // Создаем градиент с новыми координатами
        const gradient = ctx.createLinearGradient(gradientX1, gradientY1, gradientX2, gradientY2);


        // Добавляем цветовые остановки (от 0 до 1)
        const hue = (game.ticks % 360); // Используем остаток от деления, чтобы hue был в диапазоне 0-359
        gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
        gradient.addColorStop(0.1, `hsl(${(hue + 10) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.2, `hsl(${(hue + 20) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.3, `hsl(${(hue + 35) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.4, `hsl(${(hue + 45) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.6, `hsl(${(hue + 70) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.7, `hsl(${(hue + 85) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.8, `hsl(${(hue + 95) % 360}, 100%, 50%)`);
        gradient.addColorStop(0.9, `hsl(${(hue + 110) % 360}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${(hue + 120) % 360}, 100%, 50%)`);

        // Устанавливаем градиент как заливку
        ctx.fillStyle = gradient;

        // Рисуем прямоугольник
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};