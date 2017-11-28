marioBros.flowerPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'flower');
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.bounce = 400;
    this.level = level;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true; 
    this.playerCollisioned;
    this.timeAlive = 15000;
    this.timeCheck;
    this.timeInit;
    this.createTime = false;
};
marioBros.flowerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.flowerPrefab.prototype.constructor = marioBros.flowerPrefab;

marioBros.flowerPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;
    
    this.graphicLayer = this.game.physics.arcade.collide(this, this.level.graphicLayer);

    this.playerCollisioned = this.game.physics.arcade.overlap(this, this.level.player);
    this.animations.play('starAnimation');
    
 
    
    if(this.timeCheck>= this.timeInit + this.timeAlive){
        this.kill();
    }
    
    if(this.playerCollisioned){
        this.level.player.marioFlower = true;
        this.level.player.loadTexture('marioFire');
        this.level.player.body.setSize(16, 32);
        this.kill();
    }
    else{
      
        if(this.graphicLayer){
            this.body.velocity.y -= this.bounce;
        }
    }
    
    if(!this.createTime){
        this.createTime = true;
        this.timeInit = this.game.time.now;
    }
    
   
};
