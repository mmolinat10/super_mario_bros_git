marioBros.coinPrefab = function(game,x,y,level)
{
    this.level = level;
    if(gameOptions.numLevel == 1){
       Phaser.Sprite.call(this,game,x,y,'coin2');
    }
    /*else{
        
    }*/
    
    this.game.physics.arcade.enable(this);
    
    
    //this.body.immovable = true;
   
    this.collWithPlayer;
};
marioBros.coinPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.coinPrefab.prototype.constructor = marioBros.coinPrefab;

marioBros.coinPrefab.prototype.update = function(){    
    this.collWithPlayer = this.game.physics.arcade.overlap(this, this.level.player);
    
    if(this.collWithPlayer){
        gameOptions.score +=200;
        changeHUD = true;
        this.kill();
    }
   
};
