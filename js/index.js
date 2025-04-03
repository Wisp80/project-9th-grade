'use strict';
import { controls } from './main/controls.js';
import { game } from './main/game.js';

window.onload = function () { controls.initializePlayersControlsListening() };
game.tick();