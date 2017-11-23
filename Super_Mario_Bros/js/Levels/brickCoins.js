marioBros.brickCoinsPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'brickCoins');
    
    //this.animations.add('break', [10, 9, 8], 10, true);
    
    this.game.physics.arcade.enable(this);
    //this.body.collideWorldBounds = true;
    //this.checkWorldBounds = true;
    this.body.immovable = true;
    this.level = level;
        
};
marioBros.brickCoinsPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.brickCoinsPrefab.prototype.constructor = marioBros.brickCoinsPrefab;

marioBros.brickCoinsPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this, this.level.player);
    
    
};