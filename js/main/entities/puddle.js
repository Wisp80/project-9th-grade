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
        // graphicsHelper.drawPolygonFromVertices(this.vertices, this.lineWidth, this.strokeStyle, this.fillStyle);







        

        // const ctx = canvas.getContext('2d');
        // const steps = 5; // Количество слоёв
        // const center = { x: 0, y: 0 };

        // // 1. Находим центр лужи
        // for (const v of this.vertices) {
        //     center.x += v.x;
        //     center.y += v.y;
        // }
        // center.x /= this.vertices.length;
        // center.y /= this.vertices.length;

        // // 2. Оттенки фиолетового (от светлого снаружи к темному внутри)
        // const colors = [
        //     'rgba(178, 102, 255, 0.9)', // Светлый край
        //     'rgba(153, 71, 255, 0.9)',
        //     'rgba(128, 18, 238, 0.9)',   // Базовый цвет
        //     'rgba(102, 0, 204, 0.9)',
        //     'rgba(76, 0, 153, 0.9)'      // Тёмный центр
        // ];
        // const scales = [1.0, 0.8, 0.6, 0.4, 0.2]; // Размеры слоёв

        // // 3. Рисуем гладкую лужицу
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

        //     // Заливка без обводки
        //     ctx.fillStyle = colors[i];
        //     ctx.fill(path);
        // }



        


        const baseColor = 'rgba(128, 18, 238, 0.8)';
        const steps = 5;

        const ctx = canvas.getContext('2d');
        const center = { x: 0, y: 0 };

        // 1. Находим центр лужи
        for (const v of this.vertices) {
            center.x += v.x;
            center.y += v.y;
        }
        center.x /= this.vertices.length;
        center.y /= this.vertices.length;

        // 2. Генерируем полупрозрачные оттенки (от темного центра к светлым краям)
        const colors = generateWaterGradient(baseColor, steps);

        // 3. Размеры слоев (от 1.0 для внешнего слоя до 0.2 для центра)
        const scales = Array.from({ length: steps }, (_, i) =>
            1.0 - (i / (steps - 1)) * 0.8
        );

        // 4. Рисуем лужицу
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

            // Заливка с прозрачностью
            ctx.fillStyle = colors[i];
            ctx.fill(path);
        }


        // Генератор градиента для воды (с учетом прозрачности)
        function generateWaterGradient(baseColor, steps) {
            // Парсим базовый цвет (поддерживает rgba и hex)
            const parsedColor = parseColor(baseColor);
            let [r, g, b, a = 0.8] = parsedColor; // По умолчанию alpha = 0.8

            const colors = [];
            for (let i = 0; i < steps; i++) {
                const factor = i / (steps - 1); // От 0 (центр) до 1 (края)

                // Темный центр → светлые края
                const lightenFactor = 0.5 + factor * 0.5; // От 0.5 до 1.0
                const newA = a * (0.7 + factor * 0.3);   // Прозрачность у краев выше

                const newR = Math.min(255, Math.floor(r * lightenFactor));
                const newG = Math.min(255, Math.floor(g * lightenFactor));
                const newB = Math.min(255, Math.floor(b * lightenFactor));

                colors.push(`rgba(${newR}, ${newG}, ${newB}, ${newA.toFixed(2)})`);
            }

            return colors.reverse(); // Чтобы darkest был в центре
        }

        // Парсит цвет в формате rgba или hex
        function parseColor(color) {
            if (color.startsWith('rgba')) {
                const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
                return match ? match.slice(1, 5).map(Number) : [128, 18, 238, 0.8];
            } else {
                const hex = color.startsWith('#') ? color.slice(1) : color;
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return [r, g, b, 0.8];
            }
        }
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