
marioBros.marioPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'marioSmall');
    this.anchor.setTo(0.5);
    this.animations.add('leftSmall', [10, 9, 8], 10, true);
    this.animations.add('rightSmall', [2, 3, 4], 10, true);
    this.animations.add('leftBig', [10, 9, 8], 10, true);
    this.animations.add('rightBig', [2, 3, 4], 10, true);
    this.animations.add('leftFire', [10, 9, 8], 10, true);
    this.animations.add('rightFire', [2, 3, 4], 10, true);
    this.velocity = gameOptions.playerSpeed;
    this.jump = gameOptions.playerJump;
    this.die = false;
    this.scale.setTo(0.8,1); //lo hago porque si no las colisiones con bloques muy juntos no lo hace bien
    this.lives;
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.playerGravity;

    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;

    this.jumpSmallSound = this.game.add.audio('jumpSmall');
    this.jumpBigSound = this.game.add.audio('jumpBig');
    this.jumpFireSound = this.game.add.audio('jumpFire');
    this.dieSound = this.game.add.audio('mariodie');
    
    this.jumpTimer = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    //this.levelMario = 'level1';    
    this.level = level;
    
    this.collGraphicLayer;
    this.collBrick;
    this.collBrickCoin;
    this.collBrickCoins;
    this.collBrickFlowerOrMushroom;
    this.collBrickStar;
    this.collBrickInvisible1UP;
    
    this.onGround = false;
    this.bigMario = false;
    this.invulnerableTime = 12000;
    this.marioStar = false;
    this.marioFlower = false;
    this.timeCheck;
    this.timeInit;
    this.timeInitDie;
    this.createTime = false;
    this.marioStarSound = this.game.add.audio('marioStarSound');
    this.timeAnimationDie = 3000;
    this.createTimeDie = false;
    
};

marioBros.marioPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.marioPrefab.prototype.constructor = marioBros.marioPrefab;

function collisionBlock(player, block){
    block.playBlock();   
}

marioBros.marioPrefab.prototype.update = function(){
    
    this.timeCheck = this.game.time.now;
   // gameOptions.lifes = this.lives;
    this.collisionsMario();
    
    this.checkIsGroundMario();
    
    if(!this.die && !this.level.isPausedLevel){
        if(this.bigMario){
            this.moveBigMario();
            this.jumpBigMario();
            if((this.cursors.down.isDown && this.checkIsGroundMario && !this.cursors.left.isDown && !this.cursors.right.isDown)){
              //funcion para agacharse
                this.crouch()
            }
        }
        else{
            this.moveSmallMario();
            this.jumpSmallMario();
        }
    }
    else{
        this.animations.stop();
    }
    
    if(this.die){
        this.body.velocity.x = 0;
        this.body.acceleration = 0;
        if(!this.createTime){
            this.createTime = true;
            this.timeInitDie = this.game.time.now;
            this.dieMario();
        }
    
        //animacion morir
        this.frame = 6;
        if(this.timeCheck>= this.timeInitDie + this.timeAnimationDie){
            this.level.state.start('loadLevel');
            this.die = false;
            this.dieSound.stop();
        }
    }
   
    if(this.timeCheck>= this.timeInit + this.invulnerableTime){
        this.marioStar = false;
        this.marioStarSound.stop();
        this.level.soundLevel1.resume();
    }
    
    if(this.marioStar){
        if(!this.createTime){
            this.level.soundLevel1.pause();
            this.marioStarSound.play();
            this.createTime = true;
            this.timeInit = this.game.time.now;
        }
    }    
    
};

marioBros.marioPrefab.prototype.moveSmallMario = function(){
    if (this.cursors.right.isDown) {

        this.body.acceleration.x = 300;
        if (this.body.velocity.x > 100 && !this.runKey.isDown) {
            this.body.velocity.x = 100;
        }
        else if(this.body.velocity.x > 150 && this.runKey.isDown){
            this.body.velocity.x = 150;
        }
        else if (this.body.velocity.x < 0) {
            this.frame = 0;
        }

        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('rightSmall');
            }
            else{
                this.animations.play('rightSmall', 15, true);
            }            
        }
    }
    else if (this.cursors.left.isDown) {

        this.body.acceleration.x = -300;
        if (this.body.velocity.x < -100 && !this.runKey.isDown) {
            this.body.velocity.x = -100;
        }
        else if(this.body.velocity.x < -150 && this.runKey.isDown){
            this.body.velocity.x = -150;
        }
        else if (this.body.velocity.x > 0) {
            this.frame = 12;
        }
        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('leftSmall');
            }
            else{
                this.animations.play('leftSmall', 15, true);
            }            
        }
    } else {
        if (this.body.velocity.x > 0) {
            this.body.acceleration.x = -300;
        }
        else if (this.body.velocity.x < 0) {
            this.body.acceleration.x = 300;
        }
        if ((this.body.velocity.x > -5 && this.body.velocity.x < 5) && this.onGround) {
            this.body.velocity.x = 0;
            this.animations.stop();
            
            if (this.animations.currentAnim.name == 'leftSmall') {
                this.frame = 11;
            } 
            else {
                this.frame = 1;
            }            
        }
    }
};

marioBros.marioPrefab.prototype.moveBigMario = function(){
    if (this.cursors.right.isDown) {

        this.body.acceleration.x = 300;
        if (this.body.velocity.x > 100 && !this.runKey.isDown) {
            this.body.velocity.x = 100;
        }
        else if(this.body.velocity.x > 150 && this.runKey.isDown){
            this.body.velocity.x = 150;
        }
        else if (this.body.velocity.x < 0) {
            this.frame = 0;
        }

        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('rightBig');
            }
            else{
                this.animations.play('rightBig', 15, true);
            }            
        }
    }
    else if (this.cursors.left.isDown) {

        this.body.acceleration.x = -300;
        if (this.body.velocity.x < -100 && !this.runKey.isDown) {
            this.body.velocity.x = -100;
        }
        else if(this.body.velocity.x < -150 && this.runKey.isDown){
            this.body.velocity.x = -150;
        }
        else if (this.body.velocity.x > 0) {
            this.frame = 12;
        }
        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('leftBig');
            }
            else{
                this.animations.play('leftBig', 15, true);
            }            
        }
    } else {
        if (this.body.velocity.x > 0) {
            this.body.acceleration.x = -300;
        }
        else if (this.body.velocity.x < 0) {
            this.body.acceleration.x = 300;
        }
        if ((this.body.velocity.x > -5 && this.body.velocity.x < 5) && this.onGround) {
            this.body.velocity.x = 0;
            this.animations.stop();
            
            if (this.animations.currentAnim.name == 'leftBig') {
                this.frame = 11;
            } 
            else {
                this.frame = 1;
            }            
        }
    }
};
marioBros.marioPrefab.prototype.moveFireMario = function(){
    if (this.cursors.right.isDown) {

        this.body.acceleration.x = 300;
        if (this.body.velocity.x > 100 && !this.runKey.isDown) {
            this.body.velocity.x = 100;
        }
        else if(this.body.velocity.x > 150 && this.runKey.isDown){
            this.body.velocity.x = 150;
        }
        else if (this.body.velocity.x < 0) {
            this.frame = 0;
        }

        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('rightFire');
            }
            else{
                this.animations.play('rightFire', 15, true);
            }            
        }
    }
    else if (this.cursors.left.isDown) {

        this.body.acceleration.x = -300;
        if (this.body.velocity.x < -100 && !this.runKey.isDown) {
            this.body.velocity.x = -100;
        }
        else if(this.body.velocity.x < -150 && this.runKey.isDown){
            this.body.velocity.x = -150;
        }
        else if (this.body.velocity.x > 0) {
            this.frame = 12;
        }
        if (this.onGround) {
            
            if(!this.runKey.isDown){
                this.animations.play('leftFire');
            }
            else{
                this.animations.play('leftFire', 15, true);
            }            
        }
    } else {
        if (this.body.velocity.x > 0) {
            this.body.acceleration.x = -300;
        }
        else if (this.body.velocity.x < 0) {
            this.body.acceleration.x = 300;
        }
        if ((this.body.velocity.x > -5 && this.body.velocity.x < 5) && this.onGround) {
            this.body.velocity.x = 0;
            this.animations.stop();
            
            if (this.animations.currentAnim.name == 'leftFire') {
                this.frame = 11;
            } 
            else {
                this.frame = 1;
            }            
        }
    }
};

marioBros.marioPrefab.prototype.jumpSmallMario = function(){
    if ((this.cursors.up.isDown || this.space.isDown) && this.onGround) {
        this.jumpSmallSound.play();
        this.jumpTimer = 1;
        this.body.velocity.y = -220;
        
        if ((this.animations.currentAnim.name == 'leftSmall') || (this.frame == 11)) {
            this.animations.stop();
            this.frame = 7;
        } else {
            this.animations.stop();
            this.frame = 5;
        }
    } else if ((this.cursors.up.isDown || this.space.isDown) && (this.jumpTimer != 0)) {
        if (this.jumpTimer > 15 || this.body.velocity.y == 0) {
            this.jumpTimer = 0;
        } else {
            this.jumpTimer++;
            this.body.velocity.y = -220;            
        }
    } else if (this.jumpTimer != 0) {
        this.jumpTimer = 0;
    }    
};

marioBros.marioPrefab.prototype.jumpBigMario = function(){
    if ((this.cursors.up.isDown || this.space.isDown) && this.onGround) {
        this.jumpBigSound.play();
        this.jumpTimer = 1;
        this.body.velocity.y = -220;
        
        if ((this.animations.currentAnim.name == 'leftBig') || (this.frame == 11)) {
            this.animations.stop();
            this.frame = 7;
        } else {
            this.animations.stop();
            this.frame = 5;
        }
    } else if ((this.cursors.up.isDown || this.space.isDown) && (this.jumpTimer != 0)) {
        if (this.jumpTimer > 15 || this.body.velocity.y == 0) {
            this.jumpTimer = 0;
        } else {
            this.jumpTimer++;
            this.body.velocity.y = -220;
        }
    } else if (this.jumpTimer != 0) {
        this.jumpTimer = 0;
    }    
};

marioBros.marioPrefab.prototype.crouch = function(){
   this.frame = 6;
};

marioBros.marioPrefab.prototype.collisionsMario = function(){
    if(!this.die){
        this.collGraphicLayer = this.game.physics.arcade.collide(this,this.level.graphicLayer);
        this.collBrick = this.game.physics.arcade.collide(this, this.level.brick, collisionBlock, null,this);
        this.collBrickCoin = this.game.physics.arcade.collide(this, this.level.brickCoin, collisionBlock, null,this);
        this.collBrickCoins = this.game.physics.arcade.collide(this, this.level.brickCoinsA, collisionBlock, null,this);
        this.collBrickFlowerOrMushroom = this.game.physics.arcade.collide(this, this.level.brickFlowerOrMushroom, collisionBlock, null,this);
        this.collBrickStar = this.game.physics.arcade.collide(this, this.level.brickStar, collisionBlock, null,this);
    
        if(!downCollision){
           this.collBrickInvisible1UP = this.game.physics.arcade.overlap(this, this.level.brickInvisible,collisionBlock, null, this);
        }
        else{
            this.collBrickInvisible1UP = this.game.physics.arcade.collide(this, this.level.brickInvisible,collisionBlock, null, this);
        }  
    }
    
};

marioBros.marioPrefab.prototype.checkIsGroundMario = function(){
    if(!this.collBrick && !this.collBrickCoin && !this.collBrickCoins && !this.collBrickFlowerOrMushroom && !this.collBrickStar &&  !this.collBrickInvisible1UP && !this.body.onFloor()){
       this.onGround = false;
    }
    
    if(this.body.onFloor()){
       this.onGround = true;
    }
};

marioBros.marioPrefab.prototype.winLife = function(numLife){
   gameOptions.lifes += numLife;
};

marioBros.marioPrefab.prototype.addCoins = function(numCoins){
   gameOptions.coins += numCoins;
};

marioBros.marioPrefab.prototype.addScore = function(numScore){
   gameOptions.score += numScore;
};

marioBros.marioPrefab.prototype.loseLife = function(){
   if(gameOptions.lifes > 0){
        gameOptions.lifes -= 1;
       this.lives -=1;
    }
    else{
        this.gameOver();
    }
};

marioBros.marioPrefab.prototype.dieMario = function(){
   if(this.die){
       this.body.velocity.y -= 200;
       this.level.stopBackgroundAudioLevel();
       this.loseLife();
       this.dieSound.play();    
    }
};

marioBros.marioPrefab.prototype.gameOver = function(){
    gameOptions.lifes = 3; //se reinician las vidas
    gameOptions.coins = 0; //se reinician los coins
    gameOptions.score = 0; //se reinician los puntos
    this.level.state.start('gameOver');
    //se reinicia al primer nivel
    //....
};
