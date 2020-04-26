import "phaser";

export default class Friend extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'friend');
    this.scene = scene;
    this.setScale(1.5);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  };

  talkToFriend(){
    this.scene.events.emit('friendDialogue');
  };
};
