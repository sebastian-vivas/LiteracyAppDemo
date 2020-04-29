import "phaser";

export default class OldMan extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'oldMan');
    this.scene = scene;
    this.setScale(1.6);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToOldMan(){
    this.scene.events.emit('oldManDialogue');
  };
};
