marioBros.mushroomPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'mushroom');
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.speed = 60;
    this.direction = 1;
    this.level = level;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true; 
    this.playerCollisioned;
    this.collBrick;
    this.collBrickCoin;
    this.collBrickCoins;
    this.collBrickFlowerOrMushroom;
    this.collBrickStar;
    this.collGraphicLayer;
    this.timeAlive = 15000;
    this.timeCheck;
    this.timeInit;
    this.createTime = false;
    this.score;
};
marioBros.mushroomPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.mushroomPrefab.prototype.constructor = marioBros.mushroomPrefab;

marioBros.mushroomPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;
    
    this.graphicLayer = this.game.physics.arcade.collide(this, this.level.graphicLayer);
    this.collBrick = this.game.physics.arcade.collide(this, this.level.brick);
    this.collBrickCoin = this.game.physics.arcade.collide(this, this.level.brickCoin);
    this.collBrickCoins = this.game.physics.arcade.collide(this, this.level.brickCoinsA);
    this.collBrickFlowerOrMushroom = this.game.physics.arcade.collide(this, this.level.brickFlowerOrMushroom);
    this.collBrickStar = this.game.physics.arcade.collide(this, this.level.brickStar);
    this.playerCollisioned = this.game.physics.arcade.overlap(this, this.level.player);
    
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    
    if(this.timeCheck>= this.timeInit + this.timeAlive){
        this.kill();
    }
    
    if(this.playerCollisioned){
        this.powerupSound = this.game.add.audio('powerup');
        this.powerupSound.play();
        gameOptions.score +=1000;
        changeHUD = true;
        this.level.player.bigMario = true;
        this.level.player.animations.stop();
        this.level.player.loadTexture('marioBig');
        this.level.player.body.setSize(16, 32);
        this.kill();
    }
    
    else{
        this.move();
    }
    
    if(!this.createTime){
        this.createTime = true;
        this.timeInit = this.game.time.now;
    }
    
   
};

marioBros.mushroomPrefab.prototype.move = function(){
    this.body.velocity.x = this.speed * this.direction;
};
