marioBros.brickCoinPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoin');
    
    //this.animations.add('nombreClave', [10, 9, 8], 10, true); //animacion interrogante y animación de quando canvia al ser golpeada
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickCoinPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinPrefab.prototype.constructor = marioBros.brickCoinPrefab;

function collisionBrickCoin(brickCoin, player){
    if(brickCoin.body.touching.down && player.body.touching.up){
        
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(brickCoin.position);
            this.tweenBlock.to({y: brickCoin.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump y moneda
            //animación bloque al ser golpeada..moneda aparece con la puntuación
            //animación de bloque estatico (ya no hay nada)
        }
        else{
            //sonido bump
        }
        
    }
}

marioBros.brickCoinPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrickCoin, null, this);
};
