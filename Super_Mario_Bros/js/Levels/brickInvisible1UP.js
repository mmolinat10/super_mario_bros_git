marioBros.brickInvisible1UPPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickInvisible1UP');
        
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
    this.isCollisioned = false;
        
};
marioBros.brickInvisible1UPPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickInvisible1UPPrefab.prototype.constructor = marioBros.brickInvisible1UPPrefab;

function collisionBrickInvisible1UP(brickInvisible1UP, player){
    if(brickInvisible1UP.body.touching.down && player.body.touching.up){
        if(!this.isCollisioned){
            this.isCollisioned = true;
            this.tweenBlock = this.game.add.tween(brickInvisible1UP.position);
            this.tweenBlock.to({y: brickInvisible1UP.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido de la vida al aparecer
            //aparición de la vida encima del bloque y que se desplaze a la derecha
            //animación de bloque estatico (ya no hay nada)
            console.log("vida");
        }
        else{
            //sonido bump
        }
    }
}

marioBros.brickInvisible1UPPrefab.prototype.update = function(){
    if(!this.isCollisioned){
        this.game.physics.arcade.overlap(this, this.level.player,collisionBrickInvisible1UP, null, this);
    }
    else{
        this.game.physics.arcade.collide(this, this.level.player,collisionBrickInvisible1UP, null, this);
    }
    
};