marioBros.twoPlayers = function (game) {

    this.spaceKey;
    this.cursors;
    this.escape;
};

marioBros.twoPlayers.prototype = {

    create: function () {

        this.textTwoPlayersScene = this.add.text(40, 95, textTwoPlayersScene, style5);
       

        this.game.stage.backgroundColor = '#4e4845';
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },

    update: function () {
        if(this.escape.isDown){
            this.startMenu();
        }
        
    },

    startMenu: function () {

        this.state.start('menu');
    }
    
};