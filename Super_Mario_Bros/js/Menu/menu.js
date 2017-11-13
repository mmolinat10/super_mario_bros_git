marioBros.menu = function (game) {

    this.spaceKey;
    this.cursors;
    this.posMenu;
    this.isDownKeyPress;
    this.isUpKeyPress;
    this.enter;
};

marioBros.menu.prototype = {

    create: function () {

        this.title = this.add.sprite(0, -50, 'title');
        this.text1Player = this.add.text(100, 137, text1Player, style1);
        this.text2Player = this.add.text(100, 155, text2Player, style2);
        this.textRanking = this.add.text(100, 173, textRanking, style3);
        this.cursor = this.add.sprite(this.text1Player.position.x-15, this.text1Player.position.y+3, 'cursor');
       

        this.game.stage.backgroundColor = '#6B8CFF';
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.posMenu = 0;
        this.isDownKeyPress = false;
        this.isUpKeyPress = false;
    },

    update: function () {

        if(this.cursors.down.isDown && this.posMenu < 2 && !this.isDownKeyPress){
            this.isDownKeyPress = true;
            this.posMenu++;
        }
        else if(this.cursors.down.isUp){
              this.isDownKeyPress = false;
        }
        
        
        if(this.cursors.up.isDown && this.posMenu >= 0 && !this.isUpKeyPress){
            this.isUpKeyPress = true;
            this.posMenu--;
        }else if(this.cursors.up.isUp){
            this.isUpKeyPress = false;
        }
      
        if(this.posMenu == 0){
            this.cursor.position.y = this.text1Player.position.y+3;
            if (this.spaceKey.isDown || this.enter.isDown) {
                this.startGame();
            }
        }
        else if(this.posMenu == 1){
            this.cursor.position.y = this.text2Player.position.y+3;    
            if (this.spaceKey.isDown || this.enter.isDown) {
                this.startGameTwoPlayers();
            }
        }
        else if(this.posMenu == 2){
            this.cursor.position.y = this.textRanking.position.y+3;  
            if (this.spaceKey.isDown || this.enter.isDown) {
                this.startRanking();
            }
        }
           
        
    },

    startGame: function () {

        this.state.start('level1');
    },
    
    startGameTwoPlayers: function () {

        this.state.start('twoPlayers');
    },

    startRanking: function () {

        this.state.start('ranking');
    }
};