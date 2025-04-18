'use strict';

/*Объект "playerOneDefaultSettings" нужен для хранения дефолтных настроек персонажа.*/
export const playerOneDefaultSettings = {
    playerOneX: 0,
    playerOneY: 400,
    playerOneWidth: 50,
    playerOneHeight: 50,
    playerOneSpeed: 11,
    playerOneSlowDebuffMultiplier: 0.3,
    playerOneMaxHealthPoints: 3,
    playerOneTakeDamageDelay: 50,
    playerOneBulletRadius: 6,
    playerOneBulletStrokeStyle: 'rgba(0, 0, 0, 1)',
    playerOneBulletLineWidth: 0.7,
    playerOneBulletFillStyle: 'rgba(6, 221, 236, 1)',
    playerOneBulletSpeedX: 15,
    playerOneBulletSpeedY: 15,
    playerOneShootDelay: 12
};

/*Объект "enemiesDefaultSettings" нужен для хранения дефолтных настроек врагов.*/
export const enemiesDefaultSettings = {
    startEnemiesCount: 4,
    startEnemiesSpeed: 40,
    startEnemiesShotDelay: 60,
    startEnemiesBulletSpeedX: 10,
    startEnemiesBulletSpeedY: 10
};

/*Объект "rocksDefaultSettings" нужен для хранения дефолтных настроек камней.*/
export const rocksDefaultSettings = {
    startRocksCount: 6
};

/*Объект "puddlesDefaultSettings" нужен для хранения дефолтных настроек луж.*/
export const puddlesDefaultSettings = {
    startPuddlesCount: 3
};