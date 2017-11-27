var marioBros = marioBros||{};

marioBros.boot = function (game) {

};

marioBros.boot.prototype = {

    init: function () {

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setMinMax(200, 100, 600, 400);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
       
        //this.scale.setGameSize(gameOptions.gameWidth*2, gameOptions.gameHeight*2);
    },

    preload: function () {


    },

    create: function () {
        this.state.start('preloader');

    }

};