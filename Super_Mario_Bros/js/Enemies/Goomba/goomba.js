marioBros.goombaPrefab = function(game,x,y,level)
{
    this.level = level;
    if(gameOptions.numLevel == 1){
       Phaser.Sprite.call(this,game,x,y,'goombaRed');
    }
    else if(gameOptions.numLevel == 11){
       Phaser.Sprite.call(this,game,x,y,'goombaBlue');     
    }
    
    this.animations.add('walk',[0,1],10,true);
    this.deadAnimationGoomba = this.animations.add('died',[2],15);
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(.5,.5);
    this.animations.play('walk');
    //this.body.immovable = true;
    this.speed = 30;
    this.direction = -1;
    this.dieGoomba = false;
    this.dieStarOrOnBrickGoomba = false;
    this.body.gravity.y = gameOptions.playerGravity;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    this.playerVisible = false;
    this.collPlayerGoomba;
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
    this.collKoopaGoomba;
    this.score;
    this.fireBallColl = false;
    this.dieByKoopa = false;
};
marioBros.goombaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.goombaPrefab.prototype.constructor = marioBros.goombaPrefab;

function collisionBricksGoomba(goomba, brick) {
    if(brick.playerIsTouching && goomba.body.touching.down){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        goomba.dieAnimation();
        brick.playerIsTouching = false;
    }
}

function collisionKoopaGoomba(goomba, koopa) {
    if(koopa.moveSquish){
        this.kickSound = this.game.add.audio('kick');
        this.kickSound.play();
        koopa.counterKoopaDies += 1;
        this.dieByKoopa = true;
        this.dieAnimation(); 
    }
};

marioBros.goombaPrefab.prototype.update = function(){
    if(this.body.position.x < this.game.camera.x-16){
        this.kill();
    }
    
    this.timeCheck = this.game.time.now;    
    
    if(!this.dieStarOrOnBrickGoomba){
       this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);
    }
    else{
        //tiempo que tarda en morir (animacion)
        if(this.timeCheck>= this.timeInit + 300){
            this.kill();
        }
    }
    
    if(!this.dieGoomba){
        if(!this.dieStarGoomba && this.level.player.die == false && !this.dieByKoopa && !this.dieStarOrOnBrickGoomba){
            this.collPlayerGoomba = this.game.physics.arcade.collide(this, this.level.player,this.collisionPlayerGoomba, null, this);
            this.collKoopaGoomba = this.game.physics.arcade.overlap(this, this.level.koopa, collisionKoopaGoomba, null, this);
            this.collBrick = this.game.physics.arcade.collide(this, this.level.brick, collisionBricksGoomba,null,this);
            this.collBrickCoin = this.game.physics.arcade.collide(this, this.level.brickCoin, collisionBricksGoomba);
            this.collBrickCoins = this.game.physics.arcade.collide(this, this.level.brickCoinsA, collisionBricksGoomba);
            this.collBrickFlowerOrMushroom = this.game.physics.arcade.collide(this, this.level.brickFlowerOrMushroom, collisionBricksGoomba);
            this.collBrickStar = this.game.physics.arcade.collide(this, this.level.brickStar,collisionBricksGoomba);
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
    
    if(this.game.physics.arcade.distanceBetween(this, this.level.player) < 400 || this.playerVisible){
        if(!this.playerVisible){
           this.playerVisible = true;
        }
        this.body.velocity.x = this.speed * this.direction;
    }
};



marioBros.goombaPrefab.prototype.collisionPlayerGoomba = function() {
    if(this.body.touching.up && this.level.player.body.touching.down && !this.level.player.die){
        this.level.player.body.velocity.y -= 300; //mini jump al matar al goomba
        this.stompSound = this.game.add.audio('stomp');
        this.stompSound.play();
        gameOptions.score +=100;
        changeHUD = true;
        this.dieGoomba = true;
        this.animations.stop();
        this.deadAnimationGoomba = this.animations.play('died');
        this.timeInit = this.game.time.now;
    }
    else{
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
        if(this.level.player.marioStar){
            this.kickSound = this.game.add.audio('kick');
            this.kickSound.play();
            //tiempo en morir
            this.dieStarGoomba = true;
            this.dieAnimation();
        }
    }
};


marioBros.goombaPrefab.prototype.dieAnimation = function() {
    this.timeInit = this.game.time.now;
    this.dieStarOrOnBrickGoomba = true;
    gameOptions.score +=100;
    changeHUD = true;
    this.angle = -180;
};