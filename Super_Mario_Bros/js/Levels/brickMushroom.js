marioBros.brickMushroomPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickMushroom');
    
    //this.animations.add('nombreClave', [10, 9, 8], 10, true); //animacion interrogante y animación de quando canvia al ser golpeada
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickMushroomPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickMushroomPrefab.prototype.constructor = marioBros.brickMushroomPrefab;

function collisionBrickMushroom(brickMushroom, player){
    if(brickMushroom.body.touching.down && player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(brickMushroom.position);
            this.tweenBlock.to({y: brickMushroom.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido del champiñon al aparecer
            //aparición del champiñon encima del bloque y que se desplaze a la derecha
            //animación de bloque estatico (ya no hay nada)
        }
        else{
            //sonido bump
        }
    }
}

marioBros.brickMushroomPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrickMushroom, null, this);
};