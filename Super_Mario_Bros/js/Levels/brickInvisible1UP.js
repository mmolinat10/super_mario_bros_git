var downCollision;

marioBros.brickInvisible1UPPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickInvisible1UP');
    this.animations.add('invisibleBrick', [0]); 
    this.animations.add('collisionedInvisibleBrick', [1]);
        
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
    downCollision = false;
        
};
marioBros.brickInvisible1UPPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickInvisible1UPPrefab.prototype.constructor = marioBros.brickInvisible1UPPrefab;

marioBros.brickInvisible1UPPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            downCollision = true;
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido de la vida al aparecer
            //aparición de la vida encima del bloque y que se desplaze a la derecha
            //animación de bloque estatico (ya no hay nada)
            this.animations.stop();
            console.log("vida");
        }
        else{
            //sonido bump
        }
    }
    
    if(this.body.touching.up && this.level.player.body.touching.down && this.isCollisioned){
       this.level.player.onGround = true;
    }
}

marioBros.brickInvisible1UPPrefab.prototype.update = function(){
    if(!this.isCollisioned){
      this.animations.play('invisibleBrick');
    } 
    else{
        this.animations.play('collisionedInvisibleBrick');
    }
};