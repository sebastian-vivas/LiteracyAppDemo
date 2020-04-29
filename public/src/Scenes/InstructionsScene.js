import "phaser";

export default class InstructionsScene extends Phaser.Scene{
  constructor() {
    super('Instructions');
  };

  preload(){
    this.levels = {
      1: 'level1',
      2: 'level2'
    };
    this.load.image('titleCover', 'src/assets/images/title.png');
  };

  create() {
    this.add.image(480, 240, 'titleCover');
    const gameButton = this.add.text(352, 290, 'Start', { fontSize: '32px', fill: '#fff', fontFamily: 'arial' });
    gameButton.setInteractive();

    gameButton.on('pointerup', () => {
      this.scene.start('Game', {level: 1, newGame: true, levels: this.levels});
      this.sound.add('chimes', {loop: true, volume: .6}).play();
    });
  };
};
