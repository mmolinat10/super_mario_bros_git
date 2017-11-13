marioBros.menu = function (game) {

    this.spaceKey;
    this.cursors;
    this.posMenu;
    this.isDownKeyPress;
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
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.posMenu = 0;
        this.isDownKeyPress = false;
    },

    update: function () {

        if(this.cursors.down.isDown && this.posMenu < 2){
            this.isDownKeyPress = true;
            
            
        }else{
            this.isDownKeyPress = false;
        }
        if(this.isDownKeyPress){
           this.posMenu++;
        }
        
        if(this.cursors.up.isDown && this.posMenu >= 0){
            this.isDownKeyPress = true;
           this.posMenu--;
        }else{
            this.isDownKeyPress = false;
        }
        if(this.isDownKeyPress){
           this.posMenu--;
        }

        if(this.posMenu == 0){
           this.cursor.position.y = this.text1Player.position.y+3;
        }
        else if(this.posMenu == 1){
            this.cursor.position.y = this.text2Player.position.y+3;    
        }
        else if(this.posMenu == 2){
            this.cursor.position.y = this.textRanking.position.y+3;    
        }
           
        if (this.spaceKey.isDown) {
            this.startGame();
        }
    },

    startGame: function (pointer) {

        this.state.start('level1');
    }
};