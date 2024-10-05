const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

let cellWidth = 50;
let cellHeight = 50;
let cells = [];

function getCellsData() {
    for (let i = 0; i < canvas.width; i += cellWidth) {
        for (let j = 0; j < canvas.height; j += cellHeight) {
            cells.push(
                {
                    x: i,
                    y: j,
                    width: cellWidth,
                    height: cellHeight,
                    id: `${i / 10}-${j / 10}`
                }
            );
        };
    };

    // console.log(cells);
};

function drawGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    for (let i = 0; i < canvas.width; i += cellWidth) {
        for (let j = 0; j < canvas.height; j += cellHeight) {
            ctx.strokeRect(i, j, cellWidth, cellHeight);
        };
    };
};

function clearScreen() {
    ctx.fillStyle = 'rgb(66, 125, 212)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function prepareDataForShapeWithPoints(numberOfPoints, x1, x2, y1, y2, quarterMovingStepSize) {
    /*Отрисовываем область для отрисовки фигуры.*/
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    /*Подготавливаем массив для точек фигуры.*/
    let arrayOfShapePoints = [];

    /*Вспомогательные переменные для генерации координат точек фигуры.*/
    let previousX;
    let previousY;

    /*Вспомогательная переменная, чтобы сохранить отдельно стартовую точку фигуры.*/
    let startX;

    /*Высчитываем сколько примерно точек должно быть в каждой четверти кругового движения.*/
    let pointsPerQuarterMoving = Math.ceil((numberOfPoints - 1) / 4);

    /*Подготавливаем переменную, которая будет обозначать в какой четверти кругового движения мы находимся.*/
    let quarterStepCount = 0; // 0 -> 1 -> 2 -> 3

    for (let i = 1; i <= numberOfPoints; i++) {
        /*Стартовую точку фигуры генерируем отдельно.*/
        if (i === 1) {
            /*Создаем стартовую точку примерно вверху и по центру.*/
            previousX = ((x2 - x1) / 2) + x1 + helper.randomIntFromInterval(-1 * cellWidth, cellWidth) + cellWidth * 2;
            previousY = y1 + helper.randomIntFromInterval(0, 2 * cellHeight);

            /*Запоминаем отдельно стартовую точку. Понадобится при генерации остальных точек.*/
            startX = previousX;

            /*Добавляем подготовленную точку в массив для точек.*/
            arrayOfShapePoints.push({ x: previousX, y: previousY });
        } else {
            switch (quarterStepCount) {
                case 0: // right + down
                    {
                        previousX = previousX + helper.randomIntFromInterval(cellWidth, quarterMovingStepSize);
                        previousY = previousY + helper.randomIntFromInterval(cellHeight, quarterMovingStepSize);
                        break;
                    };

                case 1: // left down
                    {
                        previousX = previousX - helper.randomIntFromInterval(cellWidth, quarterMovingStepSize);
                        previousY = previousY + helper.randomIntFromInterval(cellHeight, quarterMovingStepSize);
                        break;
                    };

                case 2: // left up
                    {
                        previousX = previousX - helper.randomIntFromInterval(cellWidth, quarterMovingStepSize);
                        previousY = previousY - helper.randomIntFromInterval(cellHeight, quarterMovingStepSize);
                        break;
                    };

                case 3: // right up
                case 4: // right up
                    {
                        let tempPreviousX = previousX + helper.randomIntFromInterval(cellWidth, quarterMovingStepSize);

                        /*Провереям, чтобы координаты X точек в последней четверти кругового движения не были больше координаты X стартовой точки фигуры.*/
                        if (tempPreviousX >= startX) { tempPreviousX = helper.randomIntFromInterval(previousX, startX) };
                        previousX = tempPreviousX;

                        previousY = previousY - helper.randomIntFromInterval(cellHeight, quarterMovingStepSize);
                        break;
                    };

                default:
                    break;
            };

            /*Добавляем подготовленную точку в массив для точек.*/
            arrayOfShapePoints.push({ x: previousX, y: previousY });

            // console.log(previousX + ' ' + previousY);
            // console.log(quarterStepCount);

            /*Проверяем не нужно ли перейти в следующую четверть кругового движения.*/
            if (i % pointsPerQuarterMoving === 0) { quarterStepCount++ };
        };
    };

    /*Делаем так, чтобы полученные координаты были кратны размерам клеток.*/
    for (let i = 0; i < arrayOfShapePoints.length; i++) {
        if (arrayOfShapePoints[i].x % 50 >= 25) {
            arrayOfShapePoints[i].x = (Math.trunc(arrayOfShapePoints[i].x / 50) + 1) * cellWidth;
        } else {
            arrayOfShapePoints[i].x = Math.trunc(arrayOfShapePoints[i].x / 50) * cellWidth;
        };

        if (arrayOfShapePoints[i].y % 50 >= 25) {
            arrayOfShapePoints[i].y = (Math.trunc(arrayOfShapePoints[i].y / 50) + 1) * cellWidth;
        } else {
            arrayOfShapePoints[i].y = Math.trunc(arrayOfShapePoints[i].y / 50) * cellWidth;
        };
    };

    /*Делаем так, чтобы точки фигуры не выходили за указанную область.*/
    for (let i = 0; i < arrayOfShapePoints.length; i++) {
        if (arrayOfShapePoints[i].x >= x2) { arrayOfShapePoints[i].x = x2 - cellWidth };
        if (arrayOfShapePoints[i].x <= x1) { arrayOfShapePoints[i].x = x1 };

        if (arrayOfShapePoints[i].y >= y2) { arrayOfShapePoints[i].y = y2 - cellHeight };
        if (arrayOfShapePoints[i].y <= y1) { arrayOfShapePoints[i].y = y1 };
    };

    // console.log(arrayOfShapePoints);
    return arrayOfShapePoints;
};

function drawShapeUsingPoints(numberOfPoints, x1, x2, y1, y2, quarterMovingStepSize) {
    let arrayOfShapePoints = prepareDataForShapeWithPoints(numberOfPoints, x1, x2, y1, y2, quarterMovingStepSize);

    ctx.beginPath();
    let region = new Path2D();

    for (let i = 0; i < arrayOfShapePoints.length; i++) {
        ctx.lineTo(arrayOfShapePoints[i].x, arrayOfShapePoints[i].y);
        region.lineTo(arrayOfShapePoints[i].x, arrayOfShapePoints[i].y);

        ctx.fillStyle = 'rgb(100, 210, 70)';
        ctx.fillRect(arrayOfShapePoints[i].x, arrayOfShapePoints[i].y, cellWidth, cellHeight);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(arrayOfShapePoints[i].x, arrayOfShapePoints[i].y, cellWidth, cellHeight);

        ctx.fillStyle = 'black';
        ctx.font = '30px serif';
        ctx.fillText(i + 1, arrayOfShapePoints[i].x + 25, arrayOfShapePoints[i].y + 50);
    };

    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'yellow';
    // ctx.stroke();

    region.closePath();
    ctx.fillStyle = 'rgb(20, 2, 50, 0.6)';
    ctx.fill(region, 'nonzero');
};

function draw() {
    clearScreen();
    drawGrid();
    drawShapeUsingPoints(13, 300, 1200, 150, 750, 200);
};

/*-------------------------------------------------------------------------------------------------------------*/

getCellsData();
// setInterval(() => { draw() }, 200);
draw();

/*-------------------------------------------------------------------------------------------------------------*/

function test01() {
    for (let i = 0; i < 1000; i++) {
        let arrayOfShapePoints = prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200);

        for (let j = 0; j < arrayOfShapePoints.length; j++) {
            if (j >= 9) {
                if (arrayOfShapePoints[j].x > arrayOfShapePoints[0].x) {
                    console.log('PROBLEM');
                };
            };
        };
    };
};

// test01();