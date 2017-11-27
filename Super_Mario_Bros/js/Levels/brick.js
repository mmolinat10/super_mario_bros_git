
marioBros.brickPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brick');
    
    //this.animations.add('break', [10, 9, 8], 10, true); cargar animacion de romperse, etc..
    
    this.game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.level = level;        
};
marioBros.brickPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickPrefab.prototype.constructor = marioBros.brickPrefab;

marioBros.brickPrefab.prototype.playBlock = function() {
	if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.level.player.bigMario){
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump
        }
        else{
            //como es grande destruye el bloque...animacion y kill
            //sonido de que se destruye el bloque
            this.kill();
        }
    }
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
};

marioBros.brickPrefab.prototype.update = function(){
    
};


