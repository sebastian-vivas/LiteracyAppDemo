import "phaser";

export default class TitleScene extends Phaser.Scene{
  constructor() {
    super('Title');
  };

  preload() {
    this.load.image('titleCover', 'src/assets/images/title.png');
  };

  create() {
    this.add.image(480, 240, 'titleCover');
    const gameButton = this.add.text(590, 40, 'next', { fontSize: '64px', fill: 'black', fontFamily: 'arial', cursor: 'pointer'});
    gameButton.setInteractive();

    gameButton.on('pointerup', () => {
      this.scene.start('Instructions');
    });
  };
};
