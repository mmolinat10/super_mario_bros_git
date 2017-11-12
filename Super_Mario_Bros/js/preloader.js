
marioBros.preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

marioBros.preloader.prototype = {

    preload: function () {

        
        this.load.image('title', 'img/UI/Menu/title.png');
        this.load.image('cursor', 'img/UI/Menu/cursor.png');
        this.load.tilemap('level1','tilemaps/level1.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset_levels','tilemaps/tileset_levels.png');
        this.load.spritesheet('mario', 'img/Player/Mario Small/Other_version/small_mario.png', 16, 16);
        //this.load.spritesheet('mario','img/Player/Mario Small/mario small idle.png',19,16);
        //this.load.spritesheet('runLeft','img/Player/Mario Small/mario small.png',22,16);
        //this.load.image('Ground','img/Levels/block.png');
        
        
        text = "Start Game";
        style = { font: "12px Arial", fill: "#ffffff", align: "center"};
    },

    create: function () {

    },

    update: function () {

        this.state.start('menu');
    }

};