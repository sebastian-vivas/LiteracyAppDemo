export default class UIScene extends Phaser.Scene {
  constructor(){
    super({ key: 'UI', active: true});
  };

  init () {
    this.coinsCollected = 0;
  };

  create () {
    this.scoreText = this.add.text(12, 12, 'Gems: 0', { fontSize: '24px', fill: '#000', fontFamily: 'arial', backgroundColor: 'white'});
    this.gameScene = this.scene.get('Game');
    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.scoreText.setText(`Gems: ${this.coinsCollected}`);
    });
  };
};
