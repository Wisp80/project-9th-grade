'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

/*Класс "Puddle" создает объекты, содержащие данные о лужах.

Класс "Puddle" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату лужи.
2. "y" - это числовой параметр, указывающий Y-координату лужи.
3. "width" - это числовой параметр, указывающий ширину лужи.
4. "height" - это числовой параметр, указывающий высоту лужи.
5. "strokeStyle" - это строковой параметр, указывающий цвет обводки лужи.
6. "lineWidth" - это числовой параметр, указывающий ширину обводки лужи.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки лужи.
8. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
9. "gradientSteps" - это числовой параметр, указывающий как много цветов должно быть при использовании ступенчатого 
градиента.
10. "darkeningStep" - это числовой параметр, указывающий силу затемнения цветов в ступенчатом градиенте.
11. "isGradientReversed" - это булев параметр, указывающий должны ли идти цвета в ступенчатом градиенте от темного к
светлому или от светлого к темному.
12. "lastLayerFactor" - это числовой параметр, указывающий коэффициент уменьшения, который определяет насколько сильно 
будет уменьшен последний слой лужи, то есть самый внутренний слой, при ступенчатом градиенте.
13. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
лужи.
14. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму лужи, друг от друга.
15. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму лужи, друг от друга.
16. "ID" - это строковой параметр, указывающий ID лужи.*/
class Puddle {
    constructor(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle, canvasData,
        gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
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
        /*Ширина обводки лужи.*/
        this.lineWidth = lineWidth;
        /*Цвет заливки лужи.*/
        this.fillStyle = fillStyle;
        /*Свойство, которое указывает как много цветов должно быть при использовании ступенчатого градиента.*/
        this.gradientSteps = gradientSteps;
        /*Сила затемнения цветов в ступенчатом градиенте.*/
        this.darkeningStep = darkeningStep;
        /*Флаг, указывающий должны ли идти цвета в ступенчатом градиенте от темного к светлому или от светлого к
        темному.*/
        this.isGradientReversed = isGradientReversed;
        /*Коэффициент уменьшения, который определяет насколько сильно будет уменьшен последний слой лужи, то есть самый 
        внутренний слой, при ступенчатом градиенте.*/
        this.lastLayerFactor = lastLayerFactor;
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
            this.numberOfVertices,
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
            while (this.vertices[i].x <= canvasData.cellWidth) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x += canvasData.cellWidth };
            };

            while (this.vertices[i].x >= canvasData.canvasWidth - canvasData.cellWidth) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x -= canvasData.cellWidth };
            };

            while (this.vertices[i].y <= canvasData.cellHeight) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y += canvasData.cellHeight };
            };

            while (this.vertices[i].y >= canvasData.canvasHeight - canvasData.cellHeight) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y -= canvasData.cellHeight };
            };
        };

        /*ID лужи.*/
        this.ID = ID;
    };

    /*Метод "draw()" отрисовывает лужу.
    
    Метод "draw()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.

    Метод "draw()" ничего не возвращает.*/
    draw(ctx) {
        /*Отрисовываем область, в рамках которой отрисовывается многоугольник, обозначающий форму лужи. Это нужно 
        только для тестирования.*/
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*Отрисовываем многоугольник, который обозначает форму лужи, при помощи метода 
        "graphicsHelper.drawPolygonFromVertices()".*/
        // graphicsHelper.drawPolygonFromVertices(ctx, this.vertices, this.lineWidth, this.strokeStyle, this.fillStyle);

        /*Отрисовываем многоугольник со ступенчатым градиентом, который обозначает форму лужи, при помощи метода 
        "graphicsHelper.drawPolygonFromVerticesWithStepGradient()".*/
        graphicsHelper.drawPolygonFromVerticesWithStepGradient(
            ctx, this.vertices,
            this.fillStyle, this.gradientSteps, this.darkeningStep, this.isGradientReversed,
            this.lastLayerFactor,
            this.strokeStyle, this.lineWidth
        );
    };
};

/*Функция "generatePuddleID()" генерирует уникальные ID для луж.

Функция "generatePuddleID()" принимает следующие параметры:
1. "rockIDs" - это параметр в виде массива, куда должны сохраняться ID луж.

Функция "generatePuddleID()" возвращает уникальный ID лужи.*/
function generatePuddleID(puddleIDs) {
    /*Создаем ID для лужи при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let puddleID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для лужи до тех пор, пока 
    не получим уникальный ID.*/
    while (puddleIDs.includes(puddleID)) { puddleID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString() };
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
6. "lineWidth" - это числовой параметр, указывающий ширину обводки лужи.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки лужи.
8. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
9. "gradientSteps" - это числовой параметр, указывающий как много цветов должно быть при использовании ступенчатого 
градиента.
10. "darkeningStep" - это числовой параметр, указывающий силу затемнения цветов в ступенчатом градиенте.
11. "isGradientReversed" - это булев параметр, указывающий должны ли идти цвета в ступенчатом градиенте от темного к
светлому или от светлого к темному.
12. "lastLayerFactor" - это числовой параметр, указывающий коэффициент уменьшения, который определяет насколько сильно 
будет уменьшен последний слой лужи, то есть самый внутренний слой, при ступенчатом градиенте.
13. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
лужи.
14. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму лужи, друг от друга.
15. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму лужи, друг от друга.
16. "puddles" - это параметр в виде массива, содержащего объекты, которые содержат данные о лужах.
17. "puddleIDs" - это параметр в виде массива, содержащего ID луж.

Функция "createPuddle()" ничего не возвращает.*/
export function createPuddle(
    x, y,
    width, height,
    strokeStyle, lineWidth, fillStyle, canvasData,
    gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    puddles, puddleIDs
) {
    puddles.push(new Puddle(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle, canvasData,
        gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        generatePuddleID(puddleIDs)
    ));
};