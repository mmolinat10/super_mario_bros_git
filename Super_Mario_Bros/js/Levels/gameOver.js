marioBros.gameOver = function (game) {
    this.timeCheck;
    this.timeInit;
};

marioBros.gameOver.prototype = {

    create: function () {
        this.gameoverSound = this.game.add.audio('gameoverSound');
        this.gameoverSound.play();
      
        this.gameOverText = this.add.text(85, 100, "GAME OVER", style5);
        
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
        //habria que pasar una variable levelMario del player
        this.state.start('menu');
    }
    
};