'use strict';

/*Объект "playerOneDefaultSettings" нужен для хранения дефолтных настроек персонажа.*/
export const playerOneDefaultSettings = {
    playerOneX: 0,
    playerOneY: 400,
    playerOneWidth: 50,
    playerOneHeight: 50,
    playerOneSpeed: 10,
    playerOneSlowDebuffMultiplier: 0.4,
    playerOneMaxHealthPoints: 2,
    playerOneTakeDamageDelay: 50,
    playerOneBulletRadius: 5,
    playerOneBulletStrokeStyle: 'rgba(0, 0, 0, 1)',
    playerOneBulletLineWidth: 0.7,
    playerOneBulletFillStyle: 'rgba(6, 221, 236, 1)',
    playerOneBulletSpeedX: 15,
    playerOneBulletSpeedY: 15,
    playerOneShootDelay: 4
};

/*Объект "enemiesDefaultSettings" нужен для хранения дефолтных настроек врагов.*/
export const enemiesDefaultSettings = {
    startEnemiesCount: 4,
    startEnemiesSpeed: 40,
    startEnemiesShotDelay: 20,
    startEnemiesBulletSpeedX: 10,
    startEnemiesBulletSpeedY: 10
};

/*Объект "rocksDefaultSettings" нужен для хранения дефолтных настроек камней.*/
export const rocksDefaultSettings = {
    startRocksCount: 4
};

/*Объект "puddlesDefaultSettings" нужен для хранения дефолтных настроек луж.*/
export const puddlesDefaultSettings = {
    startPuddlesCount: 4
};