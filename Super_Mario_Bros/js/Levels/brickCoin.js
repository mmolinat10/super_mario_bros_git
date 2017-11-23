marioBros.brickCoinPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoin');
    
    //this.animations.add('break', [10, 9, 8], 10, true);
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
        
};
marioBros.brickCoinPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinPrefab.prototype.constructor = marioBros.brickCoinPrefab;

marioBros.brickCoinPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player);
    
    
};