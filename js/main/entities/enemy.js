'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

/*Класс "Enemy" создает объекты, содержащие данные о враге.

Класс "Enemy" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату врага.
2. "y" - это числовой параметр, указывающий Y-координату врага.
3. "width" - это числовой параметр, указывающий ширину врага.
4. "height" - это числовой параметр, указывающий высоту врага.
5. "speed" - это числовой параметр, указывающий скорость передвижения врага.
6. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
врага.
7. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму врага, 
друг от друга.
8. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму врага, 
друг от друга.
9. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
10. "bulletRadius" - это числовой параметр, указывающий радиус пуль, которыми стреляет враг.
11. "bulletStrokeStyle" - это строковой параметр, указывающий цвет обводки пуль, которыми стреляет враг.
12. "bulletLineWidth" - это числовой параметр, указывающий ширину обводки пуль, которыми стреляет враг.
13. "bulletFillStyle" - это строковой параметр, указывающий цвет заливки пуль, которыми стреляет враг.
14. "bulletSpeedX" - это числовой параметр, указывающий скорость пуль по оси X, которыми стреляет враг.
15. "bulletSpeedY" - это числовой параметр, указывающий скорость пуль по оси Y, которыми стреляет враг.
16. "shootDelay" - это числовой параметр, указывающий задержку между выстрелами врага в рассчитанных кадрах.
17. "bulletOwner" - это строковой параметр, указывающий кто владелец пуль, стреляемых врагом.
18. "bulletIDs" - это параметр в виде массива, содержащего ID пуль.
19. "bullets" - это параметр в виде массива, содержащего объекты, которые содержат данные о пулях.
20. "players" - это параметр в виде объекта, содержащего объекты, которые содержат данные о персонажах.
21. "enemies" - это параметр в виде массива, содержащего объекты, которые содержат данные о врагах.
22. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
23. "enemyIDs" - это параметр в виде массива, содержащего ID врагов.
24. "ID" - это строковой параметр, указывающий ID врага.*/
class Enemy {
    constructor(
        x, y,
        width, height,
        speed,
        numberOfVertices, clockwiseStepX, clockwiseStepY, canvasData,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, bulletIDs, bullets,
        players, enemies, rocks,
        enemyIDs, ID
    ) {
        /*X-координата врага.*/
        this.x = x;
        /*Y-координата врага.*/
        this.y = y;
        /*Ширина врага.*/
        this.width = width;
        /*Высота врага.*/
        this.height = height;
        /*Цвет врага.*/
        this.color = 'rgba(48, 48, 44, 0.6)';
        /*Скорость передвижения врага.*/
        this.speed = speed;
        /*Количество вершин многоугольника, который обозначает форму врага.*/
        this.numberOfVertices = numberOfVertices;
        /*Параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, который обозначает форму 
        врага, друг от друга.*/
        this.clockwiseStepX = clockwiseStepX;
        /*Параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, который обозначает форму 
        врага, друг от друга.*/
        this.clockwiseStepY = clockwiseStepY;

        /*Объект с координатами вершин многоугольника, который обозначает форму врага.*/
        this.vertices = mathHelper.preparePolygonVerticesData(
            numberOfVertices,
            this.x, this.x + this.width,
            this.y, this.y + this.height,
            this.clockwiseStepX, this.clockwiseStepY,
            canvasData.cellWidth, canvasData.cellHeight,
            true
        );

        /*Массив для хранения координат вершин многоугольника, который обозначает форму врага, в предыдущем кадре.*/
        this.previousVertices = [{ x: 0, y: 0 }];
        /*Радиус пуль, которыми стреляет враг.*/
        this.bulletRadius = bulletRadius;
        /*Цвет обводки пуль, которыми стреляет враг.*/
        this.bulletStrokeStyle = bulletStrokeStyle;
        /*Ширина обводки пуль, которыми стреляет враг.*/
        this.bulletLineWidth = bulletLineWidth;
        /*Цвет заливки пуль, которыми стреляет враг.*/
        this.bulletFillStyle = bulletFillStyle;
        /*Скорость пуль по оси X, которыми стреляет враг.*/
        this.bulletSpeedX = bulletSpeedX;
        /*Скорость пуль по оси Y, которыми стреляет враг.*/
        this.bulletSpeedY = bulletSpeedY;
        /*Задержка между выстрелами врага в рассчитанных кадрах.*/
        this.shootDelay = shootDelay;
        /*Флаг, показывающий не стрелял ли недавно враг.*/
        this.shotRecently = false;
        /*Номер кадра, когда был сделан последний выстрел.*/
        this.lastShotFrame = 0;
        /*Свойство, описывающее, кто владелец пуль, стреляемых врагом.*/
        this.bulletOwner = bulletOwner;
        /*Массив, содержащий ID пуль.*/
        this.bulletIDs = bulletIDs;
        /*Массив, содержащий объекты, содержащие данные о пулях.*/
        this.bullets = bullets;
        /*Объект, содержащий объекты, содержащие данные о персонажах.*/
        this.players = players;
        /*Массив, содержащий объекты, содержащие данные о врагах.*/
        this.enemies = enemies;
        /*Массив, содержащий объекты, содержащие данные о камнях.*/
        this.rocks = rocks;
        /*Массив, содержащий ID врагов.*/
        this.enemyIDs = enemyIDs;
        /*ID врага.*/
        this.ID = ID;
    };

    /*Метод "moveX()" обрабатывает движение врага по оси X.
    
    Метод "moveX()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "moveX()" ничего не возвращает.*/
    moveX(canvasData) {
        /*Создаем переменную "nextX" для хранения X-координаты врага в следующем кадре. Изначально эта X-координата 
        равна текущей X-координате увеличенной на случайное число в диапазоне, зависимом от скорости врага.*/
        let nextX = this.x + mathHelper.getRandomIntFromInterval(-1 * this.speed, this.speed);
        /*Если X-координата врага в следующем кадре получается слишком близко к правому краю холста, то корректируем 
        ее.*/
        while (nextX + this.width > canvasData.canvasWidth - canvasData.cellWidth) { nextX--; };
        /*Если X-координата врага в следующем кадре получается слишком близко к левому краю холста, то корректируем 
        ее.*/
        while (nextX < canvasData.cellWidth) { nextX++ };
        /*Указываем, что X-координата врага в следующем кадре равна полностью откорректированной X-координате врага в 
        следующем кадре.*/
        this.x = nextX;
    };

    /*Метод "moveY()" обрабатывает движение врага по оси Y.
    
    Метод "moveY()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "moveY()" ничего не возвращает.*/
    moveY(canvasData) {
        /*Создаем переменную "nextY" для хранения Y-координаты врага в следующем кадре. Изначально эта Y-координата 
        равна текущей Y-координате увеличенной на случайное число в диапазоне, зависимом от скорости врага.*/
        let nextY = this.y + mathHelper.getRandomIntFromInterval(-1 * this.speed, this.speed);
        /*Если Y-координата врага в следующем кадре получается слишком близко к нижнему краю холста, то корректируем 
        ее.*/
        while (nextY + this.height > canvasData.canvasHeight - canvasData.cellHeight) { nextY--; };
        /*Если Y-координата врага в следующем кадре получается слишком близко к верхнему краю холста, то корректируем 
        ее.*/
        while (nextY < canvasData.cellHeight) { nextY++ };
        /*Указываем, что Y-координата врага в следующем кадре равна полностью откорректированной Y-координате врага в 
        следующем кадре.*/
        this.y = nextY;
    };

    /*Метод "move()" совмещает вызовы методов "moveX()" и "moveY()", дополнительно перерассчитывая вершины 
    многоугольника, который обозначает форму врага.
    
    Метод "move()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
    2. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "move()" ничего не возвращает.*/
    move(canvasData, game) {
        /*Сохраняем координаты вершин многоугольника, который обозначает форму врага, в предыдущем кадре.*/
        this.previousVertices = this.vertices;

        /*Каждые 20 рассчитанных кадров двигаем врага и перерассчитываем вершины многоугольника, который обозначает 
        форму врага.*/
        if (game.totalCalculatedFrames % 20 === 0) {
            this.moveX(canvasData);
            this.moveY(canvasData);

            this.vertices = mathHelper.preparePolygonVerticesData(
                this.numberOfVertices,
                this.x, this.x + this.width,
                this.y, this.y + this.height,
                this.clockwiseStepX, this.clockwiseStepY,
                canvasData.cellWidth, canvasData.cellHeight,
                true
            );
        };
    };

    /*Метод "shoot()" обрабатывает стрельбу врага.
    
    Метод "shoot()" принимает следующие параметры:
    1. "game" - это параметр в виде объекта, обрабатывающего все данные игры.
    2. "createBullet" - это параметр в виде функции, которая создает объект, содержащий данные о пуле, на основе класса 
    "Bullet" и помещает этот объект в массив, куда должны сохраняться такие объекты.

    Метод "shoot()" ничего не возвращает.*/
    shoot(game, createBullet) {
        /*Если с момента последнего выстрела врага прошло достаточно рассчитанных кадров, то устанавливаем флаг, 
        указывающий, что враг недавно не стрелял, то есть враг снова может стрелять.*/
        if (game.totalCalculatedFrames - this.lastShotFrame > this.shootDelay) { this.shotRecently = false };

        /*Создаем вспомогательную локальную функцию "makeOneShot()", которая позволяет удобно создавать объекты, 
        содержащие данные о пулях.
        
        Функция "makeOneShot()" принимает следующие параметры:
        1. "currentSpeedX" - это числовой параметр, указывающий текущую скорость пули по оси X.
        2. "currentSpeedY" - это числовой параметр, указывающий текущую скорость пули по оси Y.

        Функция "makeOneShot()" ничего не возвращает.*/
        const makeOneShot = (
            currentSpeedX, currentSpeedY
        ) => {
            /*Создаем объект, содержащий данные о пули, при помощи функции "createBullet()".*/
            createBullet(
                this.x + this.width / 2, this.y + this.height / 2, this.bulletRadius,
                this.bulletStrokeStyle, this.bulletLineWidth, this.bulletFillStyle,
                currentSpeedX, currentSpeedY,
                this.bulletOwner,
                this.players, this.enemies, this.rocks, this.bullets,
                this.bulletIDs, this.enemyIDs
            );

            /*Устанавливаем флаг, указывающий, что враг недавно стрелял, то есть враг больше не может стрелять.*/
            this.shotRecently = true;
            /*Сохраняем номер рассчитанного кадра, когда был сделан последний выстрел.*/
            this.lastShotFrame = game.totalCalculatedFrames;
        };

        /*Если враг недавно не стрелял, то делаем выстрел в зависимости от выбранного направления.*/
        if (!this.shotRecently) {
            /*Случайно определяем в какую сторону будет стрелять враг:
            1 - ↗
            2 - ↘
            3 - ↙
            4 - ↖
            5 - ↑
            6 - →
            7 - ↓
            8 - ←*/
            const direction = mathHelper.getRandomIntFromInterval(1, 8);

            switch (direction) {
                case 1: {
                    makeOneShot(this.bulletSpeedX, -1 * this.bulletSpeedY);
                    break;
                };

                case 2: {
                    makeOneShot(this.bulletSpeedX, this.bulletSpeedY);
                    break;
                };

                case 3: {
                    makeOneShot(-1 * this.bulletSpeedX, this.bulletSpeedY);
                    break;
                };

                case 4: {
                    makeOneShot(-1 * this.bulletSpeedX, -1 * this.bulletSpeedY);
                    break;
                };

                case 5: {
                    makeOneShot(0, -1 * this.bulletSpeedY);
                    break;
                };

                case 6: {
                    makeOneShot(this.bulletSpeedX, 0);
                    break;
                };

                case 7: {
                    makeOneShot(0, this.bulletSpeedY);
                    break;
                };

                case 8: {
                    makeOneShot(-1 * this.bulletSpeedX, 0);
                    break;
                };

                default: {
                    break;
                };
            };
        };
    };

    /*Метод "draw()" отрисовывает врага.

    Метод "draw()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "interpolationFactor" - это числовой параметр, указывающий коэффициент интерполяции для создания промежуточных
    кадров с целью осуществления плавной отрисовки при движении.
    3. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "draw()" ничего не возвращает.*/
    draw(ctx, interpolationFactor, game) {
        /*Отрисовываем область, в рамках которой отрисовывается многоугольник, обозначающий форму врага. Это нужно 
        только для тестирования.*/
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'rgb(255, 0, 0)a(0, 0, 0, 1)';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*Создаем массив цветов, допустимых для врага, и сохраняем его в переменной "colors".*/
        const colors = [
            'rgb(20, 2, 50, 0.6)',
            'rgba(2, 50, 40, 0.6)',
            'rgba(7, 66, 84, 0.6)',
            'rgba(47, 5, 22, 0.6)',
            'rgba(47, 45, 5, 0.6)',
            'rgba(48, 48, 44, 0.6)'
        ];

        /*Каждые 20 рассчитанных кадров меняем цвет врагу.*/
        if (game.totalCalculatedFrames % 20 === 0) {
            this.color = colors[mathHelper.getRandomIntFromInterval(0, colors.length - 1)];
        };

        if (game.frameInterpolation) {
            /*Создаем переменную "verticesForInterpolation" для хранения массива объектов, содержащих координаты вершин, 
            который прошли через интерполяцию кадров. Мы это делаем целью осуществления плавной отрисовки при движении 
            врага.*/
            const interpolatedVertices = [];

            /*Определяем сколько создаем вершин многоугольника для промежуточного кадра. Вершины многоугольника для 
            промежуточного кадра рассчитываются на основе пар вершин многоугольников из предыдущего "целого" кадра и 
            следующего "целого" кадра, и если у нас получилось разное количество вершин у этих многоугольников, то
            количество вершины многоугольника для промежуточного кадра должно быть равно наименьшему количеству вершин 
            среди этих двух многоугольников, так как иначе если взять наибольшее количество вершин среди этих двух 
            многоугольников, то какие-то пары вершин многоугольника для промежуточного кадра будут иметь только одну 
            вершину.*/
            const loops = this.vertices.length < this.previousVertices.length
                ? this.vertices.length
                : this.previousVertices.length;

            /*Заполняем массив "verticesForInterpolation".*/
            for (let i = 0; i < loops; i++) {
                interpolatedVertices.push(
                    {
                        x: this.previousVertices[i].x +
                            (this.vertices[i].x - this.previousVertices[i].x) * interpolationFactor,

                        y: this.previousVertices[i].y +
                            (this.vertices[i].y - this.previousVertices[i].y) * interpolationFactor
                    }
                );
            };

            /*Отрисовываем врага с учетом интерполяции.*/
            graphicsHelper.drawPolygonFromVertices(
                ctx, interpolatedVertices, 1, 'rgba(196, 193, 21, 0.336)', this.color
            );
        } else {
            /*Отрисовываем врага без учета интерполяции. Это нужно только для тестирования.*/
            graphicsHelper.drawPolygonFromVertices(ctx, this.vertices, 1, 'rgba(196, 193, 21, 0.336)', this.color);
        };

    };
};

/*Функция "generateEnemyID()" генерирует уникальные ID для врагов.

Функция "generateEnemyID()" принимает следующие параметры:
1. "enemyIDs" - это параметр в виде массива, куда должны сохраняться ID врагов.

Функция "generateEnemyID()" возвращает уникальный ID врага.*/
function generateEnemyID(enemyIDs) {
    /*Создаем ID для врага при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let enemyID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для врага до тех пор, пока
    не получим уникальный ID.*/
    while (enemyIDs.includes(enemyID)) { enemyID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString() };
    /*Добавляем созданный ID врага в массив, куда должны сохраняться ID врагов.*/
    enemyIDs.push(enemyID);
    /*Возвращаем созданный ID врага.*/
    return enemyID;
};

/*Функция "createEnemy()" создает объект, содержащий данные о враге, на основе класса "Enemy" и помещает этот объект
в массив, куда должны сохраняться такие объекты.

Функция "createEnemy()" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату врага.
2. "y" - это числовой параметр, указывающий Y-координату врага.
3. "width" - это числовой параметр, указывающий гирину врага.
4. "height" - это числовой параметр, указывающий высоту врага.
5. "speed" - это числовой параметр, указывающий скорость передвижения врага.
6. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
врага.
7. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму врага, друг от друга.
8. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму врага, друг от друга.
9. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
10. "bulletRadius" - это числовой параметр, указывающий радиус пуль, которыми стреляет враг.
11. "bulletStrokeStyle" - это строковой параметр, указывающий цвет обводки пуль, которыми стреляет враг.
12. "bulletLineWidth" - это числовой параметр, указывающий ширину обводки пуль, которыми стреляет враг.
13. "bulletFillStyle" - это строковой параметр, указывающий цвет заливки пуль, которыми стреляет враг.
14. "bulletSpeedX" - это числовой параметр, указывающий скорость пуль по оси X, которыми стреляет враг.
15. "bulletSpeedY" - это числовой параметр, указывающий скорость пуль по оси Y, которыми стреляет враг.
16. "shootDelay" - это числовой параметр, указывающий задержка между выстрелами врага в рассчитанных кадрах.
17. "bulletOwner" - это строковой параметр, указывающий кто владелец пуль, стреляемых врагом.
18. "bulletIDs" - это параметр в виде массива, содержащего ID пуль.
19. "bullets" - это параметр в виде массива, содержащего объекты, которые содержат данные о пулях.
20. "players" - это параметр в виде объекта, содержащего объекты, которые содержат данные о персонажах.
21. "enemies" - это параметр в виде массива, содержащего объекты, которые содержат данные о врагах.
22. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
23. "enemyIDs" - это параметр в виде массива, содержащего ID врагов.

Функция "createEnemy()" ничего не возвращает.*/
export function createEnemy(
    x, y,
    width, height,
    speed,
    numberOfVertices, clockwiseStepX, clockwiseStepY, canvasData,
    bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
    bulletSpeedX, bulletSpeedY, shootDelay,
    bulletOwner, bulletIDs, bullets,
    players, enemies, rocks,
    enemyIDs
) {
    enemies.push(new Enemy(
        x, y,
        width, height,
        speed,
        numberOfVertices, clockwiseStepX, clockwiseStepY, canvasData,
        bulletRadius, bulletStrokeStyle, bulletLineWidth, bulletFillStyle,
        bulletSpeedX, bulletSpeedY, shootDelay,
        bulletOwner, bulletIDs, bullets,
        players, enemies, rocks,
        enemyIDs, generateEnemyID(enemyIDs)
    ));
};