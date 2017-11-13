marioBros.ranking = function (game) {

    this.spaceKey;
    this.cursors;
    this.escape;
};

marioBros.ranking.prototype = {

    create: function () {

        this.textRankingScene = this.add.text(50, 95, textRankingScene, style2);
       

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