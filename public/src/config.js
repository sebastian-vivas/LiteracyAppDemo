import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 960,
  height: 480,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity:{ y: 0 },
      debug: true
    }
  }
};
