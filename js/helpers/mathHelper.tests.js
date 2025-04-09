'use strict';
import { mathHelper } from '../helpers/mathHelper.js';

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 5 }, { x: 6, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 5 }
// )); // true
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 4 }, { x: 5, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 4 }
// )); // true

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 5 }, { x: 5, y: 2 }, { x: 3, y: 1 }, { x: 4, y: 3 }
// )); // true
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 5 }, { x: 4, y: 2 }, { x: 3, y: 1 }, { x: 7, y: 5 }
// )); // true

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 4, y: 5 }, { x: 7, y: 2 }, { x: 1, y: 2 }, { x: 5, y: 6 }
// )); // true
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 5 }, { x: 4, y: 1 }, { x: 5, y: 3 }, { x: 6, y: 5 }
// )); // false

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 5 }, { x: 4, y: 1 }, { x: 5, y: 5 }, { x: 7, y: 2 }
// )); // false
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 }, { x: 9, y: 2 }
// )); // false

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 2 }, { x: 6, y: 2 }
// )); // true
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 1, y: 1 }, { x: 3, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 5 }
// )); // true

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 1 }, { x: 4, y: 3 }, { x: 4, y: 3 }, { x: 7, y: 3 }
// )); // true
// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 2, y: 1 }, { x: 4, y: 4 }, { x: 4, y: 4 }, { x: 8, y: 2 }
// )); // true

/*--------------------------------------------------------------------------------------------------------------------*/

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 7, y: 9 }, { x: 10, y: 5 }, { x: 10, y: 2 },
//         { x: 15, y: 2 }, { x: 17, y: 5 }, { x: 20, y: 7 },
//         { x: 15, y: 9 }, { x: 12, y: 7 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 11, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 2 },
//         { x: 15, y: 2 }, { x: 17, y: 5 }, { x: 20, y: 7 },
//         { x: 15, y: 9 }, { x: 12, y: 7 }
//     ]
// )); // false

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 9, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 2 },
//         { x: 15, y: 2 }, { x: 17, y: 5 }, { x: 20, y: 7 },
//         { x: 15, y: 9 }, { x: 12, y: 7 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 11, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 2 },
//         { x: 15, y: 2 }, { x: 17, y: 5 }, { x: 20, y: 7 },
//         { x: 11, y: 11 }, { x: 12, y: 7 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 9, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 2 },
//         { x: 15, y: 2 }, { x: 17, y: 5 }, { x: 20, y: 7 },
//         { x: 15, y: 9 }, { x: 11, y: 9 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 2 }, { x: 4, y: 1 }, { x: 7, y: 3 },
//         { x: 10, y: 3 }, { x: 8, y: 6 }, { x: 10, y: 7 },
//         { x: 8, y: 9 }, { x: 6, y: 10 }, { x: 4, y: 10 },
//         { x: 2, y: 7 }
//     ],

//     [
//         { x: 5, y: 4 }, { x: 6, y: 5 }, { x: 7, y: 4 },
//         { x: 7, y: 6 }, { x: 8, y: 7 }, { x: 6, y: 9 },
//         { x: 5, y: 7 }, { x: 4, y: 7 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ]
// )); // true

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 2, y: 14 }, { x: 3, y: 9 }, { x: 6, y: 6 },
//         { x: 9, y: 6 }, { x: 11, y: 9 }, { x: 11, y: 12 },
//         { x: 8, y: 10 }, { x: 6, y: 14 }, { x: 4, y: 11 }
//     ],

//     [
//         { x: 6, y: 6 }, { x: 9, y: 6 }, { x: 11, y: 9 },
//         { x: 11, y: 12 }, { x: 8, y: 10 }, { x: 6, y: 14 },
//         { x: 4, y: 11 }, { x: 2, y: 14 }, { x: 3, y: 9 }
//     ]
// )); // true

/*--------------------------------------------------------------------------------------------------------------------*/

// console.log(mathHelper.doTwoPolygonsIntersect(
//     [
//         { x: 1, y: 400 }, { x: 51, y: 400 }, { x: 51, y: 450 }, { x: 1, y: 450 }
//     ],

//     [
//         { x: 725, y: 300 }, { x: 790, y: 325 }, { x: 790, y: 375 }, { x: 750, y: 425 },
//         { x: 725, y: 450 }, { x: 675, y: 465 }, { x: 625, y: 400 }, { x: 575, y: 325 },
//         { x: 536, y: 275 }, { x: 575, y: 211 }, { x: 650, y: 211 }, { x: 650, y: 211 },
//         { x: 700, y: 211 }
//     ]
// )); // false

// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 1, y: 400 }, { x: 51, y: 400 },
//     { x: 650, y: 211 }, { x: 650, y: 211 })
// ); // false

// console.log(mathHelper.getPointPositionRelativeToLineSegment(650, 211, 650, 211, 1, 400));


// console.log(mathHelper.doTwoLineSegmentsIntersect(
//     { x: 1, y: 400 }, { x: 51, y: 400 },
//     { x: 1000, y: 1000 }, { x: 1000, y: 1000 })
// ); // false

// console.log(mathHelper.removeDuplicatesFromPoints(
//     [
//         { x: 725, y: 300 }, { x: 790, y: 325 }, { x: 790, y: 375 }, { x: 750, y: 425 },
//         { x: 725, y: 450 }, { x: 675, y: 465 }, { x: 625, y: 400 }, { x: 575, y: 325 },
//         { x: 536, y: 275 }, { x: 575, y: 211 }, { x: 650, y: 211 }, { x: 650, y: 211 },
//         { x: 700, y: 211 }
//     ]
// ));

/*--------------------------------------------------------------------------------------------------------------------*/

// const point01 = { x: 1350, y: 850 };
// const point02 = { x: 1350, y: 550 };
// const point03 = { x: 1475, y: 850 };

// const array01 = [
//     { x: 1500, y: 725 },
//     { x: 1575, y: 775 },
//     { x: 1525, y: 800 },
//     { x: 1475, y: 850 },
//     { x: 1400, y: 800 },
//     { x: 1350, y: 700 },
//     { x: 1400, y: 625 },
//     { x: 1425, y: 550 },
// ];

// console.log(mathHelper.isPointInsidePolygon(point01, array01)); // false
// console.log(mathHelper.isPointInsidePolygon(point02, array01)); // false
// console.log(mathHelper.isPointInsidePolygon(point03, array01)); // true

// const point04 = { x: 1300, y: 850 };

// const array02 = [
//     { x: 1500, y: 725 },
//     { x: 1575, y: 775 },
//     { x: 1525, y: 800 },
//     { x: 1475, y: 850 },
//     { x: 1400, y: 800 },
//     { x: 1350, y: 850 }, // !!!
//     { x: 1400, y: 625 },
//     { x: 1425, y: 550 },
// ];

// console.log(mathHelper.isPointInsidePolygon(point04, array02)); // false

// const point05 = { x: 6, y: 8 };
// const array03 = [
//     { x: 3, y: 5 },
//     { x: 12, y: 3 },
//     { x: 10, y: 8 },
//     { x: 9, y: 5 },
//     { x: 7, y: 8 },
//     { x: 6, y: 5 },
//     { x: 4, y: 8 },
// ];

// console.log(mathHelper.isPointInsidePolygon(point05, array03)); // false

// const point06 = { x: 6, y: 8 };
// const array04 = [
//     { x: 3, y: 5 },
//     { x: 15, y: 3 },
//     { x: 13, y: 8 },
//     { x: 12, y: 5 },
//     { x: 10, y: 8 },
//     { x: 9, y: 5 },
//     { x: 7, y: 8 },
//     { x: 6, y: 5 },
//     { x: 4, y: 8 },
// ];

// console.log(mathHelper.isPointInsidePolygon(point06, array04)); // false

/*--------------------------------------------------------------------------------------------------------------------*/