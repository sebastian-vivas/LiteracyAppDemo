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
    this.load.image('instructions', 'src/assets/images/instructions.png');
  };

  create() {
    this.add.image(480, 240, 'instructions');
    const gameButton = this.add.text(847, 425, 'start', { fontSize: '54px', fill: 'black', fontFamily: 'arial', backgroundColor: 'rgb(247, 246, 246)'});
    gameButton.setInteractive();

    gameButton.on('pointerup', () => {
      this.scene.start('Game', {level: 1, newGame: true, levels: this.levels});
      this.sound.add('chimes', {loop: true, volume: .6}).play();
    });
  };
};
