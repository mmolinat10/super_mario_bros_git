
marioBros.marioPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'marioSmall');
    this.anchor.setTo(0.5);
    this.animations.add('leftSmall', [10, 9, 8], 10, true);
    this.animations.add('rightSmall', [2, 3, 4], 10, true);
    this.velocity = gameOptions.playerSpeed;
    this.jump = gameOptions.playerJump;
    this.die = gameOptions.die;
    
    this.scale.setTo(0.8,1); //lo hago porque si no las colisiones con bloques muy juntos no lo hace bien
    
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.playerGravity;

    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;

    this.jumpSmallSound = this.game.add.audio('jumpSmall');
    this.dieSound = this.game.add.audio('mariodie');
    
    this.jumpTimer = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    //this.levelMario = 'level1';    
    this.level = level;
    
    this.collBrick;
    this.collBrickCoin;
    this.collBrickCoins;
    this.collBrickFlowerOrMushroom;
    this.collBrickStar;
    this.collBrickInvisible1UP;
    
    this.onGround = false;
    this.bigMario = false;
    this.invulnerableTime = 100;
    
};

marioBros.marioPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.marioPrefab.prototype.constructor = marioBros.marioPrefab;

function collisionBlock(player, block){
    block.playBlock();   
}

marioBros.marioPrefab.prototype.update = function(){
    this.collisionsMario();
    
    this.checkIsGroundMario();
    
    if(this.bigMario){
        //faltan los spritesheets al igual que el small mario
        this.moveBigMario();
        this.jumpBigMario();
        if(this.cursors.down.isDown){
          //funcion para agacharse
           //this.crouch()
        }
    }
    else{
        this.moveSmallMario();
        this.jumpSmallMario();
    }
    
    if(this.die){
        this.dieMario();
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
            //this.frame = 0;
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
            //this.frame = 12;
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
                //this.frame = 11;
            } 
            else {
                //this.frame = 1;
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
        //this.jumpBigSound.play();
        this.jumpTimer = 1;
        this.body.velocity.y = -220;
        
        /*if ((this.animations.currentAnim.name == 'leftBig') || (this.frame == 11)) {
            this.animations.stop();
            //this.frame = 7;
        } else {
            this.animations.stop();
            //this.frame = 5;
        }*/
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
   
};

marioBros.marioPrefab.prototype.collisionsMario = function(){
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
    }
    else{
        this.gameOver();
    }
};

marioBros.marioPrefab.prototype.dieMario = function(){
   if(this.die){
       this.level.stopBackgroundAudioLevel();
       this.loseLife();
       this.dieSound.play();
        //animacion morir
       this.level.state.start('loadLevel');
       this.die = false;
       console.log(gameOptions.lifes);
        
    }
};

marioBros.marioPrefab.prototype.gameOver = function(){
    gameOptions.lifes = 3; //se reinician las vidas
    gameOptions.coins = 0; //se reinician los coins
    gameOptions.score = 0; //se reinician los puntos
    //se reinicia al primer nivel
    //....
};
