marioBros.brickCoinsPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoins');
    this.animations.add('normalBrickCoins', [0]); 
    this.animations.add('collisionedBrickCoins', [1]);
    
    this.game.physics.arcade.enable(this);

    this.body.immovable = true;
    this.level = level;
    this.contadorVecesGolpeado = 0;    
    this.coin;
};
marioBros.brickCoinsPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinsPrefab.prototype.constructor = marioBros.brickCoinsPrefab;

marioBros.brickCoinsPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        //no hace falta diferencia entre mario pequeño y grande en el caso de este bloque
        this.contadorVecesGolpeado++;
        if(this.contadorVecesGolpeado <= 8){
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump y moneda
            //al ser golpeada..moneda aparece con la puntuación
            this.coin = new marioBros.coinOfBlockPrefab(this.game,this.x,this.y-16,this.level); 
            this.game.add.existing(this.coin);
            this.coin.body.velocity.y -= 350;
            this.level.player.addCoins(1);
        }else{
            this.animations.stop();
            //animación de bloque estatico (ya no hay mas monedas)
            //sonido bump
        }
    }
    
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
       
}

marioBros.brickCoinsPrefab.prototype.update = function(){
    if(this.contadorVecesGolpeado < 8){
       this.animations.play('normalBrickCoins');
    } 
    else{
        this.animations.play('collisionedBrickCoins');
    }
};
