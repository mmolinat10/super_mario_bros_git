marioBros.brickStarPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickStar');
    this.animations.add('normalBrickStar', [0]); 
    this.animations.add('collisionedBrickStar', [1]);
        
    this.game.physics.arcade.enable(this);

    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickStarPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickStarPrefab.prototype.constructor = marioBros.brickStarPrefab;

marioBros.brickStarPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido de la estrella al aparecer
            //aparición de la estrella encima del bloque y que se desplaze a la derecha botando en el terreno al colisionar
            //animación de bloque estatico (ya no hay nada)
            this.animations.stop();
            console.log("estrella");
        }
        else{
            //sonido bump
        }
    }
}

marioBros.brickStarPrefab.prototype.update = function(){
    if(!this.isCollisioned){
       this.animations.play('normalBrickStar');
    } 
    else{
        this.animations.play('collisionedBrickStar');
    }
};