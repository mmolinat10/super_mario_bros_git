marioBros.coinPrefab = function(game,x,y,level)
{
    this.level = level;
    if(gameOptions.numLevel == 1){
       Phaser.Sprite.call(this,game,x,y,'coin2');
    }
    else if(gameOptions.numLevel == 11){
        Phaser.Sprite.call(this,game,x,y,'coin2');
    }
    
    
    this.game.physics.arcade.enable(this);

    this.anchor.setTo(.5,.5);
    //this.body.immovable = true;
   
    this.collWithPlayer;
    this.timeAlive = 530;
    this.timeCheck;
    this.timeInit;
    this.createTime = false;
    this.oneTimeAnimation = false;
};
marioBros.coinPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.coinPrefab.prototype.constructor = marioBros.coinPrefab;

function collisionBricksCoin(coin, brick) {
    if(brick.playerIsTouching){
        if(!this.createTime){
            this.createTime = true;
            this.timeInit = this.game.time.now;
            this.coinSound = this.game.add.audio('coinSound');
            this.coinSound.play();
        }
       
        this.tweenBlock = this.game.add.tween(this.position);
        this.tweenBlock.to({y: this.y -60}, 300, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
        gameOptions.coins +=1;
        gameOptions.score +=200;
        changeHUD = true;
        brick.playerIsTouching = false;
    }
}

marioBros.coinPrefab.prototype.update = function(){  
    this.collBrick = this.game.physics.arcade.collide(this, this.level.brick, collisionBricksCoin,null,this);
    
    if(this.createTime && !this.oneTimeAnimation){
        this.oneTimeAnimation = true;
        this.loadTexture("coinOfBlock");
        this.animations.add('coinAnimation',[0,1,2,3], 10, true);
    }
    
    this.timeCheck = this.game.time.now;
    
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
    
    if(this.createTime){
        this.animations.play('coinAnimation');
    }
       
    if(this.timeCheck>= this.timeInit + this.timeAlive && this.createTime){
        this.animations.stop();
        this.kill();
    }
    
    
};
