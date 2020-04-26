import "phaser";

export default class Star extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'star');
    this.scene = scene;
    this.setScale(1);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToStar(){
    this.scene.events.emit('starDialogue');
  };
};
