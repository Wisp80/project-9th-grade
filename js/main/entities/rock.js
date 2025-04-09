'use strict';
import { mathHelper } from '../../helpers/mathHelper.js';
import { graphicsHelper } from '../../helpers/graphicsHelper.js';

/*Класс "Rock" создает объекты, содержащие данные о камнях.

Класс "Rock" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату камня.
2. "y" - это числовой параметр, указывающий Y-координату камня.
3. "width" - это числовой параметр, указывающий ширину камня.
4. "height" - это числовой параметр, указывающий высоту камня.
5. "strokeStyle" - это строковой параметр, указывающий цвет обводки камня.
6. "lineWidth" - это числовой параметр, указывающий ширину овбодки камня.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки камня.
8. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
9. "gradientSteps" - это числовой параметр, указывающий как много цветов должно быть при использовании ступенчатого 
градиента.
10. "darkeningStep" - это числовой параметр, указывающий силу затемнения цветов в ступенчатом градиенте.
11. "isGradientReversed" - это булев параметр, указывающий должны ли идти цвета в ступенчатом градиент от темного к 
светлому или от светлого к темному.
12. "lastLayerFactor" - это числовой параметр, указывающий коэффициент уменьшения, который определяет насколько сильно 
будет уменьшен последний слой камня, то есть самый внутренний слой, при ступенчатом градиенте.
13. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
камня.
14. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму камня, друг от друга.
15. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму камня, друг от друга.
16. "ID" - это строковой параметр, указывающий ID камня.*/
class Rock {
    constructor(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle, canvasData,
        gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        ID
    ) {
        /*X-координата камня.*/
        this.x = x;
        /*Y-координата камня.*/
        this.y = y;
        /*Ширина камня.*/
        this.width = width;
        /*Высота камня.*/
        this.height = height;
        /*Цвет обводки камня.*/
        this.strokeStyle = strokeStyle;
        /*Ширина овбодки камня.*/
        this.lineWidth = lineWidth;
        /*Цвет заливки камня.*/
        this.fillStyle = fillStyle;
        /*Свойство, которое указывает как много цветов должно быть при использовании ступенчатого градиента.*/
        this.gradientSteps = gradientSteps;
        /*Сила затемнения цветов в ступенчатом градиенте.*/
        this.darkeningStep = darkeningStep;
        /*Флаг, указывающий должны ли идти цвета в ступенчатом градиент от темного к светлому или от светлого к 
        темному.*/
        this.isGradientReversed = isGradientReversed;
        /*Коэффициент уменьшения, который определяет насколько сильно будет уменьшен последний слой камня, то есть самый 
        внутренний слой, при ступенчатом градиенте.*/
        this.lastLayerFactor = lastLayerFactor;
        /*Количество вершин многоугольника, который обозначает форму камня.*/
        this.numberOfVertices = numberOfVertices;
        /*Параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, который обозначает форму 
        камня, друг от друга.*/
        this.clockwiseStepX = clockwiseStepX;
        /*Параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, который обозначает форму 
        камня, друг от друга.*/
        this.clockwiseStepY = clockwiseStepY;

        /*Объект с координатами вершин многоугольника, который обозначает форму камня.*/
        this.vertices = mathHelper.preparePolygonVerticesData(
            numberOfVertices,
            this.x, this.x + this.width,
            this.y, this.y + this.height,
            this.clockwiseStepX, this.clockwiseStepY,
            canvasData.cellWidth, canvasData.cellHeight,
            true
        );

        /*Пробегаемся по вершинам многоугольника, который обозначает форму камня, и проверяем не выходит ли какая-то из
        них за пределы холста. Если это так, то корректируем все вершины многоугольника, который обозначает форму 
        камня.*/
        for (let i = 0; i < this.vertices.length; i++) {
            while (this.vertices[i].x <= 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x += canvasData.cellWidth };
            };

            while (this.vertices[i].x >= canvasData.canvasWidth - 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].x -= canvasData.cellWidth };
            };

            while (this.vertices[i].y <= 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y += canvasData.cellHeight };
            };

            while (this.vertices[i].y >= canvasData.canvasHeight - 55) {
                for (let j = 0; j < this.vertices.length; j++) { this.vertices[j].y -= canvasData.cellHeight };
            };
        };

        /*ID камня.*/
        this.ID = ID;
    };

    /*Метод "draw()" отрисовыввает камень.
    
    Метод "draw()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.

    Метод "draw()" ничего не возвращает.*/
    draw(ctx) {
        /*Отрисовываем область, в рамках которой отрисовывается многоугольник, обозначающий форму камня. Это нужно 
        только для тестирования.*/
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*Отрисовываем многоугольник, который обозначает форму камня, при помощи метода 
        "graphicsHelper.drawPolygonFromVertices()".*/
        // graphicsHelper.drawPolygonFromVertices(ctx, this.vertices, this.lineWidth, this.strokeStyle, this.fillStyle);

        /*Отрисовываем многоугольник со ступенчатым градиентом, который обозначает форму камня, при помощи метода 
        "graphicsHelper.drawPolygonFromVerticesWithStepGradient()".*/
        graphicsHelper.drawPolygonFromVerticesWithStepGradient(
            ctx, this.vertices,
            this.fillStyle, this.gradientSteps, this.darkeningStep, this.isGradientReversed,
            this.lastLayerFactor,
            this.strokeStyle, this.lineWidth
        );
    };
};

/*Функция "generateRockID()" генерирует уникальные ID для камней.

Функция "generateRockID()" принимает следующие параметры:
1. "rockIDs" - это параметр в виде массива, куда должны сохраняться ID камней.

Функция "generateRockID()" возвращает уникальный ID камня.*/
function generateRockID(rockIDs) {
    /*Создаем ID для камня при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let rockID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для камня до тех пор, пока
    не получим уникальный ID.*/
    while (rockIDs.includes(rockID)) { rockID = mathHelper.getRandomIntFromInterval(0, 1_000_000).toString() };
    /*Добавляем созданный ID камня в массив, куда должны сохраняться ID камней.*/
    rockIDs.push(rockID);
    /*Возвращаем созданный ID камня.*/
    return rockID;
};

/*Функция "createRock()" создает объект, содержащий данные о камне, на основе класса "Rock" и помещает этот объект в 
массив, куда должны сохраняться такие объекты.

Функция "createRock()" принимает следующие параметры:
1. "x" - это числовой параметр, указывающий X-координату камня.
2. "y" - это числовой параметр, указывающий Y-координату камня.
3. "width" - это числовой параметр, указывающий ширину камня.
4. "height" - это числовой параметр, указывающий высоту камня.
5. "strokeStyle" - это строковой параметр, указывающий цвет обводки камня.
6. "lineWidth" - это числовой параметр, указывающий ширину овбодки камня.
7. "fillStyle" - это строковой параметр, указывающий цвет заливки камня.
8. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.
9. "gradientSteps" - это числовой параметр, указывающий как много цветов должно быть при использовании ступенчатого 
градиента.
10. "darkeningStep" - это числовой параметр, указывающий силу затемнения цветов в ступенчатом градиенте.
11. "isGradientReversed" - это булев параметр, указывающий должны ли идти цвета в ступенчатом градиент от темного к 
светлому или от светлого к темному.
12. "lastLayerFactor" - это числовой параметр, указывающий коэффициент уменьшения, который определяет насколько сильно 
будет уменьшен последний слой камня, то есть самый внутренний слой, при ступенчатом градиенте.
13. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
камня.
14. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму камня, друг от друга.
15. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму камня, друг от друга.
16. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
17. "rockIDs" - это параметр в виде массива, содержащего ID камней.

Функция "createRock()" ничего не возвращает.*/
export function createRock(
    x, y,
    width, height,
    strokeStyle, lineWidth, fillStyle, canvasData,
    gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    rocks, rockIDs
) {
    rocks.push(new Rock(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle, canvasData,
        gradientSteps, darkeningStep, isGradientReversed, lastLayerFactor,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        generateRockID(rockIDs)
    ));
};