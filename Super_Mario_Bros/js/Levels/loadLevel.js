marioBros.loadLevel = function (game) {
    this.timeCheck;
    this.timeInit;
};

marioBros.loadLevel.prototype = {
    
    preload: function(){
        //textos e info del loadScreen (antes del lvl)
        textLoadScreenPoints = "MARIO";
        
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
        
        textWorldLoadScreen = "WORLD";
        if(gameOptions.numLevel == 1){
           textWorld = "1-1";
        }
        else if(gameOptions.numLevel == 11){
            textWorld = "1-2";   
        }
        else if(gameOptions.numLevel == 84){
            textWorld = "8-4";   
        }
        
        if(gameOptions.numLevel == 1){
            textWorldLvlCenter = "WORLD 1 - 1";
        }
        else if(gameOptions.numLevel == 11){
             textWorldLvlCenter = "WORLD 1 - 2";  
        }
        else if(gameOptions.numLevel == 84){
             textWorldLvlCenter = "WORLD 8 - 4";  
        }
        
        textTimeLoadScreen = "TIME";
        
        textLifes= "x  " + gameOptions.lifes;
    
        
    },
    
    create: function () {

        this.textLoadScreenPoints = this.add.text(30, 10, textLoadScreenPoints, style);
        this.textPoints = this.add.text(30, 20, textPoints, style5);
        
        
        this.coin = this.add.image(75,20, 'coinLoadScreen');
        this.coin.scale.setTo(0.8);
        
        this.textCoins = this.add.text(90, 20, textCoins, style5);
        
        this.textWorldLoadScreen = this.add.text(130, 10, textWorldLoadScreen, style);
        this.textWorld = this.add.text(144, 20, textWorld, style);
        
        this.textTimeLoadScreen = this.add.text(200, 10, textTimeLoadScreen, style);
        
        this.textWorldLvlCenter = this.add.text(90, 90, textWorldLvlCenter, style);
        
        this.marioLifes = this.add.image(104, 115, 'marioLoadScreen');
        
        this.textLifes = this.add.text(125, 115, textLifes, style);
        
        this.game.stage.backgroundColor = '#000000';
        
        
        this.timeInit = this.game.time.now;
    },

    update: function () {
        this.timeCheck = this.game.time.now;
        if(this.timeCheck>= this.timeInit + 2500){
            //pasar en el startGame un parametro con el nivel que toca cargar
            this.startGame();
        }
    },

    startGame: function () {
        //habria que pasar una variable levelMario del player
        if(gameOptions.numLevel == 1){
            this.state.start('level1');
        }
        else if(gameOptions.numLevel == 11){
            this.state.start('level2');
        }
        else if(gameOptions.numLevel == 84){
            this.state.start('level3');
        }
    }
    
};