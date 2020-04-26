import "phaser";

export default class FoodVendor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'foodVendor');
    this.scene = scene;
    this.setScale(1.5);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToFoodVendor(){
    this.scene.events.emit('foodVendorDialogue');
  };
};
