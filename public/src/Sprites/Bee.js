import "phaser";

export default class Bee extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bee');
    this.scene = scene;
    this.setScale(1.5);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToBee(){
    this.scene.events.emit('beeDialogue');
  };
};
