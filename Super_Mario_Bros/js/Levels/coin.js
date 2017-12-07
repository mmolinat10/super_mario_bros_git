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
    if(this.body.position.x <= this.game.camera.x-16){
        this.kill();
    }
    
    if(!this.level.player.die){
        this.collWithPlayer = this.game.physics.arcade.overlap(this, this.level.player);
    }
    
    if(this.collWithPlayer){
        this.coinSound = this.game.add.audio('coinSound');
        this.coinSound.play();
        gameOptions.score +=200;
        gameOptions.coins +=1;
        changeHUD = true;
        this.kill();
    }
   
};
