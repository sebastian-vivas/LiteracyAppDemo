import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  };

  preload () {
    this.load.tilemapTiledJSON('level1', 'src/assets/tilemaps/level1.json');
    this.load.tilemapTiledJSON('level2', 'src/assets/tilemaps/level2.json');
    this.load.spritesheet('atlas', 'src/assets/images/atlas.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('characters', 'src/assets/images/avatar.png', {frameWidth: 24, frameHeight: 24});
    this.load.image('portal', 'src/assets/images/rightArrow.png');
    this.load.image('returnPortal', 'src/assets/images/leftArrow.png');
    this.load.spritesheet('coin', 'src/assets/images/coin.png', {frameWidth: 14, frameHeight: 12});
    this.load.audio('chimes', '../src/assets/audio/WindlessSlopes.mp3');
    this.load.image('button1', 'src/assets/images/button.png');
    this.load.spritesheet('fox', 'src/assets/images/foxRun.png', {frameWidth: 14, frameHeight: 12});
    this.load.audio('getItemAudio', '../src/assets/audio/8.ogg');
    this.load.image('oldMan', 'src/assets/images/sensei.png');
    this.load.image('vendor', 'src/assets/images/vendor.png');
    this.load.image('bee', 'src/assets/images/bee.png');
    this.load.image('fisherMan', 'src/assets/images/fisherMan.png');
    this.load.image('foodVendor', 'src/assets/images/vendor.png');
    this.load.spritesheet('friend', 'src/assets/images/friend.png', {frameWidth: 24, frameHeight: 24});
    this.load.image('star', 'src/assets/images/star.png');
    this.load.image('ui', 'src/assets/images/textBox.png');
    this.load.image('pageOne', 'src/assets/images/pageOne.png');
    this.load.image('pageTwo', 'src/assets/images/pageTwo.png');
    this.load.image('pageThree', 'src/assets/images/pageThree.png');
    this.load.image('pageFour', 'src/assets/images/pageFour.png');
    this.load.image('pageFive', 'src/assets/images/pageFive.png');
    this.load.image('pageSix', 'src/assets/images/pageSix.png');
    // this.load.image('helloBubble', 'src/assets/images/hello.png');
};

  create () {
    this.scene.start('Title');
  }
};
