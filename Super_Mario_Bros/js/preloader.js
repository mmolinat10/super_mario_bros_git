
marioBros.preloader = function (game) {

 

};

marioBros.preloader.prototype = {

    preload: function () {

        
        this.load.image('title', 'img/UI/Menu/title.png');
        this.load.image('cursor', 'img/UI/Menu/cursor.png');
        this.load.tilemap('level1','tilemaps/level1.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset_levels','tilemaps/tileset_levels.png');
        this.load.spritesheet('mario', 'img/Player/Mario Small/Other_version/small_mario.png', 16, 16);
        this.load.audio('level1', 'sounds/Levels/Level1/level1.mp3');
        this.load.audio('jumpSmall', 'sounds/Player/jumpSmall.wav');
        this.load.audio('mariodie', 'sounds/Player/mariodie.wav');
        this.load.audio('pipe', 'sounds/Player/pipe.wav');
        this.load.audio('pipe', 'sounds/pause.wav');
        //this.load.spritesheet('mario','img/Player/Mario Small/mario small idle.png',19,16);
        //this.load.spritesheet('runLeft','img/Player/Mario Small/mario small.png',22,16);
        //this.load.image('Ground','img/Levels/block.png');
        
        
        text1Player = "1-Player";
        style1 = { font: "12px Arial", fill: "#ffffff", align: "center"};
        text2Player = "2-Player";
        style2 = { font: "12px Arial", fill: "#ffffff", align: "center"};
        textRanking = "Ranking";
        style3 = { font: "12px Arial", fill: "#ffffff", align: "center"};

    },

    create: function () {
        this.state.start('menu');
    },

    update: function () {

        
    }

};