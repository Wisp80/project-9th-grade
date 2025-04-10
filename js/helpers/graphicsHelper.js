'use strict';
import { mathHelper } from './mathHelper.js';

export const graphicsHelper = {
    /*Метод "getRandomColor()" генерирует случайный цвет в формате HEX в строковом представлении.
    Метод "getRandomColor()" не принимает никаких параметров.
    Метод "getRandomColor()" возвращает случайный цвет в формате HEX в строковом представлении.*/
    getRandomColor: function () {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) { color += letters[Math.floor(Math.random() * 16)] };
        return color;
    },

    /*Метод "drawPolygonFromVertices()" отрисовывает многоугольник на основе координат вершин.
    
    Метод "drawPolygonFromVertices()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "vertices" - это параметр в виде массива объектов, содержащих координаты вершин многоугольника. Вершины 
    многоугольника должны быть указаны в последовательном порядке.
    3. "lineWidth" - это числовой параметр, указывающий толщину обводки многоугольника.
    4. "strokeStyle" - это строковой параметр, указывающий стиль обводки многоугольника.
    5. "fillStyle" - это строковой параметр, указывающий стиль заливки многоугольника.
    
    Метод "drawPolygonFromVertices()" ничего не возвращает.*/
    drawPolygonFromVertices: function (ctx, vertices, lineWidth, strokeStyle, fillStyle) {
        /*Избавляемся от дубликатов вершин многоугольника, если таковые имеются, при помощи метода 
        "mathHelper.removeDuplicatesFromPoints()".*/
        vertices = mathHelper.removeDuplicatesFromPoints(vertices);

        /*Создаем путь для отрисовки многоугольника.*/
        ctx.beginPath();
        const region = new Path2D();

        for (let i = 0; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
            region.lineTo(vertices[i].x, vertices[i].y);

            /*Отрисовываем вершины многоугольника. Это нужно только для тестирования.*/
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = 'lime';
            // ctx.strokeRect(vertices[i].x, vertices[i].y, canvasData.cellWidth / 5, canvasData.cellHeight / 5);

            /*Отрисовываем номера вершин многоугольника. Это нужно только для тестирования.*/
            // ctx.fillStyle = 'black';
            // ctx.font = '30px serif';
            // ctx.fillText(i + 1, vertices[i].x + 5, vertices[i].y - 5);
        };

        /*Замыкаем путь для отрисовки многоугольника.*/
        ctx.closePath();
        region.closePath();

        /*Закрашиваем многоугольник.*/
        ctx.fillStyle = fillStyle;
        ctx.fill(region, 'nonzero');

        /*Обводим многоугольник.*/
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    },

    /*Метод "clearScreen()" очищает экран.

    Метод "clearScreen()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "clearScreen()" ничего не возвращает.*/
    clearScreen: function (ctx, canvasData, color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvasData.canvasWidth, canvasData.canvasHeight);
    },

    /*Метод "drawGrid()" отрисовывает сетку.
    
    Метод "drawGrid()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "canvasData" - это параметр в виде объекта, содержащего данные о холсте.

    Метод "drawGrid()" ничего не возвращает.*/
    drawGrid: function (ctx, canvasData) {
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'black';

        for (let i = 0; i < canvasData.canvasWidth; i += canvasData.cellWidth) {
            for (let j = 0; j < canvasData.canvasHeight; j += canvasData.cellHeight) {
                ctx.strokeRect(i, j, canvasData.cellWidth, canvasData.cellHeight);
            };
        };
    },

    /*Метод "parseColor()" на основе строки, указывающей цвет в формате HEX или в формате RGBA, формирует массив 
    числовых значений, представляющих собой компоненты цвета в формате RGBA.
    
    Метод "parseColor()" принимает следующие параметры:
    1. "color" - это строковой параметр, указывающий цвет в формате HEX (например, "#777777" или "#abc") или цвет в
    формате RGBA (например, "rgba(119, 119, 119, 0.5)"). Если указать любую другую строку, то функция вернет
    [119, 119, 119, 0.5], то есть серый цвет.

    Метод "parseColor()" возвращает массив числовых значений, представляющих собой компоненты цвета в формате RGBA.*/
    parseColor: function (color) {
        /*Создаем цвет в формате RGBA и сохраняем его в переменной "defaultRGBAComponents" на случай, когда в метод
        "parseColor()" был передан цвет в некорректном формате.*/
        const defaultRGBAComponents = [119, 119, 119, 0.5];

        /*Если строка в параметре "color" начинается с символа "#", значит это цвет в формате HEX. Если же строка в 
        переменной "color" начинается с символа "rgba", значит это цвет в формате RGBA.*/
        if (color.startsWith('#')) {
            /*Создаем строку на основе строки из параметра "color", убирая из него символ "#", при помощи метода 
            "slice()". То есть, например, из строки "#777777" получаем строку "777777", или из строки "#abc" 
            получаем строку "abc".*/
            const hex = color.slice(1);

            /*Если в параметре "color" указана сокращенная запись цвета в формате HEX, например, "#abc", то 
            обрабатываем ее здесь.*/
            if (hex.length === 3) {
                /*Функция "parseInt()" преобразовывает строку в десятичное число. Первым параметром функция "parseInt()"
                принимает строку, а вторым параметром можно указать в какой системе счисления воспринимать эту строку. 
                При помощи функции "parseInt()" на основе переданной строки получаем числовые значения компонентов 
                цвета в формате RGBA. Полученные компоненты оборачиваем в массив и возвращаем.*/
                return [
                    parseInt(hex[0] + hex[0], 16),
                    parseInt(hex[1] + hex[1], 16),
                    parseInt(hex[2] + hex[2], 16),
                    1
                ];
            };

            /*Если в параметре "color" указана полная запись цвета в формате HEX, например, "#777777", то обрабатываем
            ее здесь аналогичным образом.*/
            return [
                parseInt(hex.substring(0, 2), 16),
                parseInt(hex.substring(2, 4), 16),
                parseInt(hex.substring(4, 6), 16),
                1
            ];
        } else if (color.startsWith('rgba')) {
            /*Используем регулярное выражение для осуществления строгой проверки формата RGBA:
            1. ^ - начало строки.
            2. rgba\( - буквально "rgba(".
            3. \d+ - одна или больше цифр (R компонент).
            4. ,\s* - запятая с необязательными пробелами.
            5. Повторяется для G и B компонентов.
            6. [\d.]+ - Alpha: цифры или точка (дробные значения).
            7. \)$ - закрывающая скобка и конец строки.
            
            Метод "test()" проверяет, соответствует ли строка заданному регулярному выражению.
            
            Если строка в параметре "color" не соответствует строгому формату RGBA, то возвращаем [119, 119, 119, 0.5],
            то есть серый цвет.*/
            if (!/^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/.test(color)) { return defaultRGBAComponents };

            /*При помощи метода "slice()" обрезаем "rgba(" и ")", например, из строки "rgba(119, 119, 119, 0.5)"
            получаем строку "119, 119, 119, 0.5". Затем при помощи метода "split()" разбиваем строку на массив подстрок 
            по указанному разделителю, например, из строки "119, 119, 119, 0.5" получаем массив 
            ["119", " 119", " 119", " 0.5"]. После этого при помощи методов "map()" и "trim()" удаляем пробелы вокруг 
            значений в массиве, например, из массива ["119", " 119", " 119", " 0.5"] получаем массив 
            ["119", "119", "119", "0.5"]. Полученный массив сохраняем в переменной "parts".*/
            const parts = color.slice(5, -1).split(',').map(s => s.trim());

            /*Проверяем отличается ли количество компонентов цвета RGBA в массиве "parts" от четырех, а так же проверяем 
            нет ли среди них пустых значений при помощи метода "some()". Если это так, то возвращаем 
            [119, 119, 119, 0.5], то есть серый цвет. 
            
            Метод "some()" проверяет, удовлетворяет ли хотя бы один элемент массива заданному условию.*/
            if (parts.length !== 4 || parts.some(part => part === "")) { return defaultRGBAComponents };

            /*Используем регулярное выражение, чтобы проверить, что в Alpha-канале, то есть в 4-м элементе массива 
            "parts", нет более одной точки:
            1. \. - экранированная точка, ищет именно символ ".", а не любой символ.
            2. g - флаг "global", чтобы найти все совпадения, не только первое.
            
            Метод "match()" ищет части строки, которые соответствуют заданному шаблону в виде регулярного выражения. 
            Метод "match()", если в регулярном выражении не указан флаг "g", возвращает массив с первым совпадением 
            и дополнительной информацией, например, ["42", index: 6, input: "Hello 42 world 42"]. Метод "match()", 
            если в регулярном выражении указан флаг "g", возвращает массив всех совпадений, но без деталей, например, 
            ["42", "42"]. Если совпадений нет, то метод "match()" возвращает null.
        
            Оператор "||" выполняет следующие действия:
            1. Вычисляет операнды слева направо.
            2. Каждый операнд конвертирует в логическое значение. Если результат true, останавливается и возвращает 
            исходное значение этого операнда.
            3. Если все операнды являются ложными (false), то возвращает последний из них.
        
            Мы используем здесь оператор "||" на случай если метод "match()" возвращает null, чтобы тогда подставить 
            пустой массив.
            
            Если в Alpha-канале, то есть в 4-м элементе массива "parts", больше одной точки, то это означает, что формат 
            Alpha-канала указан неверно. В таком случае возвращаем [119, 119, 119, 0.5], то есть серый цвет.*/
            if (
                (parts[3].match(/\./g) || []).length > 1
            ) {
                return defaultRGBAComponents;
            };

            /*Создаем массив на основе массива "parts" при помощи метода "map()", переводя каждый элемента массива 
            "parts" в число.*/
            const components = parts.map(Number);

            /*Проверяем нет ли NaN в массиве "components" при помощи метода "some()", а также проверяем не находятся ли 
            в недопустимых значениях компоненты цвета в формате RGBA в массиве "components". Если это так, то возвращаем 
            [119, 119, 119, 0.5], то есть серый цвет.*/
            if (
                components.some(isNaN) ||
                components[0] < 0 || components[0] > 255 ||
                components[1] < 0 || components[1] > 255 ||
                components[2] < 0 || components[2] > 255 ||
                components[3] < 0 || components[3] > 1
            ) {
                return defaultRGBAComponents;
            };

            /*Если все проверки успешно пройдены, то возвращаем массив числовых значений компонентов цвета RGBA.*/
            return components;
        };

        /*Если строка в параметре "color" не является представлением цвета в формате HEX или RGBA, то возвращаем 
        [119, 119, 119, 0.5], то есть серый цвет.*/
        return defaultRGBAComponents;
    },

    /*Метод "generateGradientColors()" генерирует массив элементов, который обозначает последовательность оттенков в 
    формате RGBA от светлого к темному или от темного к светлому, на основе базового цвета.

    Метод "generateGradientColors()" принимает следующие параметры:
    1. "baseColor" - это строковой параметр, указывающий базовый цвет в формате HEX (например, "#777777" или 
    "#abc") или цвет в формате RGBA (например, "rgba(119, 119, 119, 0.5)").
    2. "gradientSteps" - это числовой параметр, указывающий сколько цветов должно быть в последовательности оттенков.
    3. "darkeningStep" - это числовой параметр от 0 до 1, указывающий силу затемнения оттенков в последовательности.
    4. "isGradientReversed" - это булев параметр, указывающий должна ли последовательность оттенков быть от темного к 
    светлому или от светлого к темному.

    Метод "generateGradientColors()" возвращает массив элементов, который обозначает последовательность оттенков в 
    формате RGBA от светлого к темному или от темного к светлому.*/
    generateGradientColors: function (baseColor, gradientSteps, darkeningStep, isGradientReversed) {
        /*Переводим цвет, указанный в параметре "baseColor", в массив компонентов этого цвета в формате RGBA при помощи 
        метода "parseColor()".*/
        const parsed = graphicsHelper.parseColor(baseColor);

        /*На основе массива "parsed" создаем четыре переменные, каждая из которых содержит значение какого-то компонента 
        цвета в формате RGBA. Если цвет указан в формате HEX, то на этот случай указываем, что Альфа-канал равен 1.*/
        const [r, g, b, a = 1] = parsed;

        /*Создаем переменную "colors" для хранения цветов, составляющих последовательность оттенков от светлого к 
        темному или от темного к светлому.*/
        const colors = [];

        /*Делаем указанное в параметре "gradientSteps" шагов, на каждом шагу создавая новый цвет.*/
        for (let i = 0; i < gradientSteps; i++) {
            /*Рассчитываем позицию цвета в последовательности. Это значение всегда будет от 0 до 1, например, для 7
            шагов будут следующие позиции:
            0 / (7 - 1) = 0 / 6 = 0
            1 / (7 - 1) = 1 / 6 
            2 / (7 - 1) = 2 / 6
            3 / (7 - 1) = 3 / 6
            4 / (7 - 1) = 4 / 6
            5 / (7 - 1) = 5 / 6
            6 / (7 - 1) = 6 / 6 = 1*/
            const factor = i / (gradientSteps - 1);

            /*Рассчитываем коэффициент затемнения цвета в последовательности. Это значение всегда будет от 1 до 
            1 - darkeningStep, например, для 7 шагов с силой затемнения 0.7 будут следующие значения:
            1 - 0 * 0.7 = 1 - 0 = 1
            1 - 1/6 * 0.7 = 1 - 0.116666... ≈ 0.8833
            1 - 2/6 * 0.7 = 1 - 1/3 * 0.7 ≈ 1 - 0.2333 ≈ 0.7667
            1 - 3/6 * 0.7 = 1 - 0.5 * 0.7 = 1 - 0.35 = 0.65
            1 - 4/6 * 0.7 = 1 - 2/3 * 0.7 ≈ 1 - 0.4667 ≈ 0.5333
            1 - 5/6 * 0.7 = 1 - 0.5833 ≈ 0.4167
            1 - 1 * 0.7 = 1 - 0.7 = 0.3*/
            const darkenFactor = 1 - factor * darkeningStep;

            /*Затемняем каждый компонент цвета в формате RGBA.*/
            const newR = Math.floor(r * darkenFactor);
            const newG = Math.floor(g * darkenFactor);
            const newB = Math.floor(b * darkenFactor);
            /*Сохраняем исходную прозрачность.*/
            const newA = a;

            /*Из полученных компонентов цвета в формате RGBA формируем строковое представление этого цвета в формате 
            RGBA и добавляем его в массив "colors".*/
            colors.push(`rgba(${newR}, ${newG}, ${newB}, ${newA})`);
        };

        /*Если не указано, чтобы последовательность цветов была от темного к светлому, то возвращаем массив элементов, 
        который обозначает последовательность оттенков от светлого к темному. Иначе возвращаем массив элементов, который 
        обозначает последовательность оттенков от темного к светлому.*/
        if (!isGradientReversed) { return colors } else { return colors.reverse() };
    },

    /*Метод "drawPolygonFromVerticesWithStepGradient()" отрисовывает многоугольник со ступенчатым градиентом на основе 
    координат вершин.

    Метод "drawPolygonFromVerticesWithStepGradient()" принимает следующие параметры:
    1. "ctx" - это параметр в виде объекта, содержащего данные о 2D контексте холста.
    2. "vertices" - это параметр в виде массива объектов, содержащих координаты вершин многоугольника. Вершины 
    многоугольника должны быть указаны в последовательном порядке.
    3. "baseColor" - это строковой параметр, указывающий цвет основания многоугольника в формате HEX (например, 
    "#777777" или "#abc") или цвет в формате RGBA (например, "rgba(119, 119, 119, 0.5)").
    4. "gradientSteps" - это числовой параметр, указывающий сколько цветов должно быть в последовательности оттенков 
    ступенчатого градиента.
    5. "darkeningStep" - это числовой параметр от 0 до 1, указывающий силу затемнения оттенков в последовательности в
    ступенчатом градиенте.
    6. "isGradientReversed" - это булев параметр, указывающий должна ли последовательность оттенков быть от темного к 
    светлому или от светлого к темному в ступенчатом градиенте.
    7. "lastLayerFactor" - это числовой параметр, указывающий коэффициент уменьшения, который определяет насколько 
    сильно будет уменьшен последний слой градиента, то есть самый внутренний слой, при ступенчатом градиенте.
    8. "strokeStyle" - это строковой параметр, указывающий цвет обводки многоугольника.
    9. "lineWidth" - это числовой параметр, указывающий ширину обводки многоугольника.

    Метод "drawPolygonFromVerticesWithStepGradient()" ничего не возвращает.*/
    drawPolygonFromVerticesWithStepGradient: function (
        ctx, vertices,
        baseColor, gradientSteps, darkeningStep, isGradientReversed,
        lastLayerFactor,
        strokeStyle, lineWidth
    ) {
        /*Избавляемся от дубликатов вершин многоугольника, если таковые имеются, при помощи метода 
        "mathHelper.removeDuplicatesFromPoints()".*/
        vertices = mathHelper.removeDuplicatesFromPoints(vertices);
        
        /*Создаем переменную "center" для хранения точки, относительно которой будет масштабироваться фигура.*/
        const center = { x: 0, y: 0 };

        /*Суммируем все координаты вершин.*/
        for (const vertice of vertices) {
            center.x += vertice.x;
            center.y += vertice.y;
        };

        /*Находим координаты геометрического центра. Геометрический центр или центроид - это точка, которая является 
        средним арифметическим положением всех вершин фигуры. Проще говоря, если представить многоугольник как плоский 
        физический объект, то это "балансировочная точка" многоугольника, то есть воображаемая точка, в которой фигура 
        могла бы идеально балансировать на кончике карандаша, если бы была вырезана из плоского однородного материала,
        например, картона. Каждая координата геометрического центра вычисляется как сумма всех координат деленная на
        количество вершин.*/
        center.x /= vertices.length;
        center.y /= vertices.length;

        /*Генерируем массив элементов, который обозначает последовательность оттенков от темного к светлому.*/
        const colors = this.generateGradientColors(
            baseColor,
            gradientSteps,
            darkeningStep,
            isGradientReversed
        );

        /*Создаем массив чисел от 1 до 1 - lastLayerFactor, равномерно распределенных для заданного количества шагов. 
        Эти числа представляют собой коэффициенты масштабирования, которые будут использоваться для постепенного
        уменьшения фигуры. Создаем этот массив при помощи метода "Array.from()", первым параметром указывая длину этого
        массива, а вторым параметром указывая функцию-преобразователь, которая будет вызываться и заполнять массив 
        значениями. "_" обозначает игнорируемый параметр, обычно так обозначают неиспользуемые переменные.
        
        Например, при 7 шагах и "lastLayerFactor" равным 0.8 получим следующие значения:
        1 - (0 / (7 - 1)) * 0.8 = 1 - 0 = 1
        1 - (1 / (7 - 1)) * 0.8 = 1 - (1 / 6) * 0.8 ≈ 1 − 0.1333 ≈ 0.8667
        1 - (2 / (7 - 1)) * 0.8 = 1 - (2 / 6) * 0.8 ≈ 1 − 0.2667 ≈ 0.7333
        1 - (3 / (7 - 1)) * 0.8 = 1 - (3 / 6) * 0.8 = 1 − 0.5×0.8 = 1 − 0.4 = 0.6
        1 - (4 / (7 - 1)) * 0.8 = 1 - (4 / 6) * 0.8 ≈ 1 − 0.5333 ≈ 0.4667
        1 - (5 / (7 - 1)) * 0.8 = 1 - (5 / 6) * 0.8 ≈ 1 − 0.6667 ≈ 0.3333
        1 - (6 / (7 - 1)) * 0.8 = 1 - (6 / 6) * 0.8 = 1 - 0.8 = 0.2*/
        const scales = Array.from(
            { length: gradientSteps },
            (_, i) => 1 - (i / (gradientSteps - 1)) * lastLayerFactor
        );

        /*Отрисовываем слои внутри камня указанное в параметре "gradientSteps" раз. Каждый проход цикла создает один 
        слой камня, который немного меньше предыдущего.*/
        for (let i = 0; i < gradientSteps; i++) {
            /*Создаем масштабированные вершины для слоя камня. Формула этого масштабирования в общем виде: 
            scaled = center + (original − center) * scale.*/
            const scaledVertices = vertices.map(
                vertice => (
                    {
                        x: center.x + (vertice.x - center.x) * scales[i],
                        y: center.y + (vertice.y - center.y) * scales[i]
                    }
                )
            );

            /*Создаем путь.*/
            const path = new Path2D();
            /*Начинаем путь с первой вершины.*/
            path.moveTo(scaledVertices[0].x, scaledVertices[0].y);

            /*Рисует линии к остальным вершинам.*/
            for (let j = 1; j < scaledVertices.length; j++) {
                path.lineTo(scaledVertices[j].x, scaledVertices[j].y);
            };

            /*Замыкаем контур, то есть соединяем последнюю вершину с первой.*/
            path.closePath();

            /*Заливаем слой камня.*/
            ctx.fillStyle = colors[i];
            ctx.fill(path);

            /*Обводим первый слой камня.*/
            if (i === 0) {
                ctx.strokeStyle = strokeStyle;
                ctx.lineWidth = lineWidth;
                ctx.stroke(path);
            };
        };
    }
};