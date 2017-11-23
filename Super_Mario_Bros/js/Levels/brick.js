marioBros.brickPrefab = function(game,x,y)
{
    Phaser.Sprite.call(this,game,x,y,'brick');
    
    //this.animations.add('break', [10, 9, 8], 10, true);
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
        
};
marioBros.brickPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickPrefab.prototype.constructor = marioBros.brickPrefab;

marioBros.brickPrefab.prototype.update = function(){
    
    
    
};


