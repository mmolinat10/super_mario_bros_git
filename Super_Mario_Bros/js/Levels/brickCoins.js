marioBros.brickCoinsPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoins');
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.contadorVecesGolpeado = 0;
        
};
marioBros.brickCoinsPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinsPrefab.prototype.constructor = marioBros.brickCoinsPrefab;

function collisionBrickCoins(brickCoins, player){
    if(brickCoins.body.touching.down && player.body.touching.up){
        //no hace falta diferencia entre mario pequeño y grande en el caso de este bloque
        this.contadorVecesGolpeado++;
        if(this.contadorVecesGolpeado < 8){
            this.tweenBlock = this.game.add.tween(brickCoins.position);
            this.tweenBlock.to({y: brickCoins.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump y moneda
            //al ser golpeada..moneda aparece con la puntuación
        }else{
            //animación de bloque estatico (ya no hay mas monedas)
            //sonido bump
        }
    }
       
    
}

marioBros.brickCoinsPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrickCoins, null, this);
};
