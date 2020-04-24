import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';
import ReturnPortal from '../Sprites/ReturnPortal';
import Coins from '../Groups/Coins';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  };

  init (data) {
    console.log(data)
    this._LEVEL = data.level;
    this._LEVELS = data.levels;
    this._NEWGAME = data.newGame;
    this.loadingLevel = false;
  };

  create () {
    const getItemAudio = this.sound.add('getItemAudio', {loop: false, volume: 1});
    this.createMap();
    this.createPlayer();
    this.addCollisions();
    this.createPortal();
    this.createReturnPortal();
    this.createCoins();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
    this.physics.add.overlap(this.player, this.returnPortal, this.returnToLevel.bind(this));
    this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup), function(player, coin) {getItemAudio.play()});
  };

  createPlayer() {
    this.map.findObject('Player', (obj) => {
      this.player = new Player (this, obj.x, obj.y);
    });
  };

  createPortal() {
  this.map.findObject('Portal', (obj) => {
      this.portal = new Portal(this, 937, 315);
    });
  };

  createReturnPortal() {
  this.map.findObject('ReturnPortal', (obj) => {
      this.returnPortal = new ReturnPortal(this, obj.x, obj.y);
    });
  };

  createCoins() {
    this.coins = this.map.createFromObjects('Coins', 'Coin', { key: 'coin'});
    this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);
  };

  update () {
    this.player.update(this.cursors);
  };

  addCollisions () {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.add.collider(this.player, this.blocked2Layer);
    this.physics.add.collider(this.player, this.blocked3Layer);
  };

  createMap () {
    this.map = this.make.tilemap({key: this._LEVELS[this._LEVEL]});
    this.tiles = this.map.addTilesetImage('atlas');
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0).setScale(1.5);
    this.background2Layer = this.map.createStaticLayer('Background2', this.tiles, 0, 0).setScale(1.5);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0).setScale(1.5);
    this.blocked2Layer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0).setScale(1.5);
    this.blocked3Layer = this.map.createStaticLayer('Blocked3', this.tiles, 0, 0).setScale(1.5);
    this.blockedLayer.setCollisionByExclusion([-1]);
    this.blocked2Layer.setCollisionByExclusion([-1]);
    this.blocked3Layer.setCollisionByExclusion([-1]);
  };

  loadNextLevel () {
    this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
  };

  returnToLevel () {
    this.scene.restart({level: 1, levels: this._LEVELS, newGame: false});
  };

};
