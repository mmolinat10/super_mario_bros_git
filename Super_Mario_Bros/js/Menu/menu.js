marioBros.menu = function (game) {

    this.spaceKey;
};

marioBros.menu.prototype = {

    create: function () {

        this.title = this.add.sprite(0, -50, 'title');
        this.cursor = this.add.sprite(80, 150, 'cursor');
        this.text = this.add.text(100, 147, text, style);

        this.game.stage.backgroundColor = '#6B8CFF';
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {

        if (this.spaceKey.isDown) {
            this.startGame();
        }
    },

    startGame: function (pointer) {

        this.state.start('level1');
    }
};