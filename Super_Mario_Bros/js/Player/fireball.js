marioBros.fireballPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'fireBall');
    this.animations.add('fireBallAnimation',[0,1,2,3], 15, true);
    this.animations.add('fireBallDie',[4,5,6], 5);
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.speed = 70;
    this.bounce = 150;
    this.level = level;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true; 
    this.collBrick;
    this.collBrickCoin;
    this.collBrickCoins;
    this.collBrickFlowerOrMushroom;
    this.collBrickStar;
    this.collGraphicLayer;
    this.killGoomba;
    this.score;
    this.animations.play('fireBallAnimation');
    this.fireDie = false;

};
marioBros.fireballPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.fireballPrefab.prototype.constructor = marioBros.fireballPrefab;

function collisionFireBricks(fireBall, block){
    if(!block.body.touching.up){
        this.animations.stop();
        this.fireDie = true;
        fireBall.scale.setTo(0.8,0.8);
        this.animations.play('fireBallDie',10, false, true);
    }
    else{
        fireBall.body.velocity.y -= this.bounce;
    }
    
};

function collisionGoombaFireBall(fireBall, goomba){
     gameOptions.score +=100;
    goomba.dieAnimation();
    this.animations.stop();
    this.fireDie = true;
    fireBall.scale.setTo(0.8,0.8);
    this.animations.play('fireBallDie',10, false, true);    
    
};

marioBros.fireballPrefab.prototype.update = function(){
    this.timeCheckDie = this.game.time.now; 
    
    this.collGraphicLayer = this.game.physics.arcade.collide(this, this.level.graphicLayer);
    this.collBrick = this.game.physics.arcade.collide(this, this.level.brick,collisionFireBricks, null, this);
    this.collBrickCoin = this.game.physics.arcade.collide(this, this.level.brickCoin,collisionFireBricks, null, this);
    this.collBrickCoins = this.game.physics.arcade.collide(this, this.level.brickCoinsA,collisionFireBricks, null, this);
    this.collBrickFlowerOrMushroom = this.game.physics.arcade.collide(this, this.level.brickFlowerOrMushroom,collisionFireBricks, null, this);
    this.collBrickStar = this.game.physics.arcade.collide(this, this.level.brickStar,collisionFireBricks, null, this);
    this.killGoomba = this.game.physics.arcade.collide(this, this.level.goomba,collisionGoombaFireBall, null, this);

    
    if(this.body.blocked.right || this.body.blocked.left || this.body.position.y >= gameOptions.level1Height){
        
        this.animations.stop();
        this.fireDie = true;
        this.scale.setTo(0.8,0.8);
        this.animations.play('fireBallDie',10, false, true);
    }
        
    if(this.body.blocked.down && !this.fireDie){
        this.body.velocity.y -= this.bounce;
    }
   
};