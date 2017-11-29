marioBros.starPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'star');
    this.animations.add('starAnimation',[0,1,2,3], 10, true);
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.speed = 30;
    this.bounce = 400;
    this.direction = 1;
    this.level = level;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true; 
    this.playerCollisioned;
    this.collGraphicLayer;
    this.timeAlive = 15000;
    this.timeCheck;
    this.timeInit;
    this.createTime = false;
    this.score;
};
marioBros.starPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.starPrefab.prototype.constructor = marioBros.starPrefab;

marioBros.starPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;
    
    this.collGraphicLayer = this.game.physics.arcade.collide(this, this.level.graphicLayer);

    this.playerCollisioned = this.game.physics.arcade.overlap(this, this.level.player);
    this.animations.play('starAnimation');
    
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    
    if(this.timeCheck>= this.timeInit + this.timeAlive){
        this.kill();
    }
    
    if(this.playerCollisioned){
        this.level.player.marioStar = true;
        this.kill();
    }
    else{
        this.move();
        if(this.collGraphicLayer){
            this.body.velocity.y -= this.bounce;
        }
    }
    
    if(!this.createTime){
        this.createTime = true;
        this.timeInit = this.game.time.now;
    }
    
   
};

marioBros.starPrefab.prototype.move = function(){
    this.body.velocity.x = this.speed * this.direction;
};

