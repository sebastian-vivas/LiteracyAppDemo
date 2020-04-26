import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';
import ReturnPortal from '../Sprites/ReturnPortal';
import Coins from '../Groups/Coins';
import OldMan from '../Sprites/OldMan';
// import Vendor from '../Sprites/Vendor';
import FisherMan from '../Sprites/FisherMan';
import Bee from '../Sprites/Bee';
import FoodVendor from '../Sprites/FoodVendor';
import Friend from '../Sprites/Friend';
import Star from '../Sprites/Star';


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
    // const getItemAudio = this.sound.add('getItemAudio', {loop: false, volume: .5});

    this.createMap();
    this.createPlayer();
    this.addCollisions();
    this.createPortal();
    this.createReturnPortal();
    this.createCoins();
    this.createOldMan();
    this.createImages();
    this.createPages();
    // this.createVendor();
    this.createFisherMan();
    this.createBee();
    this.createFoodVendor();
    this.createFriend();
    this.createStar();
    this.overlap();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup));
};
    // , function(player, coin) {getItemAudio.play()});

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

  createOldMan() {
    this.map.findObject('OldMan', (obj) => {
      this.oldMan = new OldMan (this, 313, 200);
    });
  };

  createVendor() {
    this.map.findObject('Vendor', (obj) => {
      this.vendor = new Vendor (this, 440, 90);
    });
  };

  createFisherMan() {
    this.map.findObject('FisherMan', (obj) => {
      this.fisherMan = new FisherMan (this, 535, 300);
    });
  };

  createBee() {
    this.map.findObject('Bee', (obj) => {
      this.bee = new Bee (this, 800, 200);
    });
  };

  createFoodVendor() {
    this.map.findObject('FoodVendor', (obj) => {
      this.foodVendor = new FoodVendor (this, obj.x, obj.y);
    });
  };

  createFriend() {
    this.map.findObject('Friend', (obj) => {
      this.friend = new Friend (this, obj.x, obj.y);
    });
  };

  createStar() {
    this.map.findObject('Star', (obj) => {
      this.star = new Star (this, obj.x, obj.y);
    });
  };

  createCoins() {
    this.coins = this.map.createFromObjects('Coins', 'Coin', { key: 'coin'});
    this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);
  };

  createPages(){
    this.gameScene = this.scene.get('Game');

    this.gameScene.events.on('oldManDialogue', () => {
      this.pageOne = this.physics.add.image(480, 246, 'pageOne');
      this.physics.add.overlap(this.player, this.pageOne, function(player, pageOne) { pageOne.destroy(); });
    });

    // this.gameScene.events.on('vendorDialogue', () => {
    // this.helloBubble = this.physics.add.image(480, 240, 'helloBubble').setScale(1);
    // });

    this.gameScene.events.on('fisherManDialogue', () => {
    this.pageTwo = this.physics.add.image(480, 240, 'pageTwo').setScale(1);
    this.physics.add.overlap(this.player, this.pageTwo, function(player, pageTwo) { pageTwo.destroy(); });
    });

    this.gameScene.events.on('beeDialogue', () => {
    this.pageThree = this.physics.add.image(480, 240, 'pageThree').setScale(1);
    this.physics.add.overlap(this.player, this.pageThree, function(player, pageThree) { pageThree.destroy(); });
    });

    this.gameScene.events.on('foodVendorDialogue', () => {
    this.pageFour = this.physics.add.image(480, 240, 'pageFour').setScale(1);
    this.physics.add.overlap(this.player, this.pageFour, function(player, pageFour) { pageFour.destroy(); });
    });

    this.gameScene.events.on('friendDialogue', () => {
    this.pageFive = this.physics.add.image(480, 240, 'pageFive').setScale(1);
    this.physics.add.overlap(this.player, this.pageFive, function(player, pageFive) { pageFive.destroy(); });
    });

    this.gameScene.events.on('starDialogue', () => {
    this.pageSix = this.physics.add.image(480, 240, 'pageSix').setScale(1);
    this.scene.pause();
    })
  };

  update () {
    this.player.update(this.cursors);
  };

  createImages (){
    this.add.image(80, 25, 'ui').setScale(1.3);
    this.add.image(28.35, 24, 'coin').setScale(1.6);
  }

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

  overlap(){
    this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
    this.physics.add.overlap(this.player, this.returnPortal, this.returnToLevel.bind(this));
    this.physics.add.overlap(this.player, this.oldMan, this.oldMan.talkToOldMan.bind(this.oldMan));
    // this.physics.add.overlap(this.player, this.vendor, this.vendor.talkToVendor.bind(this.vendor));
    this.physics.add.overlap(this.player, this.fisherMan, this.fisherMan.talkToFisherMan.bind(this.fisherMan));
    this.physics.add.overlap(this.player, this.bee, this.bee.talkToBee.bind(this.bee));
    this.physics.add.overlap(this.player, this.foodVendor, this.foodVendor.talkToFoodVendor.bind(this.foodVendor));
    this.physics.add.overlap(this.player, this.friend, this.friend.talkToFriend.bind(this.friend));
    this.physics.add.overlap(this.player, this.star, this.star.talkToStar.bind(this.star));
  }
};
