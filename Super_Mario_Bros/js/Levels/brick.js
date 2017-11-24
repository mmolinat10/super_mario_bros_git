marioBros.brickPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brick');
    
    //this.animations.add('break', [10, 9, 8], 10, true); cargar animacion de romperse, etc..
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
        
};
marioBros.brickPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickPrefab.prototype.constructor = marioBros.brickPrefab;

function collisionBrick(brick, player){
    if(brick.body.touching.down && player.body.touching.up){
        if(!player.bigMario){
            this.tweenBlock = this.game.add.tween(brick.position);
            this.tweenBlock.to({y: brick.y -8}, 100, Phaser.Easing.Sinusoidal.In, true, 0, 0, true);
            //sonido bump
        }
        else{
            //como es grande destruye el bloque...animacion y kill
            //sonido de que se destruye el bloque
            block.kill();
        }
    }
}

marioBros.brickPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player,collisionBrick, null, this);
};


