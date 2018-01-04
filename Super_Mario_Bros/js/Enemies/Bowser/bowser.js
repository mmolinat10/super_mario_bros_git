marioBros.bowserPrefab = function(game,x,y,level)
{
    this.level = level;  
    Phaser.Sprite.call(this,game,x,y,'bowser');
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(.5,.5);
    this.animations.play('walk');
    //this.body.immovable = true;
    this.speed = 30;
    this.direction = -1;
    this.dieBowser = false;
    //this.dieStarOrOnBrickGoomba = false;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    this.playerVisible = false;
    this.collPlayerBowser;
    this.timeCheck;
    this.timeInit;
    this.timeInitChangeToSmall;
    this.changeToSmall = false;
    this.collGraphicLayer;
    this.score;
    this.fireBallColl = false;
};
marioBros.bowserPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.bowserPrefab.prototype.constructor = marioBros.bowserPrefab;

marioBros.bowserPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;    
    
  
       this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);
    
    if(!this.dieBowser){
        if(this.level.player.die == false){
            this.collPlayerBowser = this.game.physics.arcade.collide(this, this.level.player,this.collisionPlayerBowser, null, this);
        }  
    }else{
        if(this.timeCheck>= this.timeInit + 150){
        
            this.kill();
        }
    }
    
    //tiempo de invulnerabilidad al pasar de grande a pequeño
    if(this.timeCheck>= this.timeInitChangeToSmall + 2000 && this.changeToSmall){
        this.changeToSmall = false;
    }
    
    if(this.body.blocked.right || this.body.blocked.left){
        this.direction *= -1;        
    }
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 200 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        this.body.velocity.x = this.speed * this.direction;
    }
};



marioBros.bowserPrefab.prototype.collisionPlayerBowser = function() {
  
        //daño al jugador
        if(!this.level.player.bigMario && !this.level.player.marioStar && !this.changeToSmall){
           this.level.player.die = true;
        }
        else if(this.level.player.bigMario && !this.level.player.marioStar && !this.level.player.marioFlower){
            this.level.player.bigMario = false; 
            this.level.player.animations.stop();
            this.level.player.loadTexture('marioSmall');
            this.level.player.body.setSize(16, 16);
            this.timeInitChangeToSmall = this.game.time.now;
            this.changeToSmall = true;
        }
        else if(this.level.player.marioFlower && !this.level.player.marioStar)
        {
            this.level.player.marioFlower = false;
            this.level.player.bigMario = false;
            this.level.player.animations.stop();
            this.level.player.loadTexture('marioSmall');
            this.level.player.body.setSize(16, 16);
            this.timeInitChangeToSmall = this.game.time.now;
            this.changeToSmall = true;
        }
   
    
};


marioBros.bowserPrefab.prototype.dieAnimation = function() {
    this.timeInit = this.game.time.now;
    gameOptions.score +=100;
    changeHUD = true;
    this.angle = -180;
};