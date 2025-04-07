'use strict';
import { canvasData, ctx } from '../../canvas/canvas.js';
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
8. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
камня.
9. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму камня, друг от друга.
10. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму камня, друг от друга.
11. "ID" - это строковой параметр, указывающий ID камня.*/
class Rock {
    constructor(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle,
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

        /*ID камня.*/
        this.ID = ID;
    };

    /*Метод "draw()" отрисовыввает камень.
    Метод "draw()" не принимает никаких параметров.
    Метод "draw()" ничего не возвращает.*/
    draw() {
        /*Отрисовываем область, в рамках которой отрисовывается многоугольник, обозначающий форму камня. Это нужно 
        только для тестирования.*/
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*Отрисовываем многоугольник, который обозначает форму камня, при помощи метода 
        "graphicsHelper.drawPolygonFromVertices()".*/
        // graphicsHelper.drawPolygonFromVertices(this.vertices, this.lineWidth, this.strokeStyle, this.fillStyle);






        

        // const ctx = canvas.getContext('2d');
        // const steps = 5; // Увеличили количество ступеней
        // const center = { x: 0, y: 0 };

        // // 1. Находим центр камня
        // for (const v of this.vertices) {
        //     center.x += v.x;
        //     center.y += v.y;
        // }
        // center.x /= this.vertices.length;
        // center.y /= this.vertices.length;

        // // 2. Оттенки серого (от темного снаружи к светлому внутри)
        // const colors = ['#333333', '#555555', '#777777', '#999999', '#CCCCCC'];
        // const scales = [1.0, 0.8, 0.6, 0.4, 0.2]; // Размеры для каждого кольца

        // // 3. Рисуем ступени
        // for (let i = 0; i < steps; i++) {
        //     const path = new Path2D();
        //     const scaledVertices = this.vertices.map(v => ({
        //         x: center.x + (v.x - center.x) * scales[i],
        //         y: center.y + (v.y - center.y) * scales[i]
        //     }));

        //     path.moveTo(scaledVertices[0].x, scaledVertices[0].y);
        //     for (let j = 1; j < scaledVertices.length; j++) {
        //         path.lineTo(scaledVertices[j].x, scaledVertices[j].y);
        //     }
        //     path.closePath();

        //     // Заливаем и обводим
        //     ctx.fillStyle = colors[i];
        //     ctx.fill(path);
        //     ctx.strokeStyle = i === 0 ? '#000000' : 'rgba(0,0,0,0.3)'; // Внешний контур четче
        //     ctx.lineWidth = 1;
        //     ctx.stroke(path);
        // }




        const baseColor = '#777777';
        const steps = 5;

        const ctx = canvas.getContext('2d');
        const center = { x: 0, y: 0 };

        // 1. Находим центр камня
        for (const v of this.vertices) {
            center.x += v.x;
            center.y += v.y;
        }
        center.x /= this.vertices.length;
        center.y /= this.vertices.length;

        // 2. Генерируем оттенки от темного к светлому на основе baseColor
        const colors = generateColorGradient(baseColor, steps);

        // 3. Размеры для каждого кольца (от 1.0 до 0.2)
        const scales = Array.from({ length: steps }, (_, i) =>
            1.0 - (i / (steps - 1)) * 0.8
        );

        // 4. Рисуем ступени
        for (let i = 0; i < steps; i++) {
            const path = new Path2D();
            const scaledVertices = this.vertices.map(v => ({
                x: center.x + (v.x - center.x) * scales[i],
                y: center.y + (v.y - center.y) * scales[i]
            }));

            path.moveTo(scaledVertices[0].x, scaledVertices[0].y);
            for (let j = 1; j < scaledVertices.length; j++) {
                path.lineTo(scaledVertices[j].x, scaledVertices[j].y);
            }
            path.closePath();

            // Заливаем и обводим
            ctx.fillStyle = colors[i];
            ctx.fill(path);
            ctx.strokeStyle = i === 0 ? '#000000' : 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            ctx.stroke(path);
        }

        function generateColorGradient(baseColor, steps) {
            const hexToRgb = (hex) => {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return [r, g, b];
            };

            const rgbToHex = (r, g, b) => {
                return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
            };

            const [r, g, b] = hexToRgb(baseColor);
            const colors = [];

            for (let i = 0; i < steps; i++) {
                const factor = i / (steps - 1); // От 0 (темный) до 1 (светлый)
                const darkenFactor = 1 - factor * 0.7; // Уменьшаем затемнение для плавности

                const newR = Math.floor(r * darkenFactor);
                const newG = Math.floor(g * darkenFactor);
                const newB = Math.floor(b * darkenFactor);

                colors.push(rgbToHex(newR, newG, newB));
            }

            return colors.reverse(); // Чтобы darkest был снаружи
        }
    };
};

/*Функция "generateRockID()" генерирует уникальные ID для камней.

Функция "generateRockID()" принимает следующие параметры:
1. "rockIDs" - это параметр в виде массива, куда должны сохраняться ID камней.

Функция "generateRockID()" возвращает уникальный ID камня.*/
function generateRockID(rockIDs) {
    /*Создаем ID для камня при помощи метода "mathHelper.getRandomIntFromInterval()".*/
    let rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString();
    /*Проверяем не создали ли мы ID, который уже существует. Если это так, то пересоздаем ID для камня до тех пор, пока
    не получим уникальный ID.*/
    while (rockIDs.includes(rockID)) { rockID = mathHelper.getRandomIntFromInterval(0, 1000).toString() };
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
8. "numberOfVertices" - это числовой параметр, указывающий количество вершин многоугольника, который обозначает форму 
камня.
9. "clockwiseStepX" - это числовой параметр, указывающий максимальное расстояние сдвига по оси X вершин многоугольника, 
который обозначает форму камня, друг от друга.
10. "clockwiseStepY" - это числовой параметр, указывающий максимальное расстояние сдвига по оси Y вершин многоугольника, 
который обозначает форму камня, друг от друга.
11. "rocks" - это параметр в виде массива, содержащего объекты, которые содержат данные о камнях.
12. "rockIDs" - это параметр в виде массива, содержащего ID камней.

Функция "createRock()" ничего не возвращает.*/
export function createRock(
    x, y,
    width, height,
    strokeStyle, lineWidth, fillStyle,
    numberOfVertices, clockwiseStepX, clockwiseStepY,
    rocks, rockIDs
) {
    rocks.push(new Rock(
        x, y,
        width, height,
        strokeStyle, lineWidth, fillStyle,
        numberOfVertices, clockwiseStepX, clockwiseStepY,
        generateRockID(rockIDs)
    ));
};