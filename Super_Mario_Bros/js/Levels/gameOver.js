marioBros.gameOver = function (game) {
    this.timeCheck;
    this.timeInit;
};

marioBros.gameOver.prototype = {

    preload: function(){
        textGameoverScreenPoints = "MARIO";
        
        if(gameOptions.score < 10){
           textPoints = "0"+gameOptions.score;
        }
        else{
            textPoints = gameOptions.score;
        }
        
        if(gameOptions.coins < 10){
            textCoins = "x"+"0"+gameOptions.coins;
        }
        else{
            textCoins = "x"+gameOptions.coins;
        }
        
        textWorldGameoverScreen = "WORLD";
        if(gameOptions.numLevel == 1){
           textWorld = "1-1";
        }
        else if(gameOptions.numLevel == 11){
            textWorld = "1-2";   
        }
        
        textTimeGameoverScreen = "TIME";
        textTimeLevel = gameOptions.time;
        
        textLifes= "x  " + gameOptions.lifes;
    },
    
    create: function () {
        this.gameoverSound = this.game.add.audio('gameoverSound');
        this.gameoverSound.play();
      
        this.gameOverText = this.add.text(85, 100, "GAME OVER", style5);
        
        this.textGameoverScreenPoints = this.add.text(30, 10, textGameoverScreenPoints, style);
        this.textPoints = this.add.text(30, 20, textPoints, style5);
        
        
        this.coin = this.add.image(75,20, 'coinLoadScreen');
        this.coin.scale.setTo(0.8);
        
        this.textCoins = this.add.text(90, 20, textCoins, style5);
        
        this.textWorldGameoverScreen = this.add.text(130, 10, textWorldGameoverScreen, style);
        this.textWorld = this.add.text(144, 20, textWorld, style);
        
        this.textTimeGameoverScreen = this.add.text(200, 10, textTimeGameoverScreen, style);
        
        this.textTime = this.add.text(205, 20, textTimeLevel, style);
        
        this.game.stage.backgroundColor = '#000000';
        this.timeInit = this.game.time.now;
    },

    update: function () {
        this.timeCheck = this.game.time.now;
        if(this.timeCheck>= this.timeInit + 3500){
            //pasar en el startGame un parametro con el nivel que toca cargar
            this.startMenu();
        }
        
    },

    startMenu: function () {
        gameOptions.lifes = 3; //se reinician las vidas
        gameOptions.coins = 0; //se reinician los coins
        gameOptions.score = 0; //se reinician los puntos
        gameOptions.time = 400; // se reinicia el tiempo
        gameOptions.numLevel = 1;
        gameOptions.isMarioBig = false;
        gameOptions.isMarioFier = false;

        this.state.start('menu');
    }
    
};