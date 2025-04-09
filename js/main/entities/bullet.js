'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';

/*Класс "Bullet" создает объекты, содержащие данные о пуле.

Класс "Bullet" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату пули.
2. "y" - это числовой параметр, указывающий Y-координату пули.
3. "radius" - это числовой параметр, указывающий радиус пули.
4. "strokeStyle" - это строковой параметр, указывающий цвет обводки пули.
5. "lineWidth" - это числовой параметр, указывающий ширину овбодки пули.
6. "fillStyle" - это строковой параметр, указывающий цвет заливки пули.
7. "currentSpeedX" - это числовой параметр, указывающий скорость пули по оси X.
8. "currentSpeedY" - это числовой параметр, указывающий скорость пули по оси Y.
9. "owner" - это строковой параметр, указывающий кто владелец пули.
10. "players" - это параметр в виде объекта, содержащего объекты, которые содержат данные о персонажах.
11. "enemies" - это параметр в виде массива, содержащего объекты, которые содержат данные о врагах.
12. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
13. "bullets" - это параметр в виде массива, содержащего объекты, которые содержат данные о пулях.
14. "bulletIDs" - это параметр в виде массива, содержащего ID пуль.
15. "enemyIDs" - это параметр в виде массива, содержащего ID врагов.
16. "ID" - это строковой параметр, указывающий ID пули.*/
class Bullet {
    constructor(
        x, y, radius,
        strokeStyle, lineWidth, fillStyle,
        currentSpeedX, currentSpeedY,
        owner,
        players, enemies, rocks, bullets,
        bulletIDs, enemyIDs, ID
    ) {
        /*X-координата пули.*/
        this.x = x;
        /*Y-координата пули.*/
        this.y = y;
        /*X-координата пули в предыдущем кадре.*/
        this.previousX;
        /*Y-координата пули в предыдущем кадре.*/
        this.previousY;
        /*Радиус пули.*/
        this.radius = radius;
        /*Цвет обводки пули.*/
        this.strokeStyle = strokeStyle;
        /*Ширина овбодки пули.*/
        this.lineWidth = lineWidth;
        /*Цвет заливки пули.*/
        this.fillStyle = fillStyle;
        /*Скорость пули по оси X*/
        this.currentSpeedX = currentSpeedX;
        /*Скорость пули по оси Y.*/
        this.currentSpeedY = currentSpeedY;
        /*Свойство, описывающее, кто владелец пули.*/
        this.owner = owner;
        /*Определяем направление пули и сохраняем его в свойстве "direction".*/
        if (currentSpeedX === 0 && currentSpeedY < 0) { this.direction = 'north' };
        if (currentSpeedX > 0 && currentSpeedY < 0) { this.direction = 'north-east' };
        if (currentSpeedX > 0 && currentSpeedY === 0) { this.direction = 'east' };
        if (currentSpeedX > 0 && currentSpeedY > 0) { this.direction = 'south-east' };
        if (currentSpeedX === 0 && currentSpeedY > 0) { this.direction = 'south' };
        if (currentSpeedX < 0 && currentSpeedY > 0) { this.direction = 'south-west' };
        if (currentSpeedX < 0 && currentSpeedY === 0) { this.direction = 'west' };
        if (currentSpeedX < 0 && currentSpeedY < 0) { this.direction = 'north-west' };

        /*При диагонаольном движении пули корректируем вектор скорости диагонального движения, чтобы такая скорость не
        получалась больше установленных скоростей по оси X и по оси Y.*/
        if (
            this.direction === 'north-east' || this.direction === 'south-east' ||
            this.direction === 'south-west' || this.direction === 'north-west'
        ) {
            const length = Math.sqrt(currentSpeedX * currentSpeedX + currentSpeedY * currentSpeedY);
            const normalizedCurrentSpeedX = currentSpeedX / length;
            const normalizedCurrentSpeedY = currentSpeedY / length;
            this.currentSpeedX = normalizedCurrentSpeedX * Math.abs(currentSpeedX);
            this.currentSpeedY = normalizedCurrentSpeedY * Math.abs(currentSpeedY);
        };

        /*Объект, содержащий объекты, содержащие данные о персонажах.*/
        this.players = players;
        /*Массив, содержащий объекты, содержащие данные о врагах.*/
        this.enemies = enemies;
        /*Массив, содержащий объекты, содержащие данные о камнях.*/
        this.rocks = rocks;
        /*Массив, содержащий объекты, содержащие данные о пулях.*/
        this.bullets = bullets;
        /*Массив, содержащий ID пуль.*/
        this.bulletIDs = bulletIDs;
        /*Массив, содержащий ID врагов.*/
        this.enemyIDs = enemyIDs;
        /*ID пули.*/
        this.ID = ID;
    };

    /*Метод "moveX()" обрабатывает движение пули по оси X.
    Метод "moveX()" не принимает никаких параметров.
    Метод "moveX()" ничего не возвращает.*/
    moveX() {
        /*Сохраняем предыдущую X-координуту пули.*/
        this.previousX = this.x;
        /*Создаем переменную "nextX" для хранения X-координаты пули в следующем кадре. Изначально эта X-координата равна 
        текущей X-координате увеличенной на текущую скорость пули по оси X.*/
        const nextX = this.x + this.currentSpeedX;
        /*Указываем X-координату ппули в следующем кадре.*/
        this.x = nextX;
    };

    /*Метод "moveY()" обрабатывает движение пули по оси Y.
    Метод "moveY()" не принимает никаких параметров.
    Метод "moveY()" ничего не возвращает.*/
    moveY() {
        /*Сохраняем предыдущую Y-координуту пули.*/
        this.previousY = this.y;
        /*Создаем переменную "nextY" для хранения Y-координаты пули в следующем кадре. Изначально эта Y-координата равна 
        текущей Y-координате увеличенной на текущую скорость пули по оси Y.*/
        const nextY = this.y + this.currentSpeedY;
        /*Указываем Y-координату ппули в следующем кадре.*/
        this.y = nextY;
    };

    /*Метод "move()" совмещает вызовы методов "moveX()" и "moveY()", дополнительно обрабатывая взаимодействие пули со
    сторонами холста, камнями, врагами и персонажем.
    
    Метод "move()" принимает следующие параметры:
    1. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
    2. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "move()" ничего не возвращает.*/
    move(canvasData, game) {
        this.moveX();
        this.moveY();

        /*Если пуля уходит за пределы холста, то удаляем ее.*/
        if (this.x < 0 || this.x > canvasData.canavasWidth || this.y < 0 || this.y > canvasData.canvasHeight) {
            this.bulletIDs.splice(this.bulletIDs.indexOf(this.ID), 1);
            this.bullets.splice(this.bullets.indexOf(this), 1);
        };

        /*Перебираем все камни и проверяем не пересекается ли пуля с одним из них. Если это так, то удаляем пулю.*/
        for (let i = 0; i < this.rocks.length; i++) {
            if (mathHelper.isPointInsidePolygon({ x: this.x, y: this.y }, this.rocks[i].vertices)) {
                this.bulletIDs.splice(this.bulletIDs.indexOf(this.ID), 1);
                this.bullets.splice(this.bullets.indexOf(this), 1);
            };
        };

        /*Если владелец пули персонаж, то перебираем врагов и проверяем не пересекается ли пуля с одним из них. Если это
        так, то удаляем врага и пулю.*/
        if (this.owner === 'player') {
            const bulletCenterPoint = { x: this.x, y: this.y };

            for (const enemy of this.enemies) {
                if (mathHelper.isPointInsidePolygon(bulletCenterPoint, enemy.vertices)) {
                    this.enemyIDs.splice(this.enemyIDs.indexOf(enemy.ID), 1);
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    this.bulletIDs.splice(this.bulletIDs.indexOf(this.ID), 1);
                    this.bullets.splice(this.bullets.indexOf(this), 1);
                };
            };
        };

        /*Если владелец пули враг, то проверяем не пересекается ли пуля с персонажем. Если это так и персонаж не получал
        урона недавно, то уменьшаем очки здоровья у персонажа и удаляем пулю.*/
        if (
            this.owner === 'enemy' && mathHelper.isPointInsideNotRotatedRectangle(
                this.players.playerOne.x, this.players.playerOne.x + this.players.playerOne.width,
                this.players.playerOne.y, this.players.playerOne.y + this.players.playerOne.height,
                this.x, this.y
            )
        ) {
            if (!this.players.playerOne.tookDamageRecently) {
                this.players.playerOne.lastTakingDamageCalculatedFrame = game.totalCalculatedFrames;
                this.players.playerOne.decreaseHealthPoints();
                this.players.playerOne.tookDamageRecently = true;
            };

            this.bulletIDs.splice(this.bulletIDs.indexOf(this.ID), 1);
            this.bullets.splice(this.bullets.indexOf(this), 1);
        };
    };

    /*Метод "draw()" отрисовывает пулю.

    Метод "draw()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "interpolationFactor" - это числовой параметр, указывающий коэффициет интерполяции для создания промежуточных 
    кадров с целью осуществления плавной отрисовки при движении.
    3. "game" - это параметр в виде объекта, обрабатывающего все данные игры.

    Метод "draw()" ничего не возвращает.*/
    draw(ctx, interpolationFactor, game) {
        /*Создаем путь для отрисовки пули.*/
        ctx.beginPath();

        if (game.frameInterpolation) {
            /*Рассчитываем X-коорданту и Y-координату пули для отрисовки с учетом интерполяции.*/
            const x = this.previousX + (this.x - this.previousX) * interpolationFactor;
            const y = this.previousY + (this.y - this.previousY) * interpolationFactor;

            /*Делаем путь для отрисовки пули в виде окружности с учетом интерполяции.*/
            ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        } else {
            /*Делаем путь для отрисовки пули в виде окружности без учета интерполяции. Это нужно только для 
            тестирования.*/
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        };

        /*Замыкаем путь для отрисовки пули.*/
        ctx.closePath();

        /*Устанавливаем цвет заливки пули.*/
        ctx.fillStyle = this.fillStyle;
        /*Заливаем пулю.*/
        ctx.fill();
        /*Устанавливаем цвет обводки пули.*/
        ctx.strokeStyle = this.strokeStyle;
        /*Устанавливаем ширину обводки пули.*/
        ctx.lineWidth = this.lineWidth;
        /*Обводим пулю.*/
        ctx.stroke();
    };
};

/*Функция "generateBulletID()" генерирует уникальные ID для пуль.

Функция "generateBulletID()" принимает следующие параметры:
1. "bulletIDs" - это параметр в виде массива, куда должны сохраняться ID пулей.

Функция "generateBulletID()" возвращает уникальный ID пули.*/
function generateBulletID(bulletIDs) {
    /*Создаем ID для пули при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let bulletID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для пули до тех пор, пока
    не получим уникальный ID.*/
    while (bulletIDs.includes(bulletID)) { bulletID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString() };
    /*Добавляем созданный ID пули в массив, куда должны сохраняться ID пуль.*/
    bulletIDs.push(bulletID);
    /*Возвращаем созданный ID пули.*/
    return bulletID;
};

/*Функция "createBullet()" создает объект, содержащий данные о пуле, на основе класса "Bullet" и помещает этот объект в 
массив, куда должны сохраняться такие объекты.

Функция "createBullet()" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату пули.
2. "y" - это числовой параметр, указывающий Y-координату пули.
3. "radius" - это числовой параметр, указывающий радиус пули.
4. "strokeStyle" - это строковой параметр, указывающий цвет обводки пули.
5. "lineWidth" - это числовой параметр, указывающий ширину овбодки пули.
6. "fillStyle" - это строковой параметр, указывающий цвет заливки пули.
7. "currentSpeedX" - это числовой параметр, указывающий скорость пули по оси X.
8. "currentSpeedY" - это числовой параметр, указывающий скорость пули по оси Y.
9. "owner" - это строковой параметр, указывающий кто владелец пули.
10. "players" - это параметр в виде объекта, содержащего объекты, которые содержат данные о персонажах.
11. "enemies" - это параметр в виде массива, содержащего объекты, которые содержат данные о врагах.
12. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
13. "bullets" - это параметр в виде массива, содержащего объекты, которые содержат данные о пулях.
14. "bulletIDs" - это параметр в виде массива, содержащего ID пуль.
15. "enemyIDs" - это параметр в виде массива, содержащего ID врагов.

Функция "createBullet()" ничего не возвращает.*/
export function createBullet(
    x, y, radius,
    strokeStyle, lineWidth, fillStyle,
    currentSpeedX, currentSpeedY,
    owner,
    players, enemies, rocks, bullets,
    bulletIDs, enemyIDs
) {
    bullets.push(new Bullet(
        x, y, radius,
        strokeStyle, lineWidth, fillStyle,
        currentSpeedX, currentSpeedY,
        owner,
        players, enemies, rocks, bullets,
        bulletIDs, enemyIDs, generateBulletID(bulletIDs)
    ));
};