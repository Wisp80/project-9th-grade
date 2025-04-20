'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

/*Класс "Player" создает объекты, содержащие данные о персонаже.

Класс "Player" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату персонажа.
2. "y" - это числовой параметр, указывающий Y-координату персонажа.
3. "width" - это числовой параметр, указывающий ширину персонажа.
4. "height" - это числовой параметр, указывающий высоту персонажа.
5. "speed" - это числовой параметр, указывающий скорость передвижения персонажа.
6. "slowDebuffMultiplier" - это числовой параметр, указывающий множитель замедления передвижения персонажа, если 
персонаж замедлен.
7. "healthPoints" - это числовой параметр, указывающий очки здоровья персонажа.
8. "takeDamageDelay" - это числовой параметр, указывающий время неуязвимости после получения урона персонажем.
9. "bulletRadius" - это числовой параметр, указывающий радиус пуль, которыми стреляет персонаж.
10. "bulletStrokeStyle" - это строковой параметр, указывающий цвет обводки пуль, которыми стреляет персонаж.
11. "bulletLineWidth" - это числовой параметр, указывающий ширину обводки пуль, которыми стреляет персонаж.
12. "bulletFillStyle" - это строковой параметр, указывающий цвет заливки пуль, которыми стреляет персонаж.
13. "bulletSpeedX" - это числовой параметр, указывающий скорость пуль по оси X, которыми стреляет персонаж.
14. "bulletSpeedY" - это числовой параметр, указывающий скорость пуль по оси Y, которыми стреляет персонаж.
15. "shootDelay" - это числовой параметр, указывающий задержку между выстрелами персонажа в рассчитанных кадрах.
16. "bulletOwner" - это строковой параметр, указывающий кто владелец пуль, стреляемых персонажем.
17. "players" - это параметр в виде объекта, содержащего объекты, которые содержат данные о персонажах.
18. "enemies" - это параметр в виде массива, содержащего объекты, которые содержат данные о врагах.
19. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
20. "puddles" - это параметр в виде массива, содержащего объекты, которые содержат данные о лужах.
21. "bullets" - это параметр в виде массива, содержащего объекты, которые содержат данные о пулях.
22. "bulletIDs" - это параметр в виде массива, содержащего ID пуль.
23. "enemyIDs" - это параметр в виде массива, содержащего ID врагов.*/
export class Player {
    constructor(
        x, y,
        width, height,
        speed, slowDebuffMultiplier,
        maxHealthPoints, takeDamageDelay,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner,
        players, enemies, rocks, puddles, bullets,
        bulletIDs, enemyIDs
    ) {
        /*X-координата персонажа.*/
        this.x = x;
        /*Y-координата персонажа.*/
        this.y = y;
        /*X-координата персонажа в предыдущем кадре.*/
        this.previousX = 0;
        /*Y-координата персонажа в предыдущем кадре.*/
        this.previousY = 0;
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
        /*Максимальное количество очков здоровья персонажа.*/
        this.maxHealthPoints = maxHealthPoints;
        /*Очки здоровья персонажа.*/
        this.healthPoints = maxHealthPoints;
        /*Время неуязвимости после получения урона персонажем в рассчитанных кадрах.*/
        this.takeDamageDelay = takeDamageDelay;
        /*Флаг, показывающий не получил ли недавно урон персонаж.*/
        this.tookDamageRecently = false;
        /*Номер рассчитанного кадра, когда был последний раз получен урон персонажем.*/
        this.lastTakingDamageCalculatedFrame = 0;
        /*Радиус пуль, которыми стреляет персонаж.*/
        this.bulletRadius = bulletRadius;
        /*Цвет обводки пуль, которыми стреляет персонаж.*/
        this.bulletStrokeStyle = bulletStrokeStyle;
        /*Ширина обводки пуль, которыми стреляет персонаж.*/
        this.bulletLineWidth = bulletLineWidth;
        /*Цвет заливки пуль, которыми стреляет персонаж.*/
        this.bulletFillStyle = bulletFillStyle;
        /*Скорость пуль по оси X, которыми стреляет персонаж.*/
        this.bulletSpeedX = bulletSpeedX;
        /*Скорость пуль по оси Y, которыми стреляет персонаж.*/
        this.bulletSpeedY = bulletSpeedY;
        /*Задержка между выстрелами персонажа в рассчитанных кадрах.*/
        this.shootDelay = shootDelay;
        /*Флаг, показывающий не стрелял ли недавно персонаж.*/
        this.shotRecently = false;
        /*Номер рассчитанного кадра, когда был сделан последний выстрел.*/
        this.lastShotCalculatedFrame = 0;
        /*Свойство, описывающее, кто владелец пуль, стреляемых персонажем.*/
        this.bulletOwner = bulletOwner;
        /*Объект, содержащий объекты, содержащие данные о персонажах.*/
        this.players = players;
        /*Массив, содержащий объекты, содержащие данные о врагах.*/
        this.enemies = enemies;
        /*Массив, содержащий объекты, содержащие данные о камнях.*/
        this.rocks = rocks;
        /*Массив, содержащий объекты, содержащие данные о лужах.*/
        this.puddles = puddles;
        /*Массив, содержащий объекты, содержащие данные о пулях.*/
        this.bullets = bullets;
        /*Массив, содержащий ID пуль.*/
        this.bulletIDs = bulletIDs;
        /*Массив, содержащий ID врагов.*/
        this.enemyIDs = enemyIDs;
    };

    /*Метод "processMovingControls()" обрабатывает нажатые игроком кнопки передвижения.
    
    Метод "processMovingControls()" принимает следующие параметры:
    1. "controls" - это параметр в виде объекта, обрабатывающего нажатие и отжатие кнопок управления в игре.

    Метод "processMovingControls()" ничего не возвращает.*/
    processMovingControls(controls) {
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
        по оси Y. Если необходимо, то корректируем скорость при диагональном движении при помощи метода 
        "mathHelper.correctDiagonalMovementSpeed()".*/
        if (
            controls.isWKeyDown && controls.isDKeyDown ||
            controls.isDKeyDown && controls.isSKeyDown ||
            controls.isSKeyDown && controls.isAKeyDown ||
            controls.isAKeyDown && controls.isWKeyDown
        ) {
            const correctSpeeds = mathHelper.correctDiagonalMovementSpeed(this.currentSpeedX, this.currentSpeedY);
            this.currentSpeedX = correctSpeeds.correctCurrentSpeedX;
            this.currentSpeedY = correctSpeeds.correctCurrentSpeedY;
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
    
    Метод "processShootingControls()" принимает следующие параметры:
    1. "controls" - это параметр в виде объекта, обрабатывающего нажатие и отжатие кнопок управления в игре.
    2. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    3. "createBullet" - это параметр в виде функции, которая создает объект, содержащий данные о пуле, на основе класса 
    "Bullet" и помещает этот объект в массив, куда должны сохраняться такие объекты.

    Метод "processShootingControls()" ничего не возвращает.*/
    processShootingControls(controls, game, createBullet) {
        /*Если с момента последнего выстрела персонажа прошло достаточно рассчитанных кадров, то устанавливаем флаг, 
        указывающий, что персонаж недавно не стрелял, то есть персонаж снова может стрелять.*/
        if (game.totalCalculatedFrames - this.lastShotCalculatedFrame > this.shootDelay) { this.shotRecently = false };

        /*Если нажата одна из неразрешенных комбинаций кнопок стрельбы, то персонаж не стреляет.*/
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
                this.bulletIDs, this.enemyIDs
            );

            /*Устанавливаем флаг, указывающий, что персонаж недавно стрелял, то есть персонаж больше не может 
            стрелять.*/
            this.shotRecently = true;
            /*Сохраняем номер рассчитанного кадра, когда был сделан последний выстрел.*/
            this.lastShotCalculatedFrame = game.totalCalculatedFrames;
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
    
    Метод "processControls()" принимает следующие параметры:
    1. "controls" - это параметр в виде объекта, обрабатывающего нажатие и отжатие кнопок управления в игре.
    2. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    3. "createBullet" - это параметр в виде функции, которая создает объект, содержащий данные о пуле, на основе класса 
    "Bullet" и помещает этот объект в массив, куда должны сохраняться такие объекты.
    
    Метод "processControls()" ничего не возвращает.*/
    processControls(controls, game, createBullet) {
        this.processMovingControls(controls);
        this.processShootingControls(controls, game, createBullet);
    };

    /*Метод "checkRocksCollisionX()" обрабатывает коллизию персонажа с камнями при движении по оси X.
    
    Метод "checkRocksCollisionX()" принимает следующие параметры:
    1. "nextX" - это числовой параметр, указывающий X-координату персонажа в следующем кадре.

    Метод "checkRocksCollisionX()" возвращает откорректированную X-координату персонажа в следующем кадре.*/
    checkRocksCollisionX(nextX) {
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
                /*Создаем переменную "predictedHorizontalPathVertices" для хранения массива объектов, содержащих 
                координаты вершин прямоугольника, который изображает горизонтальный путь, совершаемый персонажем в
                следующем кадре. Вершины прямоугольника в этом массиве начинаются с верхней левой вершины прямоугольника 
                и идут дальше по часовой стрелке.*/
                let predictedHorizontalPathVertices = null;

                /*Если текущая скорость персонажа по оси X больше 0, то это означает, что персонаж движется в правую 
                сторону и путь будет совершен тоже в правую сторону. Если же текущая скорость персонажа по оси X меньше 
                0, то это означает, что персонаж движется в левую сторону и путь будет совершен тоже в левую сторону.*/
                if (this.currentSpeedX > 0) {
                    horizontalMovementDirection = 'right';

                    predictedHorizontalPathVertices = [
                        { x: this.x + this.width, y: this.y },
                        { x: this.x + this.width + this.speed, y: this.y },
                        { x: this.x + this.width + this.speed, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height }
                    ];
                } else if (this.currentSpeedX < 0) {
                    horizontalMovementDirection = 'left';

                    predictedHorizontalPathVertices = [
                        { x: this.x - this.speed, y: this.y },
                        { x: this.x, y: this.y },
                        { x: this.x, y: this.y + this.height },
                        { x: this.x - this.speed, y: this.y + this.height }
                    ];
                };

                /*Перебираем все камни и проверяем не пересекается ли горизонтальный путь, совершаемый персонажем в 
                следующем кадре, с какими-то камнями. Если есть пересечения, то "выталкиваем" этот путь из пересекаемых 
                камней.*/
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

            /*Если к этому моменту предсказываемая X-координата не изменялась, проверяем не оказывается ли персонаж
            внутри какого-нибудь камня в следующем кадре.*/
            if (!isPredictedXChanged) {
                /*Создаем переменную "predictedHorizontalPositionVertices" для хранения массива объектов, содержащих 
                координаты вершин прямоугольника, который изображает позицию персонажа в следующем кадре при 
                горизонтальном движении. Вершины прямоугольника в этом массиве начинаются с верхней левой вершины 
                прямоугольника и идут дальше по часовой стрелке.*/
                const predictedHorizontalPositionVertices = [
                    { x: this.x + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y },
                    { x: this.x + this.width + this.currentSpeedX, y: this.y + this.height },
                    { x: this.x + this.currentSpeedX, y: this.y + this.height }
                ];

                /*Перебираем все камни и проверяем не пересекается ли позиция персонажа в следующем кадре при 
                горизонтальном движении, с какими-то камнями. Если есть пересечения, то "выталкиваем" эту позицию из 
                пересекаемых камней.*/
                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(
                        predictedHorizontalPositionVertices, this.rocks[i].vertices
                    )) {
                        for (let j = 0; j < predictedHorizontalPositionVertices.length; j++) {
                            predictedHorizontalPositionVertices[j].x -= Math.sign(this.currentSpeedX);
                        };

                        isPredictedXChanged = true;
                    };
                };

                /*Получив "безопасную" позицию персонажа в следующем кадре при горизонтальном движении, указываем что
                ее минимальная X-координата является предсказываемой X-координатой персонажа в следующем кадре.*/
                nextX = predictedHorizontalPositionVertices[0].x;
            };
        };

        /*Возвращаем откорректированную X-координату персонажа в следующем кадре.*/
        return nextX;
    };

    /*Метод "checkCanvasCollisionX()" обрабатывает коллизию персонажа с холстом при движении по оси X.
    
    Метод "checkCanvasCollisionX()" принимает следующие параметры:
    1. "nextX" - это числовой параметр, указывающий X-координату персонажа в следующем кадре.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "checkCanvasCollisionX()" возвращает откорректированную X-координату персонажа в следующем кадре.*/
    checkCanvasCollisionX(nextX, canvasData) {
        /*Проверяем не получается ли так, что предсказываемая X-координата персонажа в следующем кадре находится за 
        пределами холста. Если это так, то корректируем ее.*/
        if (nextX <= 0) { nextX = 1 };
        if (nextX + this.width >= canvasData.canvasWidth) { nextX = canvasData.canvasWidth - this.width };
        /*Возвращаем откорректированную X-координату персонажа в следующем кадре.*/
        return nextX;
    };

    /*Метод "moveX()" обрабатывает движение персонажа по оси X.
    
    Метод "moveX()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "moveX()" ничего не возвращает.*/
    moveX(canvasData) {
        /*Сохраняем предыдущую X-координату персонажа. Это нужно для отрисовки персонажа с учетом интерполяции.*/
        this.previousX = this.x;
        /*Создаем переменную "nextX" для хранения X-координаты персонажа в следующем кадре, которую "предсказываем" в 
        ходе работы этого метода. Изначально эта X-координата равна текущей X-координате увеличенной на текущую скорость 
        персонажа по оси X.*/
        let nextX = this.x + this.currentSpeedX;
        /*Обрабатываем коллизию персонажа с камнями при движении по оси X при помощи метода "checkCollisionX()".*/
        nextX = this.checkRocksCollisionX(nextX);
        /*Обрабатываем коллизию персонажа с холстом при движении по оси X при помощи метода "checkCanvasCollisionX()".*/
        nextX = this.checkCanvasCollisionX(nextX, canvasData)
        /*Указываем, что X-координата персонажа в следующем кадре равна полностью откорректированной предсказываемой 
        X-координате персонажа в следующем кадре.*/
        this.x = nextX;
    };

    /*Метод "checkRocksCollisionY()" обрабатывает коллизию персонажа с камнями при движении по оси Y.
    
    Метод "checkRocksCollisionY()" принимает следующие параметры:
    1. "nextY" - это числовой параметр, указывающий Y-координату персонажа в следующем кадре.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "checkRocksCollisionY()" возвращает откорректированную Y-координату персонажа в следующем кадре.*/
    checkRocksCollisionY(nextY) {
        /*Метод "checkCollisionY()" работает аналогично, как и метод "checkCollisionX()".*/
        let isPredictedYChanged = false;

        if (this.currentSpeedY !== 0 && this.rocks.length > 0) {
            if (Math.abs(this.currentSpeedY) > this.height) {
                let verticalMovementDirection = null;
                let predictedVerticalPathVertices = null;

                if (this.currentSpeedY > 0) {
                    verticalMovementDirection = 'down';

                    predictedVerticalPathVertices = [
                        { x: this.x, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height },
                        { x: this.x + this.width, y: this.y + this.height + this.speed },
                        { x: this.x, y: this.y + this.height + this.speed }
                    ];
                } else if (this.currentSpeedY < 0) {
                    verticalMovementDirection = 'up';

                    predictedVerticalPathVertices = [
                        { x: this.x, y: this.y - this.speed },
                        { x: this.x + this.width, y: this.y - this.speed },
                        { x: this.x + this.width, y: this.y },
                        { x: this.x, y: this.y }
                    ];
                };

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(predictedVerticalPathVertices, this.rocks[i].vertices)) {
                        for (let j = 0; j < predictedVerticalPathVertices.length; j++) {
                            predictedVerticalPathVertices[j].y -= Math.sign(this.currentSpeedY);
                        };

                        isPredictedYChanged = true;
                    };
                };

                if (verticalMovementDirection === 'down') {
                    nextY = predictedVerticalPathVertices[3].y - this.height;
                } else if (verticalMovementDirection === 'up') {
                    nextY = predictedVerticalPathVertices[0].y;
                };
            };

            if (!isPredictedYChanged) {
                const predictedVerticalPositionVertices = [
                    { x: this.x, y: this.y + this.currentSpeedY },
                    { x: this.x + this.width, y: this.y + this.currentSpeedY },
                    { x: this.x + this.width, y: this.y + this.currentSpeedY + this.height },
                    { x: this.x, y: this.y + this.currentSpeedY + this.height }
                ];

                for (let i = 0; i < this.rocks.length; i++) {
                    while (mathHelper.doTwoPolygonsIntersect(
                        predictedVerticalPositionVertices, this.rocks[i].vertices
                    )) {
                        for (let j = 0; j < predictedVerticalPositionVertices.length; j++) {
                            predictedVerticalPositionVertices[j].y -= Math.sign(this.currentSpeedY);
                        };

                        isPredictedYChanged = true;
                    };
                };

                nextY = predictedVerticalPositionVertices[0].y;
            };
        };

        return nextY;
    };

    /*Метод "checkCanvasCollisionY()" обрабатывает коллизию персонажа с холстом при движении по оси Y.
    
    Метод "checkCanvasCollisionY()" принимает следующие параметры:
    1. "nextY" - это числовой параметр, указывающий Y-координату персонажа в следующем кадре.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "checkCanvasCollisionY()" возвращает откорректированную Y-координату персонажа в следующем кадре.*/
    checkCanvasCollisionY(nextY, canvasData) {
        /*Метод "checkCanvasCollisionY()" работает аналогично, как и метод "checkCanvasCollisionX()".*/
        if (nextY <= 0) { nextY = 1 };
        if (nextY + this.height >= canvasData.canvasHeight) { nextY = canvasData.canvasHeight - this.height };
        return nextY;
    };

    /*Метод "moveY()" обрабатывает движение персонажа по оси Y.
    
    Метод "moveY()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "moveY()" ничего не возвращает.*/
    moveY(canvasData) {
        /*Метод "moveY()" работает аналогично, как и метод "moveX()".*/
        this.previousY = this.y;
        let nextY = this.y + this.currentSpeedY;
        nextY = this.checkRocksCollisionY(nextY);
        nextY = this.checkCanvasCollisionY(nextY, canvasData)
        this.y = nextY;
    };

    /*Метод "findCurrentPlayerVertices()" определяет вершины текущей прямоугольной позиции персонажа.
    Метод "findCurrentPlayerVertices()" не принимает никаких параметров.
    Метод "findCurrentPlayerVertices()" возвращает массив объектов, содержащих координаты вершин текущей прямоугольной 
    позиции персонажа.*/
    findCurrentPlayerVertices() {
        return [
            { x: this.x, y: this.y },
            { x: this.x + this.width, y: this.y },
            { x: this.x + this.width, y: this.y + this.height },
            { x: this.x, y: this.y + this.height }
        ];
    };

    /*Метод "decreaseHealthPoints()" понижает здоровье персонажа на 1.
    Метод "decreaseHealthPoints()" не принимает никаких параметров.
    Метод "decreaseHealthPoints()" ничего не возвращает.*/
    decreaseHealthPoints() {
        if (this.healthPoints > 0) { this.healthPoints-- }
    };

    /*Метод "increaseHealthPoints()" повышает здоровье персонажа на 1.
    Метод "increaseHealthPoints()" не принимает никаких параметров.
    Метод "increaseHealthPoints()" ничего не возвращает.*/
    increaseHealthPoints() {
        if (this.healthPoints > 0 && this.healthPoints < this.maxHealthPoints) { this.healthPoints++ }
    };

    /*Метод "takeDamageIfTouchedByEnemy()" понижает здоровье персонажа на 1, если персонаж касается врага.
    
    Метод "takeDamageIfTouchedByEnemy()" принимает следующие параметры:
    1. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "takeDamageIfTouchedByEnemy()" ничего не возвращает.*/
    takeDamageIfTouchedByEnemy(game) {
        /*Если с момента последнего получения урона персонажем прошло достаточно рассчитанных кадров, то устанавливаем 
        флаг, указывающий, что персонаж недавно не получал урон, то есть персонаж снова может получить урон.*/
        if (game.totalCalculatedFrames - this.lastTakingDamageCalculatedFrame > this.takeDamageDelay) {
            this.tookDamageRecently = false;
        };

        /*Если персонаж недавно не получал урон, то проверяем не касается ли он какого-то врага.*/
        if (!this.tookDamageRecently) {
            /*Находим массив объектов, содержащих координаты вершин текущей прямоугольной позиции персонажа, при помощи 
            метода "findCurrentPlayerVertices()".*/
            const playerVertices = this.findCurrentPlayerVertices();

            /*Перебираем все врагов и проверяем не касается ли персонаж кого-то из них. Если это так, то персонаж теряет 
            одно очко здоровья при помощи метода "decreaseHealthPoints()".*/
            for (let i = 0; i < this.enemies.length; i++) {
                if (mathHelper.doTwoPolygonsIntersect(playerVertices, this.enemies[i].vertices)) {
                    this.lastTakingDamageCalculatedFrame = game.totalCalculatedFrames;
                    this.tookDamageRecently = true;
                    this.decreaseHealthPoints();
                };
            };
        };
    };

    /*Метод "checkPuddlesCollision()" обрабатывает коллизию персонажа с лужами.
    Метод "checkPuddlesCollision()" не принимает никаких параметров.
    Метод "checkPuddlesCollision()" ничего не возвращает.*/
    checkPuddlesCollision() {
        const playerVertices = this.findCurrentPlayerVertices();

        /*Проверяем не касается ли персонаж луж. Если это так, то замедляем его.*/
        for (let i = 0; i < this.puddles.length; i++) {
            if (mathHelper.doTwoPolygonsIntersect(playerVertices, this.puddles[i].vertices)) {
                this.slowed = true;
                return;
            };
        };

        /*Если же персонаж не касается луж, то убираем его замедление.*/
        this.slowed = false;
    };

    /*Метод "move()" совмещает вызовы методов "moveX()", "moveY()", "takeDamageIfTouchedByEnemy()" и 
    "checkPuddlesCollision()".    
    
    Метод "move()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
    2. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "move()" ничего не возвращает.*/
    move(canvasData, game) {
        this.moveX(canvasData);
        this.moveY(canvasData);
        this.takeDamageIfTouchedByEnemy(game);
        this.checkPuddlesCollision();
    };

    /*Метод "drawPredictedPositions()" отрисовывает предсказанные позиции персонажа в следующем кадре.

    Метод "drawPredictedPositions()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "frameInterpolation" - это булев параметр, указывающий нужно ли делать отрисовку с учетом интерполяции кадров.
    3. "interpolatedX" - это числовой параметр, указывающий X-координату персонажа с учетом интерполяции кадров.
    4. "interpolatedY" - это числовой параметр, указывающий Y-координату персонажа с учетом интерполяции кадров.
    
    Метод "drawPredictedPositions()" ничего не возвращает.*/
    drawPredictedPositions(ctx, frameInterpolation, interpolatedX, interpolatedY) {
        if (frameInterpolation) {
            /*Отрисовываем предсказанную позицию персонажа в следующем кадре с учетом интерполяции.*/
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 153, 0, 1)';
            ctx.strokeRect(interpolatedX + this.speed, interpolatedY, this.width, this.height);
            ctx.strokeRect(interpolatedX - this.speed, interpolatedY, this.width, this.height);
            ctx.strokeRect(interpolatedX, interpolatedY - this.speed, this.width, this.height);
            ctx.strokeRect(interpolatedX, interpolatedY + this.speed, this.width, this.height);
        } else {
            /*Отрисовываем предсказанную позицию персонажа в следующем кадре без учета интерполяции.*/
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 153, 0, 1)';
            ctx.strokeRect(this.x + this.speed, this.y, this.width, this.height);
            ctx.strokeRect(this.x - this.speed, this.y, this.width, this.height);
            ctx.strokeRect(this.x, this.y - this.speed, this.width, this.height);
            ctx.strokeRect(this.x, this.y + this.speed, this.width, this.height);
        };
    };

    /*Метод "drawPredictedPaths()" отрисовывает предсказанные пути персонажа, которые пройдет персонаж в следующем 
    кадре.

    Метод "drawPredictedPaths()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "frameInterpolation" - это булев параметр, указывающий нужно ли делать отрисовку с учетом интерполяции кадров.
    3. "interpolatedX" - это числовой параметр, указывающий X-координату персонажа с учетом интерполяции кадров.
    4. "interpolatedY" - это числовой параметр, указывающий Y-координату персонажа с учетом интерполяции кадров.
    
    Метод "drawPredictedPaths()" ничего не возвращает.*/
    drawPredictedPaths(ctx, frameInterpolation, interpolatedX, interpolatedY) {
        if (frameInterpolation) {
            /*Отрисовываем предсказанный путь, который пройдет персонаж в следующем кадре, с учетом интерполяции.*/
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(14, 215, 230, 1)';
            ctx.strokeRect(interpolatedX + this.width, interpolatedY, this.speed - this.width, this.height);
            ctx.strokeRect(interpolatedX - this.speed + this.width, interpolatedY, this.speed - this.width, this.height);
            ctx.strokeRect(interpolatedX, interpolatedY - this.speed + this.height, this.width, this.speed - this.height);
            ctx.strokeRect(interpolatedX, interpolatedY + this.height, this.width, this.speed - this.height);
        } else {
            /*Отрисовываем предсказанный путь, который пройдет персонаж в следующем кадре, без учета интерполяции.*/
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(14, 215, 230, 1)';
            ctx.strokeRect(this.x + this.width, this.y, this.speed - this.width, this.height);
            ctx.strokeRect(this.x - this.speed + this.width, this.y, this.speed - this.width, this.height);
            ctx.strokeRect(this.x, this.y - this.speed + this.height, this.width, this.speed - this.height);
            ctx.strokeRect(this.x, this.y + this.height, this.width, this.speed - this.height);
        };
    };

    /*Метод "draw()" отрисовывает персонажа.

    Метод "draw()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "interpolationFactor" - это числовой параметр, указывающий коэффициент интерполяции для создания промежуточных
    кадров с целью осуществления плавной отрисовки при движении.
    3. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    
    Метод "draw()" ничего не возвращает.*/
    draw(ctx, interpolationFactor, game) {
        /*Устанавливаем цвет заливки в зависимости получал ли недавно урон персонаж или нет.*/
        if (this.tookDamageRecently) {
            ctx.fillStyle = 'rgba(216, 31, 25, 0.726)';
        } else {
            ctx.fillStyle = 'rgba(50, 65, 62, 0.527)'
        };

        /*Создаем градиент в области персонажа на основе общего количества рассчитанных кадров в игре при помощи метода
        "graphicsHelper.createGradientBasedOnTotalCalculatedFrames()".*/
        const gradient = graphicsHelper.createGradientBasedOnTotalCalculatedFrames(
            ctx, game.totalCalculatedFrames, this.x, this.y, this.width, this.height
        );
        
        /*Устанавливаем градиент как цвет линии обводки.*/
        ctx.strokeStyle = gradient;
        /*Устанавливаем ширину линии обводки.*/
        ctx.lineWidth = 4;

        /*Отрисовываем персонажа.*/
        if (game.frameInterpolation) {
            /*Рассчитываем X-координату и Y-координату персонажа для отрисовки с учетом интерполяции по формуле:
            previousFrameX + (currentFrameX - previousFrameX) * interpolationFactor. Интерполяция нужна для создания 
            промежуточных кадров, которые добавляют плавности движению.*/
            const x = this.previousX + (this.x - this.previousX) * interpolationFactor;
            const y = this.previousY + (this.y - this.previousY) * interpolationFactor;
            /*Отрисовываем персонажа в виде прямоугольника с учетом интерполяции.*/
            ctx.fillRect(x, y, this.width, this.height);
            /*Обводим персонажа с учетом интерполяции.*/
            ctx.strokeRect(x, y, this.width, this.height);
        } else {
            /*Отрисовываем персонажа в виде прямоугольника без учета интерполяции. Это нужно только для тестирования.*/
            ctx.fillRect(this.x, this.y, this.width, this.height);
            /*Обводим персонажа без учета интерполяции. Это нужно только для тестирования.*/
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        };

        /*Отрисовываем предсказанные позиции персонажа в следующем кадре и предсказанные пути, которые пройдет персонаж 
        в следующем кадре. Это нужно только для тестирования.*/
        // this.drawPredictedPositions(ctx, game.frameInterpolation, x, y);
        // this.drawPredictedPaths(ctx, game.frameInterpolation, x, y);
    };
};