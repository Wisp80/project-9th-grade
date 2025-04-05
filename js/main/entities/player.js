'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { controls } from '../controls.js';
import { mathHelper } from '../../helpers/mathHelper.js';
import { game } from '../game.js';
import { createBullet } from './bullet.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

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

        /*В зависимости от нажатых одиночных кнопок "WASD" устанавливаем текущие скорости по оси X и по оси Y.*/
        if (controls.isDKeyDown) { this.currentSpeedX = currentSpeed };
        if (controls.isAKeyDown) { this.currentSpeedX = -1 * currentSpeed };
        if (controls.isSKeyDown) { this.currentSpeedY = currentSpeed };
        if (controls.isWKeyDown) { this.currentSpeedY = -1 * currentSpeed };

        /*В зависимости от нажатых диагональных комбинаций двух кнопок "WASD" устанавливаем текущие скорости по оси X и 
        по оси Y.*/
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

        /*Зануляем текущую скорость по оси X, если одновременно нажаты или отжаты кнопки "D" и "A".*/
        if ((controls.isDKeyDown && controls.isAKeyDown) || (!controls.isAKeyDown && !controls.isDKeyDown)) {
            this.currentSpeedX = 0;
        };

        /*Зануляем текущую скорость по оси Y, если одновременно нажаты или отжаты кнопки "S" и "W".*/
        if ((controls.isSKeyDown && controls.isWKeyDown) || (!controls.isSKeyDown && !controls.isWKeyDown)) {
            this.currentSpeedY = 0;
        };
    };

    /*Метод "processShootingControls()" обрабатывает нажатые игроком кнопки стрельбы.
    Метод "processShootingControls()" не принимает никаких параметров.
    Метод "processShootingControls()" ничего не возвращает.*/
    processShootingControls() {
        /*Если нажата одна из неразрешенных комбинаций кнопок стрельбы, то не персонаж не стреляет.*/
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

        /*Создаем вспомогательную локальную функцию "makeOneShot()", которая позволяет удобно создавать объекты, 
        содержащие данные о пулях.
        
        Функция "makeOneShot()" принимает следующие параметры:
        1. "x" - это числовой параметр, указывающий X-координату пули.
        2. "y" - это числовой параметр, указывающий Y-координату пули.
        3. "currentSpeedX" - это числовой параметр, указывающий текущую скорость пули по оси X.
        4. "currentSpeedY" - это числовой параметр, указывающий текущую скорость пули по оси Y.

        Функция "makeOneShot()" ничего не возвращает.*/
        const makeOneShot = (
            x, y,
            currentSpeedX, currentSpeedY
        ) => {
            /*Создаем объект, содержащий данные о пули, при помощи функции "createBullet()".*/
            createBullet(
                x, y, this.bulletRadius,
                this.bulletStrokeStyle, this.bulletLineWidth, this.bulletFillStyle,
                currentSpeedX, currentSpeedY,
                this.bulletOwner,
                this.players, this.enemies, this.rocks, this.bullets,
                this.bulletIDs
            );

            /*Устанавливаем флаг, указывающий, что персонаж недавно стрелял, то есть персонаж больше не может 
            стрелять.*/
            this.shotRecently = true;

            /*Вызываем функцию "setTimeout()", которая создает таймер на "shootDelay" милисекунд. Когда таймер истекает
            вызывается callback-функция, которая установливает флаг, указывающий, что персонаж не стрелял недавно, то 
            есть персонаж снова может стрелять.*/
            const setTimeoutID = setTimeout(
                () => {
                    this.shotRecently = false;
                    clearTimeout(setTimeoutID);
                },
                this.shootDelay
            );

            return;
        };

        /*Если персонаж недавно не стрелял, то проверяем не нажаты ли какие-то кнопки стрельбы, и если нажаты, то 
        персонаж делает выстрел в каком-то направлении.*/
        if (!this.shotRecently && controls.isUpArrowKeyDown && controls.isRightArrowKeyDown) {
            makeOneShot(
                this.x + this.width, this.y,
                this.bulletSpeedX, -1 * this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isRightArrowKeyDown && controls.isDownArrowKeyDown) {
            makeOneShot(
                this.x + this.width, this.y + this.height,
                this.bulletSpeedX, this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isDownArrowKeyDown && controls.isLeftArrowKeyDown) {
            makeOneShot(
                this.x, this.y + this.height,
                -1 * this.bulletSpeedX, this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isLeftArrowKeyDown && controls.isUpArrowKeyDown) {
            makeOneShot(
                this.x, this.y,
                -1 * this.bulletSpeedX, -1 * this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isUpArrowKeyDown) {
            makeOneShot(
                this.x + (this.width / 2), this.y,
                0, -1 * this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isRightArrowKeyDown) {
            makeOneShot(
                this.x + this.width, this.y + (this.height / 2),
                this.bulletSpeedX, 0
            );
        };

        if (!this.shotRecently && controls.isDownArrowKeyDown) {
            makeOneShot(
                this.x + (this.width / 2), this.y + this.height,
                0, this.bulletSpeedY
            );
        };

        if (!this.shotRecently && controls.isLeftArrowKeyDown) {
            makeOneShot(
                this.x, this.y + (this.height / 2),
                -1 * this.bulletSpeedX, 0
            );
        };
    };

    /*Метод "processControls()" совмещает вызовы методов "processMovingControls()" и "processShootingControls()".
    Метод "processControls()" не принимает никаких параметров.
    Метод "processControls()" ничего не возвращает.*/
    processControls() {
        this.processMovingControls();
        this.processShootingControls();
    };

    /*Метод "moveX()" обрабатывает движение персонажа по оси X.
    Метод "moveX()" не принимает никаких параметров.
    Метод "moveX()" ничего не возвращает.*/
    moveX() {
        /*Создаем переменную "nextX" для хранения X-координаты персонажа в следующем кадре, которую "предсказываем" в 
        ходе работы этого метода. Изначально эта X-координата равна текущей X-координате увеличенной на текущую скорость 
        персонажа по оси X.*/
        let nextX = this.x + this.currentSpeedX;
        /*Создаем переменную "isPredictedXChanged", которая обозначает флаг, менялась ли предсказываемая X-координата
        персонажа для следующего кадра или нет.*/
        let isPredictedXChanged = false;

        /*Если у персонажа есть ненулевая текущая скорость по оси X и есть какие-то камни на экране, то дополнительно 
        проверяем предсказываемую X-координату персонажа для следующего кадра и, если есть необходимость, корректируем 
        ее.*/
        if (this.currentSpeedX !== 0 && this.rocks.length > 0) {
            /*Поскольку движение персонажа осуществляется не как в реальной жизни, а путем "телепортирования" из одной 
            точки в другую, то на случай, если текущая скорость персонажа по оси X больше ширины персонажа, проверяем
            не получается ли так, что персонаж проскакивает через какие-то камни в следующем кадре.*/
            if (Math.abs(this.currentSpeedX) > this.width) {
                /*Создаем переменную "horizontalMovementDirection" для хранения горизонтального направления движения 
                персонажа в следующем кадре.*/
                let horizontalMovementDirection = null;
                /*Создаем переменную "predictedHorizontalPathVertices" для хранения массива вершин прямоугольника, 
                который изображает горизонатальный путь, совершаемый персонажем в следующем кадре. Вершины 
                прямоугольника в этом массиве начинаются с верхней левой вершины прямоугольника и идут дальше по часовой 
                стрелке.*/
                let predictedHorizontalPathVertices = null;

                /*Если наша текущая скорость персонажа по оси X больше 0, то это означает, что персонаж движется в
                правую сторону и путь будет совершен тоже в правую сторону. Если же наша текущая скорость персонажа по 
                оси X меньше 0, то это означает, что персонаж движется в левую сторону и путь будет совершен тоже в 
                левую сторону.*/
                if (this.currentSpeedX > 0) {
                    horizontalMovementDirection = 'right';

                    predictedHorizontalPathVertices = [
                        { x: this.x + this.width, y: this.y },
                        { x: this.x + this.width + this.currentSpeedX, y: this.y },
                        { x: this.x + this.width + this.currentSpeedX, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height }
                    ];
                } else if (this.currentSpeedX < 0) {
                    horizontalMovementDirection = 'left';

                    predictedHorizontalPathVertices = [
                        { x: this.x - Math.abs(this.currentSpeedX), y: this.y },
                        { x: this.x, y: this.y },
                        { x: this.x, y: this.y + this.height },
                        { x: this.x - Math.abs(this.currentSpeedX), y: this.y + this.height }
                    ];
                };

                /*Перебираем все камни и проверяем не пересекается ли путь, совершаемый персонажем в следующем кадре,
                с какими-то камнями. Если есть пересечения, то "выталкиваем" этот путь из пересекаемых камней.*/
                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedHorizontalPathVertices, this.rocks[i].vertices)) {
                        for (let j = 0; j < predictedHorizontalPathVertices.length; j++) {
                            predictedHorizontalPathVertices[j].x -= Math.sign(this.currentSpeedX);
                        };

                        /*Указываем, что предсказываемая X-координата изменилась.*/
                        isPredictedXChanged = true;
                    };
                };

                /*В зависимости от направления горизонтального движения персонажа в следующем кадре корректируем 
                X-координату персонажа в следующем кадре на основе откорректированного горизонтального пути, 
                совершаемого персонажем в следующем кадре.*/
                if (horizontalMovementDirection === 'right') {
                    nextX = predictedHorizontalPathVertices[1].x - this.width;
                } else if (horizontalMovementDirection === 'left') {
                    nextX = predictedHorizontalPathVertices[0].x;
                };
            };

            /*if we have not changed our raw prediction of next X yet.*/
            if (!isPredictedXChanged) {
                /*predict our position.*/
                const predictedHorizontalPositionVertices = [
                    { x: this.x + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y + this.height },
                    { x: this.x + this.currentSpeedX, y: this.y + this.height }
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

            if (!isPredictedYChanged) {
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

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'lime';
        ctx.strokeRect(this.x + this.speed, this.y, this.width, this.height);

        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'lime';
        // ctx.strokeRect(this.x - this.speed, this.y, this.width, this.height);

        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'lime';
        // ctx.strokeRect(this.x, this.y - this.speed, this.width, this.height);

        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'lime';
        // ctx.strokeRect(this.x, this.y + this.speed, this.width, this.height);

        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#00c3ff';
        // ctx.strokeRect(this.x + this.width, this.y, this.speed, this.height);

        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#00c3ff';
        // ctx.strokeRect(this.x - this.speed, this.y, this.speed, this.height);
    };
};