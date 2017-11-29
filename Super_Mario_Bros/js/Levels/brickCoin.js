marioBros.brickCoinPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoin');
    
    //animacion interrogante y animación de quando canvia al ser golpeada
    this.animations.add('normalBrickCoin', [0, 1, 2], 2, true); 
    this.animations.add('collisionedBrickCoin', [3]);
    
    this.game.physics.arcade.enable(this);

    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;     
    this.coin;
};
marioBros.brickCoinPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinPrefab.prototype.constructor = marioBros.brickCoinPrefab;

marioBros.brickCoinPrefab.prototype.playBlock = function() {
    if(this.body.touching.down && this.level.player.body.touching.up){
        
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(this.position);
            this.tweenBlock.to({y: this.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump y moneda
            //animación bloque al ser golpeada..moneda aparece con la puntuación
            //animación de bloque estatico (ya no hay nada)
            this.animations.stop();
            this.coin = new marioBros.coinOfBlockPrefab(this.game,this.x,this.y-16,this.level); 
            this.game.add.existing(this.coin);
            this.coin.body.velocity.y -= 350;
            this.level.player.addCoins(1);
        }
        else{
            //sonido bump
        }
        
    }
    if(this.body.touching.up && this.level.player.body.touching.down){
       this.level.player.onGround = true;
    }
}

marioBros.brickCoinPrefab.prototype.update = function(){
    if(!this.isCollisioned){
       this.animations.play('normalBrickCoin');
    } 
    else{
        this.animations.play('collisionedBrickCoin');
    }
};
