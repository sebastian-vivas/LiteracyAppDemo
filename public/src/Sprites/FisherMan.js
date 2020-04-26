import "phaser";

export default class FisherMan extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'fisherMan');
    this.scene = scene;
    this.setScale(1.5);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToFisherMan(){
    this.scene.events.emit('fisherManDialogue');
  };
};
