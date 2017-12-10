marioBros.koopaPrefab = function(game,x,y,level)
{
    this.level = level;
    if(gameOptions.numLevel == 1){
       Phaser.Sprite.call(this,game,x,y,'koopaGreen');
    }
    else if(gameOptions.numLevel == 11){
       Phaser.Sprite.call(this,game,x,y,'koopaBlue');     
    }
    
    this.animations.add('walk',[0,1],10,true);
    this.animations.add('squish',[0,1],5,true);
    
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(.5,.5);
    this.animations.play('walk');
    this.speed = 20;
    this.direction = -1;
    this.dieKoopa = false;
    this.dieStarOrOnBrickKoopa = false;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    this.playerVisible = false;
    this.collPlayerKoopa;
    this.timeCheck;
    this.timeInit;
    this.timeInitChangeToSmall;
    this.changeToSmall = false;
    this.collBrick;
    this.collBrickCoin;
    this.collBrickCoins;
    this.collBrickFlowerOrMushroom;
    this.collBrickStar;
    this.collGraphicLayer;
    this.score;
    this.fireBallColl = false;
    this.squishMode = false;
    this.moveSquish = false;
    this.timeToStartMovementSquish;
    this.timeToMoveSquish;
    this.startNoSquish;
    this.dieTimeOutSquish = false;
    this.counterKoopaDies = 0;
    this.manyEnemiesDead = false;
    this.dieByKoopa = false;
    this.dieStarKoopa = false;
};
marioBros.koopaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.koopaPrefab.prototype.constructor = marioBros.koopaPrefab;

function collisionBricksKoopa(koopa, brick) {
    if(brick.playerIsTouching && koopa.body.touching.down){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        this.angle = -180;
        brick.playerIsTouching = false;
        if(!this.level.player.marioStar){
            gameOptions.score +=100;
            changeHUD = true;
        }
        //this.dieKoopa = true;
        koopa.animations.stop();
        if(gameOptions.numLevel == 1){
            koopa.loadTexture('koopaGreenSquish');
        }
        else if(gameOptions.numLevel == 11){
            koopa.loadTexture('koopaBlueSquish');
        }
        koopa.body.setSize(16, 16);
        koopa.frame = 0;
        koopa.squishMode = true;
        koopa.moveSquish = false; 
        koopa.timeToStartMovementSquish = this.game.time.now;  
        //koopa.body.immovable = true;
        koopa.body.velocity.x = 0;
        koopa.startNoSquish = this.game.time.now;
    }
}

function collisionKoopaKoopa(koopa, koopa2) {
    if(koopa2.moveSquish){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        koopa2.counterKoopaDies += 1;
        gameOptions.score +=500;
        changeHUD = true;
        this.dieByKoopa = false;
        this.dieAnimation();
    }
};

marioBros.koopaPrefab.prototype.update = function(){
    //parte izquierda camara
    if(this.x <= this.game.camera.x-16 && !this.squishMode){
        this.kill();
    }
    this.timeCheck = this.game.time.now;    
    
    if(!this.dieStarOrOnBrickKoopa){
       this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);
    }
    else{
        //tiempo que tarda en morir (animacion)
        if(this.timeCheck>= this.timeInit + 300){
            this.kill();
        }
    }
    
    if(!this.dieKoopa){
        if(!this.dieStarKoopa && !this.level.player.die && !this.dieTimeOutSquish && !this.dieByKoopa && !this.dieStarOrOnBrickKoopa){
            this.collPlayerKoopa = this.game.physics.arcade.collide(this, this.level.player,this.collisionPlayerKoopa, null, this);
            this.collKoopaKoopa = this.game.physics.arcade.overlap(this, this.level.koopa, collisionKoopaKoopa, null, this);
            this.collBrick = this.game.physics.arcade.collide(this, this.level.brick, collisionBricksKoopa,null,this);
            this.collBrickCoin = this.game.physics.arcade.collide(this, this.level.brickCoin);
            this.collBrickCoins = this.game.physics.arcade.collide(this, this.level.brickCoinsA);
            this.collBrickFlowerOrMushroom = this.game.physics.arcade.collide(this, this.level.brickFlowerOrMushroom);
            this.collBrickStar = this.game.physics.arcade.collide(this, this.level.brickStar);
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
        this.scale.x = -this.direction;

        if(this.squishMode){
            this.kickSound = this.game.add.audio('kick');
            this.kickSound.play();
            this.body.velocity.x = 0;
            this.body.velocity.x = this.speed*10  * this.direction;
        }
        
    }
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 400 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        if(!this.squishMode && !this.moveSquish){
           this.body.velocity.x = this.speed * this.direction;
        }
        
    }
    
    if(!this.moveSquish && this.squishMode && this.body.velocity.x == 0){
       
        if(this.timeCheck>= this.startNoSquish + 2500){
            this.animations.play('squish',5,true);
        }
        if(this.timeCheck>= this.startNoSquish + 5500){
            if(this.angle < 0){
               this.angle = 0;
            }
            if(gameOptions.numLevel == 1){
                this.loadTexture('koopaGreen');
            }
            else if(gameOptions.numLevel == 11){
                this.loadTexture('koopaBlue');
            }
            
            
            this.body.setSize(16, 24);
            this.animations.stop();
            this.animations.play("walk");
            this.squishMode = false;
            this.moveSquish = false;
        }
    }
    
    if(this.moveSquish && this.timeCheck>= this.timeToMoveSquish + 1500 && !this.dieTimeOutSquish){
        this.dieTimeOutSquish = true;
        this.dieAnimation();
       
    }
    
    if(this.counterKoopaDies >= 3 && !this.manyEnemiesDead){
        this.manyEnemiesDead = true;
        this.dieAnimation();
    }
    
};



marioBros.koopaPrefab.prototype.collisionPlayerKoopa = function() {
    
    if(this.body.touching.up && this.level.player.body.touching.down && !this.level.player.die && !this.squishMode){
        this.stompSound = this.game.add.audio('stomp');
        this.stompSound.play();
        this.level.player.body.velocity.y -= 400; //mini jump al matar al koopa
        //this.stompSound = this.game.add.audio('stomp');
        //this.stompSound.play();
        if(!this.level.player.marioStar){
            gameOptions.score +=100;
            changeHUD = true;
        }
        //this.dieKoopa = true;
        this.animations.stop();
        if(gameOptions.numLevel == 1){
            this.loadTexture('koopaGreenSquish');
        }
        else if(gameOptions.numLevel == 11){
            this.loadTexture('koopaBlueSquish');
        }
        this.body.setSize(16, 16);
        this.frame = 0;
        this.squishMode = true;
        this.moveSquish = false; 
        this.timeToStartMovementSquish = this.game.time.now;  
        this.body.immovable = true;
        this.body.velocity.x = 0;
        this.startNoSquish = this.game.time.now;
    }
    
    else if(!this.squishMode || (this.moveSquish && !(this.body.touching.up && this.level.player.body.touching.down))){
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
        
    }
    if(this.level.player.marioStar){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        this.dieStarKoopa = true;
        gameOptions.score +=500;
        changeHUD = true;
        this.dieAnimation();
    }
    
    if(this.squishMode  && !this.moveSquish && ((this.body.touching.right || this.body.touching.left) && (this.level.player.body.touching.right ||  this.level.player.body.touching.left))){
        this.body.immovable = false;
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        if(!this.level.player.marioStar){
            gameOptions.score +=400;
            changeHUD = true;
        }
        this.moveSquish = true;
        this.body.velocity.x = this.speed*12 * this.level.player.direction;
        this.timeToMoveSquish = this.game.time.now;
        this.animations.stop();
        this.frame = 0;
    }
            
    else if(this.body.touching.up && this.level.player.body.touching.down && !this.level.player.die && this.squishMode && !this.moveSquish && this.timeCheck>= this.timeToStartMovementSquish + 300){
        this.level.player.body.velocity.y -= 400;
        this.body.immovable = false;
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        
        if(!this.level.player.marioStar){
            gameOptions.score +=500;
            changeHUD = true;
        }
        this.moveSquish = true;
        this.body.velocity.x = this.speed*10 * this.level.player.direction;
        this.timeToMoveSquish = this.game.time.now;
        this.animations.stop();
        this.frame = 0;
    }
    
    else if(this.body.touching.up && this.level.player.body.touching.down && !this.level.player.die && this.squishMode && this.moveSquish && this.timeCheck>= this.timeToMoveSquish + 800){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        this.body.immovable = true;
        this.level.player.body.velocity.y -= 400; //mini jump al matar al koopa
        
        this.body.velocity.x = 0;
        
        this.moveSquish = false;
        this.startNoSquish = this.game.time.now;
        this.animations.stop();
        this.frame = 0;
    }
    
   
};

marioBros.koopaPrefab.prototype.dieAnimation = function() {
    this.animations.stop();
    this.squishMode = true;
    if(gameOptions.numLevel == 1){
        this.loadTexture('koopaGreenSquish');
    }
    else if(gameOptions.numLevel == 11){
        this.loadTexture('koopaBlueSquish');
    }
    this.body.setSize(16, 16);
    this.frame = 0;
    this.timeInit = this.game.time.now;
    this.dieKoopa = true;
    this.dieStarOrOnBrickKoopa = true;
    changeHUD = true;
    this.angle = -180;

};