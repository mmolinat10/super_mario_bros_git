marioBros.marioPrefab = function(game,x,y)
{
    Phaser.Sprite.call(this,game,x,y,'mario');
    this.anchor.setTo(0.5);
    this.animations.add('left', [10, 9, 8], 10, true);
    this.animations.add('right', [2, 3, 4], 10, true);
    this.velocity = gameOptions.playerSpeed;
    this.jump = gameOptions.playerJump;
    this.die = gameOptions.die;
    this.bigMario = false;
    //this.state = 'mario';

    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.playerGravity;

    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    //this.body.bounce.y = 0.2;
    //this.body.linearDamping = 1;
    this.jumpSmallSound = this.game.add.audio('jumpSmall');
    this.dieSound = this.game.add.audio('mariodie');
    this.jumpTimer = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys(); 
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        
};
marioBros.marioPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.marioPrefab.prototype.constructor = marioBros.marioPrefab;

marioBros.marioPrefab.prototype.update = function(){
    
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

        if (this.body.blocked.down) {
            if(!this.runKey.isDown){
               this.animations.play('right');
            }else{
                this.animations.play('right', 15, true);
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
        if (this.body.blocked.down) {
            if(!this.runKey.isDown){
               this.animations.play('left');
            }else{
                this.animations.play('left', 15, true);
            }
        }
    } else {
        if (this.body.velocity.x > 0) {
            this.body.acceleration.x = -300;
        }
        else if (this.body.velocity.x < 0) {
            this.body.acceleration.x = 300;
        }
        if (this.body.velocity.x > -5 && this.body.velocity.x < 5 && this.body.blocked.down) {
            this.body.velocity.x = 0;
            this.animations.stop();
            if (this.animations.currentAnim.name == 'left') {
                this.frame = 11;
            } else {
                this.frame = 1;
            }
        }
    }

    if ((this.cursors.up.isDown || this.space.isDown) && this.body.blocked.down) {
        this.jumpTimer = 1;
        this.body.velocity.y = -220;
       
        if ((this.animations.currentAnim.name == 'left') || (this.frame == 11)) {
            this.jumpSmallSound.stop();
            this.animations.stop();
            this.frame = 7;
        } else {
            this.jumpSmallSound.stop();
            this.animations.stop();
            this.frame = 5;
        }
    } else if ((this.cursors.up.isDown || this.space.isDown) && (this.jumpTimer != 0)) {
        if (this.jumpTimer > 15 || this.body.velocity.y == 0) {
            this.jumpTimer = 0;
        } else {
            this.jumpTimer++;
            this.body.velocity.y = -220;
            if(!this.jumpSmallSound.play()){
                this.jumpSmallSound.play();
            }
        }
    } else if (this.jumpTimer != 0) {
        this.jumpTimer = 0;
    }    
   
    if(this.die){
       this.dieSound.play();
       this.die = false;
        
    }
    
    
};


