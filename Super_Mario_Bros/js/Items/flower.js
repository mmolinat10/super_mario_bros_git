marioBros.flowerPrefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'flower');
    this.animations.add('flowerAnimation',[0,1,2,3], 15, true);
    this.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.level = level;
    this.playerCollisioned;
};
marioBros.flowerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
marioBros.flowerPrefab.prototype.constructor = marioBros.flowerPrefab;

marioBros.flowerPrefab.prototype.update = function(){
    
    this.graphicLayer = this.game.physics.arcade.collide(this, this.level.graphicLayer);

    this.playerCollisioned = this.game.physics.arcade.overlap(this, this.level.player);
    this.animations.play('flowerAnimation');
    
    if(this.playerCollisioned){
        gameOptions.score +=1000;
        changeHUD = true;
        this.level.player.marioFlower = true;
        this.level.player.loadTexture('marioFire');
        this.level.player.body.setSize(16, 32);
        this.kill();
    }    
   
};
