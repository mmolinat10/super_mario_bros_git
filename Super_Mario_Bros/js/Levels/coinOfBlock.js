marioBros.coinOfBlockPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'coinOfBlock');
    this.animations.add('coinAnimation',[0,1,2,3], 10, true);
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.level = level;
    this.body.gravity.y = gameOptions.playerGravity;
    this.level.player.addScore(200);
    
    this.timeAlive = 500;
    this.timeCheck;
    this.timeInit;
    this.createTime = false;
};
marioBros.coinOfBlockPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.coinOfBlockPrefab.prototype.constructor = marioBros.coinOfBlockPrefab;

marioBros.coinOfBlockPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;
    this.animations.play('coinAnimation');
    
   if(this.timeCheck>= this.timeInit + this.timeAlive){
       this.animations.stop();
        this.kill();
    }
    
   if(!this.createTime){
        this.createTime = true;
        this.timeInit = this.game.time.now;
    }
};
