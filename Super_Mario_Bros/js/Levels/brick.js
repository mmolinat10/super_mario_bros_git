
marioBros.brickPrefab = function(game,x,y,level)
{
    if(gameOptions.numLevel == 1){
        Phaser.Sprite.call(this,game,x,y,'brick');
    }
    else if(gameOptions.numLevel == 11){
       Phaser.Sprite.call(this,game,x,y,'brick2');     
    }
    
    
    //this.animations.add('break', [10, 9, 8], 10, true); cargar animacion de romperse, etc..
    
    this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.level = level;        
    this.playerIsTouching = false;
    this.timeCheck;
    this.timeInit;
    this.destroyObject;
};
marioBros.brickPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickPrefab.prototype.constructor = marioBros.brickPrefab;


marioBros.brickPrefab.prototype.playBlock = function() {
	if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.level.player.bigMario){
            this.playerIsTouching = true;
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump
            this.bumpSound = this.game.add.audio('bump');
            this.bumpSound.play();
        }
        else if(this.level.player.bigMario || this.level.player.marioFlower){
            this.playerIsTouching = true;
            //como es grande destruye el bloque...animacion y kill
            //sonido de que se destruye el bloque
            this.brickSmash = this.game.add.audio('brickSmash');
            this.brickSmash.play();
            this.destroyObject = true;
            this.timeInit = this.game.time.now;
        }
    }
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
};

marioBros.brickPrefab.prototype.update = function(){
    this.timeCheck = this.game.time.now; 
    if(this.timeCheck>= this.timeInit + 80 && this.destroyObject){
        this.kill();
    }
};


