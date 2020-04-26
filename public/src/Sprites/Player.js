import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
  super(scene, x, y, 'characters');
  this.scene = scene;
  this.scene.physics.world.enable(this);
  this.scene.add.existing(this);
  this.setScale(1.6);
};

 update (cursors){
   this.setVelocity(0);
   if (cursors.up.isDown){
     this.setVelocityY(-150);
 } else if (cursors.down.isDown){
     this.setVelocityY(150);
 }

 if (cursors.left.isDown){
      this.setVelocityX(-150);
 } else if (cursors.right.isDown){
      this.setVelocityX(150);
    }
  };
};
