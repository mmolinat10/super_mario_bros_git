marioBros.brickFlowerOrMushroomPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickFlowerOrMushroom');
    
    //this.animations.add('nombreClave', [10, 9, 8], 10, true); //animacion interrogante y animación de quando canvia al ser golpeada
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickFlowerOrMushroomPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickFlowerOrMushroomPrefab.prototype.constructor = marioBros.brickFlowerOrMushroomPrefab;

function collisionBrickFlowerOrMushroom(brickFlowerOrMushroom, player){
    if(brickFlowerOrMushroom.body.touching.down && player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            if(!player.bigMario){
                this.tweenBlock = this.game.add.tween(brickFlowerOrMushroom.position);
                this.tweenBlock.to({y: brickFlowerOrMushroom.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
                //sonido del champiñon al aparecer y sonido bump
                //aparición del champiñon encima del bloque y que se desplaze a la derecha
                //animación de bloque estatico (ya no hay nada)
            }
            else{
                //sonido de la flor al aparecer y sonido bump
                //aparición de la flor con su animacion encima del bloque sin moverse
                //animación de bloque estatico (ya no hay nada)
            }
        }
        else{
            //sonido bump
        }
    }
}

marioBros.brickFlowerOrMushroomPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrickFlowerOrMushroom, null, this);
};

