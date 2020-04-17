import 'phaser';

export default class Coins extends Phaser.Physics.Arcade.StaticGroup {
  constructor (world, scene, children, spriteArray) {
  super(world, scene);
  this.scene = scene;

  spriteArray.forEach((coin) => {
      coin.setOrigin(0);
      this.world.enableBody(coin, 1);
      coin.setScale(2);
      coin.body.setSize(coin.width*coin.scaleX, coin.height*coin.scaleY, true);
      this.add(coin);
    });
  }

  collectCoins (player, coins) {
    this.remove(coins);
    coin.destroy();
  }
};
