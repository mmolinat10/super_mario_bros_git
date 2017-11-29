marioBros.gameOver = function (game) {
    this.timeCheck;
    this.timeInit;
};

marioBros.gameOver.prototype = {
/*
    create: function () {

        this.textLoadScreenPoints = this.add.text(30, 10, textLoadScreenPoints, style4);
        this.textPoints = this.add.text(30, 20, textPoints, style5);
        
        
        this.coin = this.add.image(this.textPoints.position.x+this.textPoints.width+15, this.textPoints.position.y, 'coinLoadScreen');
        this.coin.scale.setTo(0.8);
        
        this.textCoins = this.add.text(this.coin.position.x+this.coin.width, this.textPoints.position.y, gameOptions.coins, style5);
        
        this.textWorldLoadScreen = this.add.text(this.textCoins.position.x+this.textCoins.width+10, this.textLoadScreenPoints.position.y, textWorldLoadScreen, style4);
        this.textWorld = this.add.text(this.textCoins.position.x+this.textCoins.width+25, this.textPoints.position.y, textWorld, style5);
        
        this.textTimeLoadScreen = this.add.text(this.textWorldLoadScreen.position.x+this.textWorldLoadScreen.width+15, this.textWorldLoadScreen.position.y, textTimeLoadScreen, style4);
        
        this.textWorldLvlCenter = this.add.text(this.textCoins.position.x-20, this.textCoins.position.y +70, textWorldLvlCenter, style);
        
        this.marioLifes = this.add.image(this.textCoins.position.x-5, this.textCoins.position.y +100, 'marioLoadScreen');
        
        this.textLifes = this.add.text(this.textCoins.position.x+15, this.textCoins.position.y +100, "x  "+  gameOptions.lifes, style4);
        
        this.game.stage.backgroundColor = 'perdiste';
        
        
        this.timeInit = this.game.time.now;
    },

    update: function () {
        this.timeCheck = this.game.time.now;
        if(this.timeCheck>= this.timeInit + 2500){
            //pasar en el startGame un parametro con el nivel que toca cargar
            this.startLevel();
        }
        
        
        
    },

    startLevel: function () {
        //habria que pasar una variable levelMario del player
        this.state.start('level1');
    }
    */
};