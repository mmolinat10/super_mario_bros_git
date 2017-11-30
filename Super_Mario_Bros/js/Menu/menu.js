marioBros.menu = function (game) {

    this.spaceKey;
    this.cursors;
    this.posMenu;
    this.isDownKeyPress;
    this.isUpKeyPress;
    this.enter;
};

marioBros.menu.prototype = {
    
    preload: function(){
        //menu textos
        text1Player = "1-Player";
        
        text2Player = "2-Players";
        
        textRanking = "Ranking";
        
        textRankingScene = "Scene Ranking";
        
        textTwoPlayersScene = "Scene Two Players";
        
    },
    
    create: function () {

        this.title = this.add.sprite(0, -50, 'title');
        this.text1Player = this.add.text(100, 137, text1Player, style);
        this.text2Player = this.add.text(100, 155, text2Player, style);
        this.textRanking = this.add.text(100, 173, textRanking, style);
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
                this.startLoadGame();
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

    startLoadGame: function () {

        this.state.start('loadLevel');
    },
    
    startGameTwoPlayers: function () {

        this.state.start('twoPlayers');
    },

    startRanking: function () {

        this.state.start('ranking');
    }
};