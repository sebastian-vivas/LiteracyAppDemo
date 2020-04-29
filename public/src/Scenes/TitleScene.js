import "phaser";

export default class TitleScene extends Phaser.Scene{
  constructor() {
    super('Title');
  };

  preload(){
    this.load.image('titleCover', 'src/assets/images/title.png');
  };

  create() {
    this.add.image(480, 240, 'titleCover');
    const gameButton = this.add.text(352, 290, 'Next', { fontSize: '32px', fill: '#fff', fontFamily: 'arial' });
    gameButton.setInteractive();

    gameButton.on('pointerup', () => {
      this.scene.start('Instructions');
    });
  };
};
