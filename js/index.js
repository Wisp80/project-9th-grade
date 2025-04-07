'use strict';
import { controls } from './main/controls.js';
import { game } from './main/game.js';

window.onload = function () {
    game.initializeMenuButtonsListening();
    controls.initializePlayersControlsListening();
};

requestAnimationFrame((timestamp) => { game.gameLoop(timestamp) });