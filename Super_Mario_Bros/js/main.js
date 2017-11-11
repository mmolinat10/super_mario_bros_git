var marioBros = marioBros || {};

var gameOptions = {
    gameWidth:255,
    gameHeight:216,
    level1Width:3840,
    level1Height:416,
    bgColor:'#444444',
    playerGravity:1090,
    playerSpeed:70,
    playerJump:40
    
};


marioBros.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

marioBros.game.state.add('main',marioBros.level1);
marioBros.game.state.start('main');

