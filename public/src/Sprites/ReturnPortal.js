import "phaser";

export default class ReturnPortal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'returnPortal');
    this.scene = scene;
    this.setScale(.8);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }
}
