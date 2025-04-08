'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

/*Класс "Puddle" создает объекты, содержащие данные о лужах.

Класс "Puddle" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату лужи.
2. "y" - это числовой параметр, указывающий Y-координату лужи.
3. "width" - это числовой параметр, указывающий ширину лужи.
4. "height" - это числовой параметр, указывающий высоту лужи.
5. "strokeStyle" - это строковой параметр, указывающий цвет обводки лужи.
6. "lineWidth" - это числовой параметр, указывающий ширину овбодки лужи.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки лужи.
8. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
лужи.
9. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму лужи, друг от друга.
10. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму лужи, друг от друга.
11. "ID" - это строковой параметр, указывающий ID лужи.*/
class Puddle {
    constructor(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        ID
    ) {
        /*X-координата лужи.*/
        this.x = x;
        /*Y-координата лужи.*/
        this.y = y;
        /*Ширина лужи.*/
        this.width = width;
        /*Высота лужи.*/
        this.height = height;
        /*Цвет обводки лужи.*/
        this.strokeStyle = strokeStyle;
        /*Ширина овбодки лужи.*/
        this.lineWidth = lineWidth;
        /*Цвет заливки лужи.*/
        this.fillStyle = fillStyle;
        /*Количество вершин многоугольника, который обозначает форму лужи.*/
        this.numberOfVertices = numberOfVertices;
        /*Параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, который обозначает форму 
        лужи, друг от друга.*/
        this.clockwiseStepX = clockwiseStepX;
        /*Параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, который обозначает форму 
        лужи, друг от друга.*/
        this.clockwiseStepY = clockwiseStepY;

        /*Объект с координатами вершин многоугольника, который обозначает форму лужи.*/
        this.vertices = mathHelper.preparePolygonVerticesData(
            numberOfVertices,
            this.x, this.x + this.width,
            this.y, this.y + this.height,
            this.clockwiseStepX, this.clockwiseStepY,
            canvasData.cellWidth, canvasData.cellHeight,
            true
        );

        /*Пробегаемся по вершинам многоугольника, который обозначает форму лужи, и проверяем не выходит ли какая-то из
        них за пределы холста. Если это так, то корректируем все вершины многоугольника, который обозначает форму 
        лужи.*/
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i].x <= 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x += canvasData.cellWidth * 2 };;
            };

            if (this.vertices[i].x >= canvasData.canvasWidth - 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x -= canvasData.cellWidth * 2 };
            };

            if (this.vertices[i].y <= 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y += canvasData.cellHeight * 2 };;
            };

            if (this.vertices[i].y >= canvasData.canvasHeight - 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y -= canvasData.cellHeight * 2 };
            };
        };

        /*ID лужи.*/
        this.ID = ID;
    };

    /*Метод "draw()" отрисовыввает лужу.
    Метод "draw()" не принимает никаких параметров.
    Метод "draw()" ничего не возвращает.*/
    draw() {
        /*Отрисовываем область, в рамках которой отрисовывается многоугольник, обозначающий форму лужи. Это нужно 
        только для тестирования.*/
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*Отрисовываем многоугольник, который обозначает форму лужи, при помощи метода 
        "graphicsHelper.drawPolygonFromVertices()".*/
        graphicsHelper.drawPolygonFromVertices(this.vertices, this.lineWidth, this.strokeStyle, this.fillStyle);
    };
};

/*Функция "generatePuddleID()" генерирует уникальные ID для луж.

Функция "generatePuddleID()" принимает следующие параметры:
1. "rockIDs" - это параметр в виде массива, куда должны сохраняться ID луж.

Функция "generatePuddleID()" возвращает уникальный ID лужи.*/
function generatePuddleID(puddleIDs) {
    /*Создаем ID для лужи при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let puddleID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для лужи до тех пор, пока 
    не получим уникальный ID.*/
    while (puddleIDs.includes(puddleID)) { puddleID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
    /*Добавляем созданный ID лужи в массив, куда должны сохраняться ID луж.*/
    puddleIDs.push(puddleID);
    /*Возвращаем созданный ID лужи.*/
    return puddleID;
};

/*Функция "createPuddle()" создает объект, содержащий данные о луже, на основе класса "Puddle" и помещает этот объект в 
массив, куда должны сохраняться такие объекты.

Функция "createPuddle()" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату лужи.
2. "y" - это числовой параметр, указывающий Y-координату лужи.
3. "width" - это числовой параметр, указывающий ширину лужи.
4. "height" - это числовой параметр, указывающий высоту лужи.
5. "strokeStyle" - это строковой параметр, указывающий цвет обводки лужи.
6. "lineWidth" - это числовой параметр, указывающий ширину овбодки лужи.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки лужи.
8. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
лужи.
9. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму лужи, друг от друга.
10. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму лужи, друг от друга.
11. "puddles" - это параметр в виде массива, содержащего объекты, которые содержат данные о лужах.
12. "puddleIDs" - это параметр в виде массива, содержащего ID луж.

Функция "createPuddle()" ничего не возвращает.*/
export function createPuddle(
    x, y,
    width, height,
    strokeStyle, lineWidth, fillStyle,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    puddles, puddleIDs
) {
    puddles.push(new Puddle(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        generatePuddleID(puddleIDs)
    ));
};