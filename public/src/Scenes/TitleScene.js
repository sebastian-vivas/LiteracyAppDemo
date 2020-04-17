class TitleScene extends Phaser.Scene{
  contructor() {
    super('Title');
  }

  preload(){

  }

  create () {
    this.button = this.add.image(100, 100, 'button1');
  }
}
