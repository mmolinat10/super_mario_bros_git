var marioBros = marioBros||{};

marioBros.boot = function (game) {

};

marioBros.boot.prototype = {

    init: function () {

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
       

    },

    preload: function () {


    },

    create: function () {
        this.state.start('preloader');

    }

};