

marioBros.preloader = function (game) {

 

};

marioBros.preloader.prototype = {

    preload: function () {

        
        this.load.image('title', 'img/UI/Menu/title.png');
        this.load.image('cursor', 'img/UI/Menu/cursor.png');
        this.load.tilemap('level1','tilemaps/level1.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2','tilemaps/level2.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level3','tilemaps/level3.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset_levels','tilemaps/tileset_levels.png');
        this.load.spritesheet('marioSmall', 'img/Player/Mario Small/small_mario(versionFier).png', 16, 16);
        this.load.spritesheet('marioBig', 'img/Player/Mario Big/big_mario.png', 16, 32);
        this.load.spritesheet('marioFire', 'img/Player/Mario Fire/fire_mario.png', 16, 32);
        this.load.spritesheet('fireBall', 'img/Player/Mario Fire/fireBall.png', 16, 16);
        this.load.spritesheet('brick', 'img/Levels/brick.png', 16, 16);
        this.load.spritesheet('brick2', 'img/Levels/brick2.png', 16, 16);
        this.load.spritesheet('brickCoin', 'img/Levels/questionMarkBlock.png', 16, 16);
        this.load.spritesheet('brickCoin2', 'img/Levels/questionMarkBlock_2.png', 16, 16);
        this.load.spritesheet('brickCoins', 'img/Levels/brickCoins.png', 16, 16);
        this.load.spritesheet('brickCoins2', 'img/Levels/brickCoins_2.png', 16, 16);
        this.load.spritesheet('brickStar', 'img/Levels/brickStar.png', 16, 16);
        this.load.spritesheet('brickStar2', 'img/Levels/brickStar_2.png', 16, 16);
        this.load.spritesheet('brickFlowerOrMushroom', 'img/Levels/questionMarkBlock.png', 16, 16);
        this.load.spritesheet('brickFlowerOrMushroom2', 'img/Levels/questionMarkBlock_2.png', 16, 16);
        this.load.spritesheet('brickFlowerOrMushroom3', 'img/Levels/brickCoins_2.png', 16, 16);
        this.load.spritesheet('brickInvisible1UP', 'img/Levels/invisibleBlock.png', 16, 16);
        this.load.spritesheet('brickInvisible1UP2', 'img/Levels/invisibleBlock_2.png', 16, 16);
        this.load.spritesheet('goombaRed', 'img/Enemies/Goomba/goomba_red.png', 16, 16);
        this.load.spritesheet('goombaBlue', 'img/Enemies/Goomba/goomba_blue.png', 16, 16);
        this.load.spritesheet('koopaGreen', 'img/Enemies/Koopa/koopa_green.png', 16, 24);
        this.load.spritesheet('koopaGreenSquish', 'img/Enemies/Koopa/koopa_green_squish.png', 16, 16);
        this.load.spritesheet('koopaBlue', 'img/Enemies/Koopa/koopa_blue.png', 16, 24);
        this.load.spritesheet('koopaBlueSquish', 'img/Enemies/Koopa/koopa_blue_squish.png', 16, 16);
        this.load.spritesheet('piranyaGreen', 'img/Enemies/Piranya/piranya_green.png', 16, 24);
        this.load.spritesheet('piranyaBlue', 'img/Enemies/Piranya/piranya_blue.png', 16, 24);
        this.load.spritesheet('star', 'img/Items/star.png', 16, 16);
        this.load.spritesheet('star2', 'img/Items/star_2.png', 16, 16);
        this.load.spritesheet('mushroom', 'img/Items/mushroom.png', 16, 16);
        this.load.spritesheet('flower', 'img/Items/flower.png', 16, 16);
        this.load.spritesheet('flower2', 'img/Items/flower_2.png', 16, 16);
        this.load.spritesheet('1UP', 'img/Items/1up_mushroom.png', 16, 16);
        this.load.spritesheet('1UP2', 'img/Items/1up_mushroom_2.png', 16, 16);
        this.load.spritesheet('coinOfBlock', 'img/Items/coinBlock.png', 16, 16);
        this.load.spritesheet('bowser', 'img/Enemies/Bowser/bowser.png', 32,32);
        this.load.image('marioLoadScreen', 'img/UI/Load/marioSmallIdle.png');
        this.load.image('coinLoadScreen', 'img/UI/Load/coin2.png');
        this.load.image('coin1', 'img/Items/coin.png');
        this.load.image('coin2', 'img/Items/coin_2.png');
        this.load.image('platform', 'img/Levels/platform.png');
        this.load.spritesheet('puente', 'img/Levels/puente.png', 14, 16);
        
        this.load.audio('level1', 'sounds/Levels/Level1/level1.mp3');
        this.load.audio('level2', 'sounds/Levels/Level1_2/level1_2.mp3');
        this.load.audio('level3', 'sounds/Levels/Level8_4/level8_4.mp3');
        this.load.audio('jumpSmall', 'sounds/Player/jumpSmall.wav');
        this.load.audio('jumpBig', 'sounds/Player/jumpBig.wav');
        this.load.audio('mariodie', 'sounds/Player/mariodie.wav');
        this.load.audio('pipe', 'sounds/Player/pipe.wav');
        this.load.audio('pause', 'sounds/pause.wav');
        this.load.audio('marioStarSound', 'sounds/Player/marioStarSound.mp3');
        this.load.audio('runningOutOfTime', 'sounds/Levels/runningOutOfTime.wav');
        this.load.audio('brickSmash', 'sounds/Levels/brick.wav');
        this.load.audio('coinSound', 'sounds/Levels/coin.wav');
        this.load.audio('1upSound', 'sounds/Levels/1up.wav');
        this.load.audio('stomp', 'sounds/Enemies/stomp.wav');
        this.load.audio('kick', 'sounds/Enemies/kick.wav');
        this.load.audio('powerup_appears', 'sounds/Levels/powerup_appears.wav');
        this.load.audio('powerup', 'sounds/Levels/powerup.wav');
        this.load.audio('bump', 'sounds/Levels/bump.wav');
        this.load.audio('fireballSound', 'sounds/Player/fireball.wav');
        this.load.audio('gameoverSound', 'sounds/Levels/gameover.wav');
        
        
        style = { font: "12px Arial", fill: "#ffffff", align: "center"};
        style2 = { font: "24px Arial", fill: "#ffffff", align: "center"};
        style3 = { font: "20px Arial", fill: "#ffffff", align: "center"};
        //style4 = {font: "12px Arial", fill: "#ffffff", align: "left"};
        style5 = {font: "14px Arial", fill: "#ffffff", align: "center"};

    },

    create: function () {
        this.state.start('menu');
    },

    update: function () {

        
    }

};