import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';


export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init (data) {
    console.log(data)
    this._LEVEL = data.level;
    this._LEVELS = data.levels;
    this._NEWGAME = data.newGame;
    this.loadingLevel = false;
  }

  create () {
    const getItemAudio = this.sound.add('getItemAudio');
    this.scale.on('resize', this.resize, this);
    this.createMap();
    this.createPlayer();
    this.cameras.main.startFollow(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.addCollisions();
    this.createPortal();
    this.coin = this.physics.add.image(300, 110, 'coin', 0);
    this.coin.setScale(1.5);
    this.physics.add.overlap(this.player, this.coin, function(player, coin) {getItemAudio.play(); coin.destroy();});
    this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
    this.sound.add('chimes', {loop: true}).play();
  }

  createPlayer () {
    this.map.findObject('Player', (obj) => {
      this.player = new Player (this, obj.x, obj.y);
    });
  }

  createPortal() {
  this.map.findObject('Portal', (obj) => {
      this.portal = new Portal(this, obj.x, obj.y);
    });
  }

  update () {
    this.player.update(this.cursors);
  };

  addCollisions () {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.add.collider(this.player, this.blocked2Layer);
    this.physics.add.collider(this.player, this.blocked3Layer);
  };

  resize(gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width;
    let height = gameSize.height;
    if (width === undefined){
      width = this.sys.game.config.width;
    }
    if (height === undefined){
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  };

  createMap () {
    this.map = this.make.tilemap({key: this._LEVELS[this._LEVEL]});
    this.tiles = this.map.addTilesetImage('atlas');
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.background2Layer = this.map.createStaticLayer('Background2', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.blocked2Layer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0);
    this.blocked3Layer = this.map.createStaticLayer('Blocked3', this.tiles, 0, 0);
    this.blocked4Layer = this.map.createStaticLayer('Blocked4', this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);
    this.blocked2Layer.setCollisionByExclusion([-1]);
    this.blocked3Layer.setCollisionByExclusion([-1]);
    this.blocked4Layer.setCollisionByExclusion([-1]);
  };

  loadNextLevel () {
    this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
  };

};
