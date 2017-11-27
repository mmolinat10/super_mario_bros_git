marioBros.brickFlowerOrMushroomPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickFlowerOrMushroom');
    
    //animacion interrogante y animación de quando canvia al ser golpeada
    this.animations.add('normalBrickFlowerOrMushroom', [0, 1, 2], 2, true); 
    this.animations.add('collisionedBrickFlowerOrMushroom', [3]);
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickFlowerOrMushroomPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickFlowerOrMushroomPrefab.prototype.constructor = marioBros.brickFlowerOrMushroomPrefab;

marioBros.brickFlowerOrMushroomPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            if(!this.level.player.bigMario){
                this.tweenBlock = this.game.add.tween(this.position);
                this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
                //sonido del champiñon al aparecer y sonido bump
                //aparición del champiñon encima del bloque y que se desplaze a la derecha
                //animación de bloque estatico (ya no hay nada)
                this.animations.stop();
                console.log("mushroom");
            }
            else{
                //sonido de la flor al aparecer y sonido bump
                //aparición de la flor con su animacion encima del bloque sin moverse
                //animación de bloque estatico (ya no hay nada)
                console.log("flower");
            }
        }
        else{
            //sonido bump
        }
    }
    
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
}

marioBros.brickFlowerOrMushroomPrefab.prototype.update = function(){
    if(!this.isCollisioned){
       this.animations.play('normalBrickFlowerOrMushroom');
    } 
    else{
        this.animations.play('collisionedBrickFlowerOrMushroom');
    }
};

