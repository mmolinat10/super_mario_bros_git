marioBros.bowserPrefab = function(game,x,y,level)
{
    this.level = level;  
    Phaser.Sprite.call(this,game,x,y,'bowser');
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5,1);
    this.animations.add('walk',[2,3],1,true);
    this.animations.add('attack',[0,1],1,false);
    this.animations.play('walk');
    //this.body.immovable = true;
    this.speed = 15;
    this.direction = -1;
    //this.dieStarOrOnBrickGoomba = false;
    this.body.gravity.y = 500;
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
    this.timeInitJump = this.game.time.now;
    
    this.timeInitMartillos = this.game.time.now;
    this.timeInitMartillo = this.game.time.now;
    this.contadorMartillos = 0;
    this.numMartillosGenerate = this.game.rnd.integerInRange(3, 7);
    this.oneFire = false;
    this.timeInitFuego = this.game.time.now;
    this.timeAttackAnim;
    this.fireSound = this.game.add.audio('bowserFire');
    this.fallsSound = this.game.add.audio('bowserFalls');
    this.oneTimeFallSound = false;
};
marioBros.bowserPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.bowserPrefab.prototype.constructor = marioBros.bowserPrefab;

marioBros.bowserPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now;    
    
    if(this.level.destroyBowser && this.y > 400){
        gameOptions.win = true; 
        if(!this.oneTimeFallSound){
            this.oneTimeFallSound = true;
            this.fallsSound.play();
            this.level.stopBackgroundAudioLevel();
        }
        
    }
    
    if(this.timeCheck>= this.timeInitFuego + this.game.rnd.integerInRange(4000, 6000) && !this.level.destroyBowser){
        this.timeFire = false;
        this.animations.play('attack');
        this.timeAttackAnim = this.game.time.now;
    }
    
    if(this.timeCheck>= this.timeAttackAnim + 100){
        this.animations.stop();
        this.animations.play('walk');
    }
    
    if(this.timeCheck>= this.timeInitJump + this.game.rnd.integerInRange(2000, 4000) && this.x > 4110 && !this.level.destroyBowser){
        this.body.velocity.y -= 175;
        this.timeInitJump = this.game.time.now;
    }
    
    if(this.timeCheck>= this.timeInitMartillos + this.game.rnd.integerInRange(3000, 5000) && this.x > 4110 && !this.level.player.die && !this.level.destroyBowser){
        this.timeInitMartillo = this.game.time.now;
        this.numMartillosGenerate = this.game.rnd.integerInRange(3, 7);
        this.timeInitMartillos = this.game.time.now;
        this.contadorMartillos = 0;
    }    
    
    if(this.timeCheck>= this.timeInitMartillo + 120 && !this.level.player.die && this.contadorMartillos < this.numMartillosGenerate && !this.level.destroyBowser){
        this.contadorMartillos = this.contadorMartillos + 1;
        
        if(this.x >= this.level.player.x){
           this.martillo1 = new marioBros.martilloPrefab(this.game,this.x-20,this.y-30,this.level);
        }
        else{
            this.martillo1 = new marioBros.martilloPrefab(this.game,this.x+10,this.y-30,this.level);
        }
        
        this.game.add.existing(this.martillo1); 
        this.timeInitMartillo = this.game.time.now;
    }
  
    else if(this.x > 4110 && !this.level.player.die && !this.timeFire && this.timeCheck >= this.timeInitFuego + 700 && !this.level.destroyBowser){
        this.timeFire = true;
        this.fireSound.play();
        if(this.x >= this.level.player.x){
            this.fireBowser = new marioBros.firePrefab(this.game,this.x-20,this.y-30,this.level);
        }
        else{
            this.fireBowser = new marioBros.firePrefab(this.game,this.x+10,this.y-30,this.level);
        }
        this.game.add.existing(this.fireBowser); 
        this.timeInitFuego = this.game.time.now;
    }
  
    this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);
    
    if(!gameOptions.win){
        if(this.level.player.die == false){
            this.collPlayerBowser = this.game.physics.arcade.overlap(this, this.level.player,this.collisionPlayerBowser, null, this);
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
   
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 200 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        if(!this.level.player.die){
           if(this.x > 4110 || this.level.player.collPuente){
                if(this.x >= this.level.player.x){
                    this.body.velocity.x = this.speed * this.direction;

                    this.scale.x = 1;
                
                }
                else if(this.x <= this.level.player.x){

                    this.body.velocity.x = this.speed * -this.direction;
                    this.scale.x = -1;

                }
            }
            else{
                this.body.velocity.x = 0;
                this.body.acceleration.x = 0;
            }
        }
        else{
            this.animations.stop();
            this.body.velocity.x = 0;
            this.body.acceleration.x = 0;
        }
       
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