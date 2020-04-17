import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.levels = {
      1: 'level1',
      2: 'level2'
    };
    this.load.tilemapTiledJSON('level1', 'src/assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON('level2', 'src/assets/tilemaps/level2.json');
    this.load.spritesheet('atlas', 'src/assets/images/atlas.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('characters', 'src/assets/images/avatar.png', {frameWidth: 24, frameHeight: 24});
    this.load.image('portal', 'src/assets/images/sensei.png');
    this.load.spritesheet('coin', 'src/assets/images/coin.png', {frameWidth: 14, frameHeight: 12});
    this.load.audio('chimes', 'src/assets/audio/WindlessSlopes.mp3');
    this.load.audio('getItemAudio', 'src/assets/audio/8.ogg');
    this.load.image('button1', 'src/assets/images/button.png');
    this.load.spritesheet('fox', 'src/assets/images/foxRun.png', {frameWidth: 14, frameHeight: 12});
}

  create () {
    this.scene.start('Game', {level: 1, newGame: true, levels: this.levels});
    
  }
};
