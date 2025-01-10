const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------*/

const cellWidth = 25;
const cellHeight = 25;
const cells = [];

/*Вызываем эту функцию, но ее результат пока не используем.*/
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

    console.log('cells');
    console.log(cells);
    console.log('--------------------------------------');
};

/*Функция для отрисовки сетки.*/
function drawGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    for (let i = 0; i < canvas.width; i += cellWidth) {
        for (let j = 0; j < canvas.height; j += cellHeight) {
            ctx.strokeRect(i, j, cellWidth, cellHeight);
        };
    };
};

/*Функция для зачистки экрана.*/
function clearScreen() {
    ctx.fillStyle = 'rgb(66, 125, 212)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/*Функция для расчета вершин многоугольника.*/
function prepareDataForShapeWithVertices(numberOfVertices, x1, x2, y1, y2, quarterMovingStepSizeX, quarterMovingStepSizeY) {
    /*Отрисовываем область для отрисовки фигуры.*/
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    /*Подготавливаем массив для вершин фигуры.*/
    const vertices = [];

    /*Вспомогательные переменные для генерации координат вершин фигуры, так как новые выершины генерируются на основе предыдущих.*/
    let previousX;
    let previousY;

    /*Вспомогательная переменная, чтобы сохранить отдельно стартовую вершину фигуры.*/
    let startX;

    /*Высчитываем сколько примерно вершин должно быть в каждой четверти кругового движения. Эта переменная нам понадобится, чтобы
    переходить из одной четверти кругового движения в другую четверть.*/
    const veticesPerQuarterMoving = Math.ceil((numberOfVertices - 1) / 4);

    /*Подготавливаем переменную, которая будет обозначать в какой четверти кругового движения мы находимся.*/
    let quarterStepCount = 0; // 0 -> 1 -> 2 -> 3

    for (let i = 1; i <= numberOfVertices; i++) {
        /*Стартовую вершину фигуры генерируем отдельно.*/
        if (i === 1) {
            /*Создаем стартовую вершину примерно вверху и по центру.*/

            /*Формируем X-координату для стартовой вершины:
            1) "(x2 - x1) / 2) + x1" - находим центральную X-координату указанной области для отрисовки фигуры.
            2) "+ helper.randomIntFromInterval(-1 * cellWidth, cellWidth) + cellWidth * 2" - найденную X-координату сдвигаем вправо случайно на 1-2 клетки,
            чтобы вершина оказывалась всегда в первой четверти движения.*/
            previousX = ((x2 - x1) / 2) + x1 + helper.randomIntFromInterval(-1 * cellWidth, cellWidth) + cellWidth * 2;

            /*Формируем Y-координату для стартовой вершины:
            1) "y1" - берем за основну верхнюю Y-координату указанной области для отрисовки фигуры.
            2) "+ helper.randomIntFromInterval(0, 2 * cellHeight)" - полученную Y-координату сдвигаем вниз случайно на 0-2 клетки,
            чтобы вершина оказывалась всегда в указанной области для отрисовки фигуры.*/
            previousY = y1 + helper.randomIntFromInterval(1, 3 * cellHeight);

            /*Запоминаем отдельно стартовую вершину. Понадобится при генерации остальных вершин.*/
            startX = previousX;

            /*Добавляем подготовленную стартовую вершину в массив для вершин.*/
            vertices.push({ x: previousX, y: previousY });
        } else {
            /*Вершины, кроме стартовой, генерируем при помощи движения по часовой стрелке.*/

            /*Сначала смотрим в какой четверти кругового движения мы находимся.
            0 - Первая четверть.
            1 - Вторая четверть.
            2 - Третья четверть.
            3, 4 - Четвертая четверть.*/
            switch (quarterStepCount) {
                case 0: // right down
                    {
                        /*Берем предыдущую вершину и случайно ее сдвигаем вправо и вниз минимум на 1 клетку, максимум до значения переменной "quarterMovingStepSizeX"
                        или "quarterMovingStepSizeY".*/
                        previousX = previousX + helper.randomIntFromInterval(cellWidth, quarterMovingStepSizeX);
                        previousY = previousY + helper.randomIntFromInterval(cellHeight, quarterMovingStepSizeY);
                        break;
                    };

                case 1: // left down
                    {
                        /*Берем предыдущую вершину и случайно ее сдвигаем влево и вниз минимум на 1 клетку, максимум до значения переменной "quarterMovingStepSizeX"
                        или "quarterMovingStepSizeY".*/
                        previousX = previousX - helper.randomIntFromInterval(cellWidth, quarterMovingStepSizeX);
                        previousY = previousY + helper.randomIntFromInterval(cellHeight, quarterMovingStepSizeY);
                        break;
                    };

                case 2: // left up
                    {
                        /*Берем предыдущую вершину и случайно ее сдвигаем влево и вверх минимум на 1 клетку, максимум до значения переменной "quarterMovingStepSizeX"
                        или "quarterMovingStepSizeY".*/
                        previousX = previousX - helper.randomIntFromInterval(cellWidth, quarterMovingStepSizeX);
                        previousY = previousY - helper.randomIntFromInterval(cellHeight, quarterMovingStepSizeY);
                        break;
                    };

                case 3: // right up
                /*Если у нас нечетное количество вершин, то в конце мы можем перейти в пятую четверть кругового движения, которой не существует. Но это не вызовет проблем
                так как она будет формироваться, как и четвертая четверть кругового движения.*/
                case 4: // right up
                    {
                        /*Создаем черновой вариант X-координаты следующей вершины, путем сдвига предыдущей X-координаты вправо минимум на 1 клетку, максимум до значения 
                        переменной "quarterMovingStepSizeX".*/
                        let tempPreviousX = previousX + helper.randomIntFromInterval(cellWidth, quarterMovingStepSizeX);

                        /*Проверяем, чтобы полученная X-координата в последней четверти кругового движения не совпадала или не была правее X-координаты стартовой вершины фигуры.
                        Если это так, то исправляем полученную X-координату, формируя ее из диапозона от X-координаты предыдущей вершины до X-координаты стартовой вершины.*/
                        if (tempPreviousX >= startX) { tempPreviousX = helper.randomIntFromInterval(previousX + cellWidth, startX - 2 * cellWidth) };

                        /*Присваем черновой вариант X-координаты следующей вершины чистовой версии X-координаты следующей вершины.*/
                        previousX = tempPreviousX;

                        /*Берем Y-координату предыдущей вершины и случайно ее сдвигаем вверх минимум на 1 клетку, максимум до значения переменной "quarterMovingStepSizeY".*/
                        previousY = previousY - helper.randomIntFromInterval(cellHeight, quarterMovingStepSizeY);
                        break;
                    };

                default:
                    break;
            };

            /*Добавляем подготовленную вершину в массив для вершин.*/
            vertices.push({ x: previousX, y: previousY });

            console.log("previousX + ' ' + previousY");
            console.log(previousX + ' ' + previousY);
            console.log('quarterStepCount');
            console.log(quarterStepCount);

            /*Проверяем не нужно ли перейти в следующую четверть кругового движения. Мы переходим в следующую четверть кругового движения
            только если количество сгенерированных вершин кратно примерному количеству вершин "quarterStepCount", которое должно быть в каждой
            четверти кругового движения. Такая логика позволит нам создать в каждой четверти примерно одинаковое количество вершин.*/
            if (i % veticesPerQuarterMoving === 0) { quarterStepCount++ };
        };
    };

    console.log('--------------------------------------');

    /*Делаем так, чтобы полученные координаты были кратны размерам клеток.*/
    /*Перебираем координаты каждой вершины.*/
    for (let i = 0; i < vertices.length; i++) {
        /*Делим X-координату на ширину клетки и находим остаток.*/
        if (vertices[i].x % cellWidth >= cellWidth / 2) {
            /*Если остаток больше или равен половине ширины клетки, то округляем X-координату по верху (382 -> 400):
            1) "Math.trunc(arrayOfShapePoints[i].x / cellWidth)" - находим целую часть от деления (7).
            2) "+ 1" - прибавляем к целой части от деления 1, чтобы потом полученную целую часть умножить на ширину клетки (7 + 1 = 8).
            3) "* cellWidth" - полученную целую часть умножаем на ширину клетки (8 * 50 = 400).*/
            vertices[i].x = (Math.trunc(vertices[i].x / cellWidth) + 1) * cellWidth;
        } else {
            /*Иначе округляем X-координату по низу (354 -> 350):
            1) "Math.trunc(arrayOfShapePoints[i].x / cellWidth)" - находим целую часть от деления (7).
            2)  "* cellWidth" - полученную целую часть умножаем на ширину клетки (7 * 50 = 350).*/
            vertices[i].x = Math.trunc(vertices[i].x / cellWidth) * cellWidth;
        };

        /*Делим Y-координату на высоту клетки и находим остаток.*/
        if (vertices[i].y % cellHeight >= cellHeight) {
            /*Если остаток больше или равен половине высоты клетки, то округляем Y-координату по верху (382 -> 400):
            1) "Math.trunc(arrayOfShapePoints[i].y / cellHeight)" - находим целую часть от деления (7).
            2) "+ 1" - прибавляем к целой части от деления 1, чтобы потом полученную целую часть умножить на высоту клетки (7 + 1 = 8).
            3) "* cellHeight" - полученную целую часть умножаем на высоту клетки (8 * 50 = 400).*/
            vertices[i].y = (Math.trunc(vertices[i].y / cellHeight) + 1) * cellHeight;
        } else {
            /*Иначе округляем Y-координату по низу (354 -> 350):
            1) "Math.trunc(arrayOfShapePoints[i].y / cellHeight)" - находим целую часть от деления (7).
            2)  "* cellHeight" - полученную целую часть умножаем на высоту клетки (7 * 50 = 350).*/
            vertices[i].y = Math.trunc(vertices[i].y / cellHeight) * cellHeight;
        };
    };

    /*Делаем так, чтобы вершины фигуры не выходили за указанные границы области.*/
    /*Перебираем координаты каждой вершины.*/
    for (let i = 0; i < vertices.length; i++) {
        /*Если X-координата выше верхней границы по оси X, то делаем так, чтобы X-координата была равна этой верхней границе
        за минусом ширины одной клетки. Мы вычитаем здесь ширину одной клетки, чтобы клетка фигуры не выходила за границы области, так как 
        она отрисовывается в правую сторону от вершины, из-за чего может выходить за границы указанной области.*/
        if (vertices[i].x >= x2) { vertices[i].x = x2 - cellWidth };
        /*Если X-координата ниже нижней границы по оси X, то делаем так, чтобы X-координата была равна этой нижней границе.*/
        if (vertices[i].x <= x1) { vertices[i].x = x1 };

        /*Если Y-координата выше верхней границы по оси Y, то делаем так, чтобы Y-координата была равна этой верхней границе
        за минусом высоты одной клетки. Мы вычитаем здесь высоту одной клетки, чтобы клетка фигуры не выходила за границы области, так как 
        она отрисовывается в нижнюю сторону от вершины, из-за чего может выходить за границы указанной области.*/
        if (vertices[i].y >= y2) { vertices[i].y = y2 - cellHeight };
        /*Если Y-координата ниже нижней границы по оси Y, то делаем так, чтобы Y-координата была равна этой нижней границе.*/
        if (vertices[i].y <= y1) { vertices[i].y = y1 };
    };

    console.log(vertices);
    console.log('--------------------------------------');

    /*В конце своей работы функция возвращает массив вершин.*/
    return vertices;
};

/*Функция для отрисовки многоугольника с указанным количеством вершин "numberOfVertices", в указанных границах ("x1"; "x2") и ("y1"; "y2").
Параметры "quarterMovingStepSizeX" и "quarterMovingStepSizeY" являются вспомогательными, чтобы регулировать расстояние между вершинами.*/
function drawShapeUsingPoints(numberOfVertices, x1, x2, y1, y2, quarterMovingStepSizeX, quarterMovingStepSizeY) {
    /*Расчитываем координаты вершин для многоугольника.*/
    const vertices = prepareDataForShapeWithVertices(numberOfVertices, x1, x2, y1, y2, quarterMovingStepSizeX, quarterMovingStepSizeY);

    /*Проверяем находится ли какая-то точка внутри какой-то фигуры.*/
    // checkIfAPointIsInsideAShape({ x: 500, y: 420 }, vertices);

    ctx.beginPath();
    let region = new Path2D();

    for (let i = 0; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
        region.lineTo(vertices[i].x, vertices[i].y);

        // ctx.fillStyle = 'rgb(100, 210, 70)';
        // ctx.fillRect(vertices[i].x, vertices[i].y, cellWidth, cellHeight);

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'lime';
        ctx.strokeRect(vertices[i].x, vertices[i].y, cellWidth / 5, cellHeight / 5);

        ctx.fillStyle = 'black';
        ctx.font = '30px serif';
        ctx.fillText(i + 1, vertices[i].x + 5, vertices[i].y - 5);
    };

    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'yellow';
    // ctx.stroke();

    region.closePath();
    ctx.fillStyle = 'rgb(20, 2, 50, 0.6)';
    ctx.fill(region, 'nonzero');
};

/*Функция для нахождения целочисленных точек на сторонах многоугольника.*/
function findPointsOnEverySideOfAShape(vertices) {
    /*Подготавливаем массив для целочисленных точек на сторонах многоугольника.*/
    const pointsOnEverySideOfAShape = [];

    /*Перебираем попарно все вершины нашего многоугольника, чтобы при помощи линейной интерполяции найти
    целочисленные точки между каждой соседней пар вершин. Каждый цикл переменная "i" представлет номер первой вершины в паре, а
    переменная "k" номер второй вершины в паре.*/
    for (let i = 0; i < vertices.length; i++) {
        let k;

        /*Если текущая вершина "i" не являетя последней вершиной в массиве, то номер второй вершины "k" равен номеру текущей
        вершины "i", увеличенной на 1, иначе переменная "k" равна 0, чтобы найти целочисленные точки между последней вершиной и первой
        вершиной многоугольника.*/
        if (i !== vertices.length - 1) {
            k = i + 1;
        } else {
            k = 0;
        };

        /*При помощи функции линейной интерполяции находим точки между каждой парой вершин нашего многоугольника.*/
        pointsOnEverySideOfAShape.push(helper.getPointsBetweenTwoPoints(vertices[i].x, vertices[i].y, vertices[k].x, vertices[k].y));
    };

    /*Отрисовываем найденные точки.*/
    /*Внешним циклом перебираем вложенные массивы в массиве "pointsOnEverySideOfAShape".*/
    for (let i = 0; i < pointsOnEverySideOfAShape.length; i++) {
        /*Внутренним циклом "for" перебираем точки в каждом вложенном массиве.*/
        for (let j = 0; j < pointsOnEverySideOfAShape[i].length; j++) {
            ctx.fillStyle = helper.getRandomColor();
            ctx.fillRect(pointsOnEverySideOfAShape[i][j].x, pointsOnEverySideOfAShape[i][j].y, 5, 5);
        };
    };

    console.log('pointsOnEverySideOfAShape');
    console.log(pointsOnEverySideOfAShape);
    console.log('--------------------------------------');

    /*В конце своей работы функция возвращает массив из подмассивов точек на сторонах многоугольника.*/
    return pointsOnEverySideOfAShape;
};

/*Функция для определения находится ли точка внутри какого-либо многоугольника на основе метода луча. Кратко он звучит так:
1) Из указанной точки проводится луч вправо или влево.
2) Подсчитывается количество пересечений луча со сторонами многоугольника.
3) Если это количество четное, то точка находится снаружи многоугольника, иначе - внутри.
В качестве параметров этой функции мы отдаем точку "point" и массив вершин многоугольника "vertices".*/
function checkIfAPointIsInsideAShape(point, vertices) {
    /*Отрисовываем луч.*/
    ctx.fillStyle = 'purple';
    ctx.fillRect(point.x, point.y, canvas.width, 10);

    /*Формируем данные для точки пересечения луча и правой границы холста.*/
    const endRayPoint = { x: canvas.width, y: point.y };

    /*При помощи линейной интерполяции получаем целочисленные точки между началом луча и его пересечением с правой границей холста.*/
    const rayPoints = helper.getPointsBetweenTwoPoints(point.x, point.y, endRayPoint.x, endRayPoint.y);

    /*Формируем массив подмассивов целочисленных точек на сторонах многоугольника.*/
    const pointsOnEverySideOfAShape = findPointsOnEverySideOfAShape(vertices);

    /*Подготавливаем переменную для подсчета пересечений луча и сторон многоугольника.*/
    let intersections = 0;

    console.log('pointsOnEverySideOfAShape');
    console.log(pointsOnEverySideOfAShape);

    console.log('rayPoints');
    console.log(rayPoints);
    console.log('--------------------------------------');

    /*Внешним циклом "for" перебираем точки на луче.*/
    for (let i = 0; i < rayPoints.length; i++) {
        /*Средним циклом "for" перебираем подмассивы в массиве целочисленных точек на сторонах многоугольника.*/
        for (let j = 0; j < pointsOnEverySideOfAShape.length; j++) {
            /*Внутренним циклом "for" перебираем целочисленные точки на сторонах многоугольника в каждом подмассиве.*/
            for (let k = 0; k < pointsOnEverySideOfAShape[j].length; k++) {
                /*Если взятая точка луча совпала с взятой точкой со стороны многоугольника, то засчитываем одно пересечение.*/
                if (rayPoints[i].x === pointsOnEverySideOfAShape[j][k].x && rayPoints[i].y === pointsOnEverySideOfAShape[j][k].y) {

                    console.log("rayPoints[i].x + ' ' + rayPoints[i].y");
                    console.log(rayPoints[i].x + ' ' + rayPoints[i].y);

                    console.log("pointsOnEverySideOfAShape[j][k].x + ' ' + pointsOnEverySideOfAShape[j][k].y");
                    console.log(pointsOnEverySideOfAShape[j][k].x + ' ' + pointsOnEverySideOfAShape[j][k].y);
                    console.log('--------------------------------------');

                    /*Отрисовываем желтым цветом точку луча.*/
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(rayPoints[i].x, rayPoints[i].y, 10, 10);

                    /*Отрисовываем зеленым цветом точку луча.*/
                    ctx.fillStyle = 'green';
                    ctx.fillRect(pointsOnEverySideOfAShape[j][k].x, pointsOnEverySideOfAShape[j][k].y, 5, 5);

                    /*Засчитывываем пересечение только в том, случае если текущая взятая точка со стороны многоугольника не совпадала
                    по оси Y c предыдущей взятой точкой со стороны многоугольника. Эта проверка нам нужна, если луч совпал с одной из
                    сторон многоугольника.*/
                    if (pointsOnEverySideOfAShape[j][k].y !== pointsOnEverySideOfAShape[j][k - 1].y) {
                        intersections++;
                    };
                };
            };
        };
    };

    console.log('intersections');
    console.log(intersections);
    console.log('--------------------------------------');

    /*Получив общее количество пересечений точек луча и точек со сторон многоугольника, определяем находится ли указанная
    точка внутри многоугольника или нет. Если количество пересечений четное, то точка находится снаружи, иначе - внутри.*/
    if (intersections % 2 === 0) {
        console.log(false);
        console.log('--------------------------------------');
        ctx.fillStyle = 'red';
        ctx.fillRect(700, 50, 50, 50);

        /*Функция возвращает false, как знак, что точка находится вне многоугольника.*/
        return false;
    } else {
        console.log(true);
        console.log('--------------------------------------');
        ctx.fillStyle = 'green';
        ctx.fillRect(700, 50, 50, 50);

        /*Функция возвращает true, как знак, что точка находится внутри многоугольника.*/
        return true;
    };
};

function draw() {
    clearScreen();
    drawGrid();
    drawShapeUsingPoints(13, 300, 1200, 150, 750, 200, 200);
};

/*-------------------------------------------------------------------------------------------------------------*/

getCellsData();
// setInterval(() => { draw() }, 200);
draw();
// checkIfAPointIsInsideAShape({ x: 320, y: 120 }, findAllCellsInsideOfASHape(prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200)))
// checkIfAPointIsInsideAShape({ x: 320, y: 420 }, findAllCellsInsideOfASHape(prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200)))
// checkIfAPointIsInsideAShape({ x: 520, y: 460 }, findAllCellsInsideOfASHape(prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200)))
// checkIfAPointIsInsideAShape({ x: 720, y: 420 }, findAllCellsInsideOfASHape(prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200)))
// checkIfAPointIsInsideAShape({ x: 400, y: 400 }, findAllCellsInsideOfASHape(prepareDataForShapeWithPoints(13, 300, 1200, 150, 750, 200)))

/*-------------------------------------------------------------------------------------------------------------*/

function test01() {
    for (let i = 0; i < 1000; i++) {
        let arrayOfShapePoints = prepareDataForShapeWithVertices(13, 300, 1200, 150, 750, 200);

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